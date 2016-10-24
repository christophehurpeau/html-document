const exceptions = {
  IndexSizeError: { code: 1, message: 'The index is not in the allowed range.' },
  HierarchyRequestError: { code: 3, message: 'The operation would yield an incorrect node tree.' },
  WrongDocumentError: { code: 4, message: 'The object is in the wrong document.' },
  InvalidCharacterError: { code: 5, message: 'The string contains invalid characters.' },
  NoModificationAllowedError: { code: 7, message: 'The object can not be modified.' },
  NotFoundError: { code: 8, message: 'The object can not be found here.' },
  NotSupportedError: { code: 9, message: 'The operation is not supported.' },
  InvalidStateError: { code: 11, message: 'The object is in an invalid state.' },
  SyntaxError: { code: 12, message: 'The string did not match the expected pattern.' },
  InvalidModificationError: { code: 13, message: 'The object can not be modified in this way.' },
  NamespaceError: { code: 14, message: 'The operation is not allowed by Namespaces in XML.' },
  InvalidAccessError: { code: 15, message: 'The object does not support the operation or argument.' },
  SecurityError: { code: 18, message: 'The operation is insecure.' },
  NetworkError: { code: 19, message: 'A network error occurred.' },
  AbortError: { code: 20, message: 'The operation was aborted.' },
  URLMismatchError: { code: 21, message: 'The given URL does not match another URL.' },
  QuotaExceededError: { code: 22, message: 'The quota has been exceeded.' },
  TimeoutError: { code: 23, message: 'The operation timed out.' },
  InvalidNodeTypeError: {
    code: 24,
    message: 'The supplied node is incorrect or has an incorrect ancestor for this operation.',
  },
  DataCloneError: { code: 25, message: 'The object can not be cloned.' },
  EncodingError: { message: 'The encoding operation (either encoded or decoding) failed.' },
  NotReadableError: { message: 'The I/O read operation failed.' },
};

/**
 * @see https://developer.mozilla.org/en/docs/Web/API/DOMException
 * @see https://www.w3.org/TR/domcore/#exception-domexception
 * @param {number} code
 */
export default class DOMException {
    /**
     * @see https://heycam.github.io/webidl/#es-DOMException-constructor-object
     *
     * @param {string} name
     */
  constructor(name) {
    this._name = name;
    Error.captureStackTrace(this, DOMException);
  }

    /**
     * @type {number}
     * @readonly
     */
  get code() {
    return exceptions[this._name].code || 0;
  }

    /**
     * @type {string}
     * @readonly
     */
  get name() {
    return this._name;
  }

    /**
     * @type {string}
     * @readonly
     */
  get message() {
    return exceptions[this._name].message;
  }
}

/**
 * @constant {number} DOMException.INDEX_SIZE_ERR
 */
Object.defineProperty(DOMException, 'INDEX_SIZE_ERR', { enumerable: true, configurable: false, value: 1 });

/**
 * @constant {number} DOMException.DOMSTRING_SIZE_ERR
 */
Object.defineProperty(DOMException, 'DOMSTRING_SIZE_ERR', { enumerable: true, configurable: false, value: 2 });

/**
 * @constant {number} DOMException.HIERARCHY_REQUEST_ERR
 */
Object.defineProperty(DOMException, 'HIERARCHY_REQUEST_ERR', { enumerable: true, configurable: false, value: 3 });

/**
 * @constant {number} DOMException.WRONG_DOCUMENT_ERR
 */
Object.defineProperty(DOMException, 'WRONG_DOCUMENT_ERR', { enumerable: true, configurable: false, value: 4 });

/**
 * @constant {number} DOMException.INVALID_CHARACTER_ERR
 */
Object.defineProperty(DOMException, 'INVALID_CHARACTER_ERR', { enumerable: true, configurable: false, value: 5 });

/**
 * @constant {number} DOMException.NO_DATA_ALLOWED_ERR
 */
Object.defineProperty(DOMException, 'NO_DATA_ALLOWED_ERR', { enumerable: true, configurable: false, value: 6 });

/**
 * @constant {number} DOMException.NO_MODIFICATION_ALLOWED_ERR
 */
Object.defineProperty(DOMException, 'NO_MODIFICATION_ALLOWED_ERR', { enumerable: true, configurable: false, value: 7 });

/**
 * @constant {number} DOMException.NOT_FOUND_ERR
 */
Object.defineProperty(DOMException, 'NOT_FOUND_ERR', { enumerable: true, configurable: false, value: 8 });

/**
 * @constant {number} DOMException.NOT_SUPPORTED_ERR
 */
Object.defineProperty(DOMException, 'NOT_SUPPORTED_ERR', { enumerable: true, configurable: false, value: 9 });

/**
 * @constant {number} DOMException.INUSE_ATTRIBUTE_ERR
 */
Object.defineProperty(DOMException, 'INUSE_ATTRIBUTE_ERR', { enumerable: true, configurable: false, value: 10 });

/**
 * @constant {number} DOMException.INVALID_STATE_ERR
 */
Object.defineProperty(DOMException, 'INVALID_STATE_ERR', { enumerable: true, configurable: false, value: 11 });

/**
 * @constant {number} DOMException.SYNTAX_ERR
 */
Object.defineProperty(DOMException, 'SYNTAX_ERR', { enumerable: true, configurable: false, value: 12 });

/**
 * @constant {number} DOMException.INVALID_MODIFICATION_ERR
 */
Object.defineProperty(DOMException, 'INVALID_MODIFICATION_ERR', { enumerable: true, configurable: false, value: 13 });

/**
 * @constant {number} DOMException.NAMESPACE_ERR
 */
Object.defineProperty(DOMException, 'NAMESPACE_ERR', { enumerable: true, configurable: false, value: 14 });

/**
 * @constant {number} DOMException.INVALID_ACCESS_ERR
 */
Object.defineProperty(DOMException, 'INVALID_ACCESS_ERR', { enumerable: true, configurable: false, value: 15 });

/**
 * @constant {number} DOMException.VALIDATION_ERR
 */
Object.defineProperty(DOMException, 'VALIDATION_ERR', { enumerable: true, configurable: false, value: 16 });

/**
 * @constant {number} DOMException.TYPE_MISMATCH_ERR
 */
Object.defineProperty(DOMException, 'TYPE_MISMATCH_ERR', { enumerable: true, configurable: false, value: 17 });

/**
 * @constant {number} DOMException.SECURITY_ERR
 */
Object.defineProperty(DOMException, 'SECURITY_ERR', { enumerable: true, configurable: false, value: 18 });

/**
 * @constant {number} DOMException.NETWORK_ERR
 */
Object.defineProperty(DOMException, 'NETWORK_ERR', { enumerable: true, configurable: false, value: 19 });

/**
 * @constant {number} DOMException.ABORT_ERR
 */
Object.defineProperty(DOMException, 'ABORT_ERR', { enumerable: true, configurable: false, value: 20 });

/**
 * @constant {number} DOMException.URL_MISMATCH_ERR
 */
Object.defineProperty(DOMException, 'URL_MISMATCH_ERR', { enumerable: true, configurable: false, value: 21 });

/**
 * @constant {number} DOMException.QUOTA_EXCEEDED_ERR
 */
Object.defineProperty(DOMException, 'QUOTA_EXCEEDED_ERR', { enumerable: true, configurable: false, value: 22 });

/**
 * @constant {number} DOMException.TIMEOUT_ERR
 */
Object.defineProperty(DOMException, 'TIMEOUT_ERR', { enumerable: true, configurable: false, value: 23 });

/**
 * @constant {number} DOMException.INVALID_NODE_TYPE_ERR
 */
Object.defineProperty(DOMException, 'INVALID_NODE_TYPE_ERR', { enumerable: true, configurable: false, value: 24 });

/**
 * @constant {number} DOMException.DATA_CLONE_ERR
 */
Object.defineProperty(DOMException, 'DATA_CLONE_ERR', { enumerable: true, configurable: false, value: 25 });
