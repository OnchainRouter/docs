import { createHash } from 'node:crypto';

export const documentationRepository = 'https://github.com/OnchainRouter/docs';
export const generatedRoutes = [
  '/models', '/pricing', '/docs/agents',
  ...['chat-completions', 'messages', 'image-generations', 'audio-speech',
    'audio-transcriptions', 'audio-voices', 'models', 'pricing', 'balance'].map(name => '/docs/api/' + name),
];
const tokens = new Set(['example-model', 'client-availability', 'integration-table',
  'connection-examples', 'workbench-availability']);

export function validateDocumentation(files, navigation) {
  const names = Object.keys(files).sort();
  if (names.length < 1 || names.length > 100 || !names.includes('index.md')) throw new Error('docs_invalid_page_set');
  let total = 0;
  for (const name of names) {
    if (!/^[a-z][a-z0-9-]*\.md$/.test(name) || name === 'agents.md') throw new Error('docs_invalid_filename');
    const source = files[name];
    if (typeof source !== 'string' || Buffer.byteLength(source) > 262144 || source.includes('\0')) throw new Error('docs_invalid_content');
    total += Buffer.byteLength(source);
    const front = /^---\n([\s\S]*?)\n---\n/.exec(source)?.[1];
    if (!front) throw new Error('docs_missing_frontmatter');
    const fields = new Map();
    for (const line of front.split('\n')) {
      const separator = line.indexOf(':');
      const key = line.slice(0, separator);
      const value = line.slice(separator + 1).trim();
      if (separator < 1 || fields.has(key) || !value) throw new Error('docs_invalid_frontmatter');
      fields.set(key, value);
    }
    if (['title','description','owner','lastReviewed','order'].some(key => !fields.has(key)) ||
        fields.size !== 5 || !/^\d{4}-\d{2}-\d{2}$/.test(fields.get('lastReviewed')) ||
        !/^\d{1,5}$/.test(fields.get('order'))) throw new Error('docs_invalid_frontmatter');
    for (const match of source.matchAll(/\{\{([^}]+)\}\}/g)) {
      if (!tokens.has(match[1])) throw new Error('docs_unknown_placeholder');
    }
    if (/-----BEGIN [A-Z ]*PRIVATE KEY-----|\b(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}|github\.com\/AgenticFI\/|\/Users\/|\/private\/tmp\//i.test(source))
      throw new Error('docs_private_material');
    // Reject executable Markdown destinations. Raw HTML is escaped by the website renderer.
    for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
      if (!safeDocumentationLink(match[1])) throw new Error('docs_unsafe_link');
    }
  }
  if (total > 2 * 1024 * 1024) throw new Error('docs_too_large');
  const routes = new Set([...generatedRoutes, ...names.map(name => name === 'index.md' ? '/docs' : '/docs/' + name.slice(0,-3))]);
  const linked = new Set();
  if (!Array.isArray(navigation) || navigation.length < 1 || navigation.length > 20) throw new Error('docs_invalid_navigation');
  for (const group of navigation) {
    if (!group || Object.keys(group).sort().join(',') !== 'items,label' ||
        typeof group.label !== 'string' || !group.label.trim() || group.label.length > 100 ||
        !Array.isArray(group.items) || group.items.length < 1 || group.items.length > 50) throw new Error('docs_invalid_navigation');
    for (const item of group.items) {
      if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== 'string' ||
          !item[0].trim() || item[0].length > 100 || !routes.has(item[1]) || linked.has(item[1])) throw new Error('docs_invalid_navigation');
      linked.add(item[1]);
    }
  }
  return {
    files: Object.fromEntries(names.map(name => [name, hash(files[name])])),
    navigationHash: hash(JSON.stringify(navigation)),
  };
}

export function safeDocumentationLink(href) {
  if (typeof href !== 'string' || /[\s\\<>"'\u0000-\u001f\u007f]/.test(href)) return false;
  return (/^\/(?!\/)/.test(href) || /^#[a-z0-9_-]+$/i.test(href) ||
    /^https?:\/\/[^/]+/i.test(href) || /^mailto:[^:]+@[^:]+$/i.test(href));
}

export function hash(value) { return createHash('sha256').update(value).digest('hex'); }

export function verifyDocumentationSnapshot(files, navigation, manifest) {
  if (manifest?.schemaVersion !== 1 || manifest.repository !== documentationRepository ||
      !/^[a-f0-9]{40}$/.test(manifest.commit ?? '') || manifest.branch !== 'main')
    throw new Error('docs_invalid_source_manifest');
  const observed = validateDocumentation(files, navigation);
  if (JSON.stringify(observed.files) !== JSON.stringify(manifest.files) ||
      observed.navigationHash !== manifest.navigationHash) throw new Error('docs_snapshot_drift: update OnchainRouter/docs, then sync its reviewed commit');
  return manifest;
}
