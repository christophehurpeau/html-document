'use strict';

var _proclaim = require('proclaim');

var _ = require('../../..');

suite('escpaeAttributeName', () => {
  test('Test attributeNameToProperty', () => {
    (0, _proclaim.strictEqual)(_.utils.attributeNameToProperty('data-other'), 'other');
    (0, _proclaim.strictEqual)(_.utils.attributeNameToProperty('data-other-dashes'), 'otherDashes');
    (0, _proclaim.strictEqual)(_.utils.attributeNameToProperty('data-other-dashes-more'), 'otherDashesMore');
  });

  test('Test propertyNameToAttribute', () => {
    (0, _proclaim.strictEqual)(_.utils.propertyNameToAttribute('other'), 'data-other');
    (0, _proclaim.strictEqual)(_.utils.propertyNameToAttribute('otherDashes'), 'data-other-dashes');
    (0, _proclaim.strictEqual)(_.utils.propertyNameToAttribute('otherLongValue'), 'data-other-long-value');
  });
});
//# sourceMappingURL=escapeAttributeName.js.map