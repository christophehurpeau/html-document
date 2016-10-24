class CSSStyleRule {
    /**
     * @param {string} propertyName
     * @param {string} value
     * @param {boolean} important
     */
  constructor(propertyName, value, important) {
    this.name = propertyName;
    this.value = value;
    this.important = important;
  }
}

/**
 * CSSStyleDeclaration represents a collection of CSS property-value pairs. It is used in a few APIs
 *
 * - HTMLElement.style - to manipulate the style of a single element (<elem style="...">);
 * - (TODO: reword) is an interface to the declaration block returned by the style
 * property of a cssRule in a stylesheet, when the rule is a CSSStyleRule.
 * - CSSStyleDeclaration is also a read-only interface to the result of window.getComputedStyle().
 */
export default class AbstractCSSStyleDeclaration {
    /**
     * @type {string}
     */
  get cssText() {
    return this._value;
  }

    /**
     * @param {string} style
     */
  set cssText(style) {
    this._parse(style);
  }

    /**
     * Parse style
     *
     * @internal
     * @param {string} style
     */
  _parse(style) {
    this._properties = [];
    this._propertiesMap = {};
    style.split(';').forEach((part) => {
      part = part.trim();
      if (!part) {
        return;
      }

      const important = !!part.match(/!important$/);
      if (important) {
        part = part.slice(0, -'!important'.length);
      }

      const splitPoint = part.indexOf(':');
      if (splitPoint) {
        const key = part.slice(0, splitPoint).trim();
        const value = part.slice(splitPoint + 1).trim();
        this._setProperty(key, value, important && 'important');
      }
    });
    this._stringify();
  }

    /**
     * Parse style
     *
     * @internal
     */
  _stringify() {
    let stylified = '';
    this._properties.forEach(prop => {
      stylified += `${prop.name}:${prop.value}${prop.important && '!important' || ''};`;
    });
    this._value = stylified;
  }

    /**
     * Returns the optional priority, "important". Example: priString= styleObj.getPropertyPriority('color')
     *
     * @param {string} propertyName
     * @param {String|undefined|false} important
     */
  getPropertyPriority(propertyName) {
    return this._propertiesMap[propertyName] && this._propertiesMap[propertyName].important && 'important';
  }

    /**
     * Returns the optional priority, "important". Example: priString= styleObj.getPropertyPriority('color')
     *
     * @param {string} propertyName
     * @return {*} propertyValue
     */
  getPropertyValue(propertyName) {
    return this._propertiesMap[propertyName] && this._propertiesMap[propertyName].value;
  }

    /**
     * Returns a property name. Example: nameString= styleObj.item(0) Alternative: nameString= styleObj[0]
     *
     * @param {number} index
     * @return {string} propertyName
     */
  item(index) {
    return this._properties[index] && this._properties[index].name;
  }

    /**
     * Returns the value deleted. Example: valString= styleObj.removeProperty('color')
     *
     * @param {string} propertyName
     * @return {*} propertyValue
     */
  removeProperty(propertyName) {
    if (this._propertiesMap[propertyName]) {
      const value = this._propertiesMap[propertyName];
      this._properties.splice(this._properties.indexOf(value), 1);
      delete this._propertiesMap[propertyName];
      this._stringify();
      return value.value;
    }
  }

    /**
     * No return. Example: styleObj.setProperty('color', 'red', 'important')
     *
     * @param {string} propertyName
     * @param {string} value
     * @param {string} important
     */
  setProperty(propertyName, value, important) {
    this._setProperty(propertyName, value, important);
    this._stringify();
  }

    /**
     * No return. Example: styleObj.setProperty('color', 'red', 'important')
     *
     * @param {string} propertyName
     * @param {string} value
     * @param {string} important
     */
  _setProperty(propertyName, value, important) {
    if (!propertyName.match(/^[a-z\-]+$/)) {
      throw new Error(`Not valid property name: ${propertyName}`);
    }

    const cssRule = new CSSStyleRule(propertyName, value, important === 'important');
    if (this._propertiesMap[propertyName]) {
      this._properties.splice(this._properties.indexOf(this._propertiesMap[propertyName]), 1, cssRule);
    } else {
      this._properties.push(cssRule);
    }

    this._propertiesMap[propertyName] = cssRule;
  }
}
