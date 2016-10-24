import { strictEqual, isNotNull } from 'proclaim';
import { AbstractCSSStyleDeclaration } from '../../../src';

class MockCSSStyleDeclaration extends AbstractCSSStyleDeclaration {
}

suite('CSSStyleDeclaration', () => {
  test('set and get cssText', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    strictEqual(style.cssText, 'color:white;background:#FFF!important;');
  });

  test('_parse', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    strictEqual(style._properties.length, 2);
    isNotNull(style._propertiesMap.color);
    isNotNull(style._propertiesMap.background);
    strictEqual(style._propertiesMap.color.name, 'color');
    strictEqual(style._propertiesMap.color.value, 'white');
    strictEqual(style._propertiesMap.color.important, false);
    strictEqual(style._propertiesMap.background.name, 'background');
    strictEqual(style._propertiesMap.background.value, '#FFF');
    strictEqual(style._propertiesMap.background.important, true);
  });

  test('_stringify', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    style._stringify();
    strictEqual(style.cssText, 'color:white;background:#FFF!important;');
  });

  test('getPropertyPriority', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    strictEqual(style.getPropertyPriority('color'), false);
    strictEqual(style.getPropertyPriority('something'), undefined);
    strictEqual(style.getPropertyPriority('background'), 'important');
  });

  test('getPropertyValue', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    strictEqual(style.getPropertyValue('color'), 'white');
    strictEqual(style.getPropertyValue('something'), undefined);
    strictEqual(style.getPropertyValue('background'), '#FFF');
  });

  test('item', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    strictEqual(style.item(0), 'color');
    strictEqual(style.item(1), 'background');
    strictEqual(style.item(2), undefined);
  });

  test('removeProperty', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white; background: #FFF !important';
    strictEqual(style.removeProperty('color'), 'white');
    strictEqual(style.item(0), 'background');
    strictEqual(style.item(1), undefined);
  });

  test('setProperty', () => {
    let style = new MockCSSStyleDeclaration();

    style.cssText = 'color: white';
    strictEqual(style.item(0), 'color');
    strictEqual(style.item(1), undefined);
    style.setProperty('background', '#FFF');
    strictEqual(style.item(1), 'background');
    strictEqual(style.getPropertyValue('background'), '#FFF');
    style.setProperty('background', '#000', 'important');
    strictEqual(style.item(1), 'background');
    strictEqual(style.item(2), undefined);
    strictEqual(style.getPropertyValue('background'), '#000');
  });
});
