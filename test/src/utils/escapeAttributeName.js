import { strictEqual } from 'proclaim';
import { utils } from '../../../src';

suite('escpaeAttributeName', () => {
  test('Test attributeNameToProperty', () => {
    strictEqual(utils.attributeNameToProperty('data-other'), 'other');
    strictEqual(utils.attributeNameToProperty('data-other-dashes'), 'otherDashes');
    strictEqual(utils.attributeNameToProperty('data-other-dashes-more'), 'otherDashesMore');
  });

  test('Test propertyNameToAttribute', () => {
    strictEqual(utils.propertyNameToAttribute('other'), 'data-other');
    strictEqual(utils.propertyNameToAttribute('otherDashes'), 'data-other-dashes');
    strictEqual(utils.propertyNameToAttribute('otherLongValue'), 'data-other-long-value');
  });
});
