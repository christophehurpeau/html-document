import htmlparser from 'htmlparser2';

/**
 * @param {string} html
 * @param {Node} node
 */
export default function parse(html, node) {
  const stack = [node];
  const last = () => stack.length === 0 ? null : stack[stack.length - 1];

  const document = node.ownerDocument;

  const parser = new htmlparser.Parser({
    onopentagname(name) {
      const elt = document.createElement(name);
      stack.push(elt);
    },

    onattribute(name, value) {
      last().setAttribute(name, value);
    },

    ontext(text) {
      last().appendChild(document.createTextNode(text));
    },

    onclosetag(name) {
      const elt = stack.pop();
      last().appendChild(elt);
    },

    oncomment(data) {
      last().appendChild(document.createComment(data));
    },
  }, { recognizeSelfClosing: true });
  parser.write(html);
  parser.end();
}
