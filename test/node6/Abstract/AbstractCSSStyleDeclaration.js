'use strict';

var _proclaim = require('proclaim');

var _ = require('../../..');

class MockCSSStyleDeclaration extends _.AbstractCSSStyleDeclaration {}

suite('CSSStyleDeclaration', () => {
  test('set and get cssText', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    (0, _proclaim.strictEqual)(style.cssText, 'color:white;background:#FFF!important;');
  });

  test('_parse', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    (0, _proclaim.strictEqual)(style._properties.length, 2);
    (0, _proclaim.isNotNull)(style._propertiesMap.color);
    (0, _proclaim.isNotNull)(style._propertiesMap.background);
    (0, _proclaim.strictEqual)(style._propertiesMap.color.name, 'color');
    (0, _proclaim.strictEqual)(style._propertiesMap.color.value, 'white');
    (0, _proclaim.strictEqual)(style._propertiesMap.color.important, false);
    (0, _proclaim.strictEqual)(style._propertiesMap.background.name, 'background');
    (0, _proclaim.strictEqual)(style._propertiesMap.background.value, '#FFF');
    (0, _proclaim.strictEqual)(style._propertiesMap.background.important, true);
  });

  test('_stringify', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    style._stringify();
    (0, _proclaim.strictEqual)(style.cssText, 'color:white;background:#FFF!important;');
  });

  test('getPropertyPriority', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    (0, _proclaim.strictEqual)(style.getPropertyPriority('color'), false);
    (0, _proclaim.strictEqual)(style.getPropertyPriority('something'), undefined);
    (0, _proclaim.strictEqual)(style.getPropertyPriority('background'), 'important');
  });

  test('getPropertyValue', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    (0, _proclaim.strictEqual)(style.getPropertyValue('color'), 'white');
    (0, _proclaim.strictEqual)(style.getPropertyValue('something'), undefined);
    (0, _proclaim.strictEqual)(style.getPropertyValue('background'), '#FFF');
  });

  test('item', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    (0, _proclaim.strictEqual)(style.item(0), 'color');
    (0, _proclaim.strictEqual)(style.item(1), 'background');
    (0, _proclaim.strictEqual)(style.item(2), undefined);
  });

  test('removeProperty', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    (0, _proclaim.strictEqual)(style.removeProperty('color'), 'white');
    (0, _proclaim.strictEqual)(style.item(0), 'background');
    (0, _proclaim.strictEqual)(style.item(1), undefined);
  });

  test('setProperty', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white';
    (0, _proclaim.strictEqual)(style.item(0), 'color');
    (0, _proclaim.strictEqual)(style.item(1), undefined);
    style.setProperty('background', '#FFF');
    (0, _proclaim.strictEqual)(style.item(1), 'background');
    (0, _proclaim.strictEqual)(style.getPropertyValue('background'), '#FFF');
    style.setProperty('background', '#000', 'important');
    (0, _proclaim.strictEqual)(style.item(1), 'background');
    (0, _proclaim.strictEqual)(style.item(2), undefined);
    (0, _proclaim.strictEqual)(style.getPropertyValue('background'), '#000');
  });
});
//# sourceMappingURL=AbstractCSSStyleDeclaration.js.map