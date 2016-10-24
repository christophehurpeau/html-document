import Node from '../Node';
import Text from '../Text';
import DOMException from '../DOMException';

function cloneElementNode(element, deep) {
  let clone = element.ownerDocument.createElement(element.nodeName);
  clone._ownerDocument = null;
  clone._parentNode = null;
  let attributes = element.attributes;
  for (let key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      clone.setAttribute(key, element.getAttribute(key));
    }
  }

  if (deep) {
    element.childNodes.every((child) => {
      clone.appendChild(cloneAnyNode(child, deep));
      return true;
    });
  }

  return clone;
}

function cloneTextNode(element) {
  return new Text(element.value);
}

/**
 * Function return copy of element and if request deep copy of element
 *
 * @param {ParentNode|Node} element
 * @param {boolean} deep
 * @ignore
 */
function cloneAnyNode(element, deep) {
  switch (element.nodeType) {
    case Node.ELEMENT_NODE:
      return cloneElementNode(element, deep);
    case Node.TEXT_NODE:
      return cloneTextNode(element);
    default:
      throw new DOMException(DOMException.DATA_CLONE_ERR);
  }
}

export {
  cloneAnyNode,
  cloneElementNode,
  cloneTextNode,
};
