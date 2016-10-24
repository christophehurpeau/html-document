export default function escapeHTML(string) {
  if (!string) {
    return string;
  }

  return String(string)
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
