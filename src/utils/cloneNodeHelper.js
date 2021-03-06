import Node from '../Node';
import Text from '../Text';
import DOMException from '../DOMException';

function cloneArguments(source, dest) {
    for (const attr of source.attributes) {
        dest.setAttribute(attr.name, attr.value);
    }
}

function cloneElementNode(element, deep) {
    const clone = element.ownerDocument.createElement(element.nodeName);
    clone._ownerDocument = element._ownerDocument;
    clone._parentNode = null;
    cloneArguments(element, clone);

    if (deep) {
        element.childNodes.forEach(child => clone.appendChild(cloneAnyNode(child, deep)));
    }

    return clone;
}

function cloneDocumentFragment(fragment, deep) {
    const clone = fragment.ownerDocument.createDocumentFragment();

    if (deep) {
        fragment.childNodes.forEach(child => clone.appendChild(cloneAnyNode(child, deep)));
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
        case Node.DOCUMENT_FRAGMENT_NODE:
            return cloneDocumentFragment(element, deep);
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
