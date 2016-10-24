import escapeHTML from './escapeHTML';

export default function escapeAttribute(string) {
  return escapeHTML(string).replace(/"/g, '&quot;');
}
