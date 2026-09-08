import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { validateDocumentation } from './contract.mjs';
const files = Object.fromEntries(readdirSync('guides').map(name => {
  if (!lstatSync('guides/' + name).isFile()) throw new Error('guides must contain regular Markdown files only');
  return [name, readFileSync('guides/' + name, 'utf8')];
}));
validateDocumentation(files, JSON.parse(readFileSync('navigation.json', 'utf8')));
console.log('Documentation checks passed: ' + Object.keys(files).length + ' guides; no payments made.');
