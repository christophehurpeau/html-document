'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _set = require('babel-runtime/helpers/set')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _HTMLElement2 = require('../HTMLElement');

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

/**
 * Class provide processing for innerHTML function for Document.documentElement
 * element. When this element property innerHTML changes, it also updates links
 * for head, body elements in document.
 */
/** @class DocumentElementHelper */
var DocumentElementHelper = (function (_HTMLElement) {
  _inherits(DocumentElementHelper, _HTMLElement);

  function DocumentElementHelper() {
    _classCallCheck(this, DocumentElementHelper);

    _get(Object.getPrototypeOf(DocumentElementHelper.prototype), 'constructor', this).apply(this, arguments);
  }

  /**
   * @constant {string} DocumentElementHelper#nodeName html
   */

  _createClass(DocumentElementHelper, [{
    key: 'innerHTML',

    /**
     * Sets inner HTML for element.
     *
     * @param {string} value
     
    * @memberof DocumentElementHelper 
    * @instance 
    * @param value */
    set: function set(value) {
      _set(Object.getPrototypeOf(DocumentElementHelper.prototype), 'innerHTML', value, this);
      this.ownerDocument.head = this._childNodesRecursiveFind(function (child) {
        return child.tagName === 'head';
      });
      this.ownerDocument.body = this._childNodesRecursiveFind(function (child) {
        return child.tagName === 'body';
      });
    }
  }]);

  return DocumentElementHelper;
})(_HTMLElement3['default']);

exports['default'] = DocumentElementHelper;
Object.defineProperty(DocumentElementHelper.prototype, 'nodeName', { value: 'html' });
module.exports = exports['default'];
//# sourceMappingURL=DocumentElementHelper.js.map