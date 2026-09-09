import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateDocumentation, safeDocumentationLink, verifyDocumentationSnapshot, documentationRepository } from './contract.mjs';

const page = '---\ntitle: Start\ndescription: Use the API.\nowner: Docs\nlastReviewed: 2026-09-08\norder: 1\n---\n# Start\n';
const files = { 'index.md': page };
const navigation = [{ label: 'Start', items: [['Overview', '/docs']] }];
test('current provider guides agree on Venice availability without claiming exhaustive qualification', () => {
  const guide = name => readFileSync(new URL('../guides/' + name + '.md', import.meta.url), 'utf8');
  for (const name of ['text', 'quickstart', 'environments', 'privacy', 'routing']) {
    const source = guide(name);
    assert.match(source, /Venice|venice\//);
    assert.doesNotMatch(source, /Gemini serves the current text catalog|Venice[^\n]*not yet public/);
  }
  assert.match(guide('text'), /sampled release/);
  assert.match(guide('routing'), /not part of the published 0\.2\.0/);
  assert.match(guide('privacy'), /provider-specific processing, retention/);
});
test('valid guides and pinned content pass', () => {
  const manifest = { schemaVersion: 1, repository: documentationRepository, branch: 'main', commit: 'a'.repeat(40), ...validateDocumentation(files, navigation) };
  assert.equal(verifyDocumentationSnapshot(files, navigation, manifest), manifest);
  assert.throws(() => verifyDocumentationSnapshot({ 'index.md': page + 'changed' }, navigation, manifest), /snapshot_drift/);
  assert.throws(() => verifyDocumentationSnapshot(files, navigation, { ...manifest, repository: 'https://example.org' }), /invalid_source/);
});
for (const href of ['javascript:alert(1)', 'data:text/html,hello', '//attacker.example', '/\\attacker', 'https://a.example/"onclick="x', 'java&#x73;cript:alert']) {
  test('rejects unsafe link ' + href, () => assert.equal(safeDocumentationLink(href), false));
}
for (const href of ['/docs/cli', '#setup', 'https://onchainrouter.dev/docs', 'mailto:support@onchainrouter.dev']) {
  test('allows documented link ' + href, () => assert.equal(safeDocumentationLink(href), true));
}
test('rejects reserved pages, malformed navigation, unknown placeholders and oversized input', () => {
  assert.throws(() => validateDocumentation({ ...files, 'agents.md': page }, navigation));
  assert.throws(() => validateDocumentation({ ...files, '../escape.md': page }, navigation));
  assert.throws(() => validateDocumentation(files, [{ label: 'Bad', items: [['Bad', 'https://other.example']] }]));
  assert.throws(() => validateDocumentation({ 'index.md': page + '{{unknown-token}}' }, navigation));
  assert.throws(() => validateDocumentation({ 'index.md': page + 'x'.repeat(262144) }, navigation));
});
