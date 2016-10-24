import { CssSelectorParser } from 'css-selector-parser';
import { Element, HTMLElement } from '../';

const cssParser = new CssSelectorParser();
cssParser.registerAttrEqualityMods('^', '$', '*', '~', '|');
cssParser.registerNestingOperators('>', '+', '~');

/**
 * querySelectorHelper interface provides simple processing
 * of Element.querySelector method.
 */

/**
 *
 * @param {Element} element
 * @param {string} query
 * @return {Element|null}
 */
export function querySelector(element: Element, query: string) {
  let rules = cssParser.parse(query);

  const iterator = processElementDeep(element, rules);
  const next = iterator.next();

  if (next && next.value) {
    return next.value;
  }

  return null;
}

/**
 *
 * @param {Element} element
 * @param {string} query
 * @return {Element[]}
 */
export function querySelectorAll(element: Element, query) {
  let rules = cssParser.parse(query);

  const result = [];
  for (let innerElement of processElementDeep(element, rules)) {
    result.push(innerElement);
  }

  return result;
}

/**
 * Function processes one element using current rule
 *
 * @param {HTMLElement} element - element to check
 * @param {*} rules - current rules to check against element
 * @return {boolean}
 */
function* processElement(element: HTMLElement, rules) {
  for (let child of element.children) {
    yield* processRules(child, rules);
  }
}

/**
 * Function processes one element using current rule
 *
 * @param {HTMLElement} element - element to check
 * @param {*} rules - current rules to check against element
 * @return {boolean}
 */
function* processElementDeep(element: HTMLElement, rules) {
  for (let child of element.children) {
    yield* processRules(child, rules);
    yield* processElementDeep(child, rules);
  }
}

/**
 * @param {Element} element
 * @param {Object} rules
 * @return {boolean}
 */
function processRules(element: Element, rules) {
  if (rules.type === 'selectors') {
    return processSelectors(element, rules.selectors);
  } else if (rules.type === 'ruleSet') {
    return processRule(element, rules.rule);
  }
}

/**
 * @param {Element} element
 * @param {Object} rule
 * @return {boolean}
 */
function processRule(element: Element, rule) {
  return processSelectors(element, [{ rule }]);
}

/**
 * @param {Element} element
 * @param {Object[]} selectors
 * @return {boolean}
 */
function* processSelectors(element: Element, selectors) {
  for (let selector of selectors) {
    const rule = selector.rule;

    if (!matchRule(element, rule)) {
      continue;
    }

    if (!rule.hasOwnProperty('rule')) {
      yield element;
      return;
    }

    switch (rule.rule.nestingOperator) {
      case '+':
        const nextElementSibling = element.nextElementSibling;
        if (nextElementSibling && matchRule(nextElementSibling, rule.rule)) {
          yield nextElementSibling;
        }

        break;
      case '~':
        yield* processElement(element.parentNode, { type: 'ruleSet', rule: rule.rule });
        break;
      case '>':
        yield* processElement(element, { type: 'ruleSet', rule: rule.rule });
        break;
      default:
        yield* processElementDeep(element, { type: 'ruleSet', rule: rule.rule });
    }

    return;
  }
}

function matchRule(element, rule) {
  if (rule.hasOwnProperty('tagName') && element.tagName !== rule.tagName) {
    return false;
  }

  if (rule.hasOwnProperty('id') && element.getAttribute('id') !== rule.id) {
    return false;
  }

  if (rule.hasOwnProperty('classNames')) {
    if (!rule.classNames.every(name => element.classList.contains(name))) {
      return false;
    }
  }

  if (rule.hasOwnProperty('attrs')) {
    if (!rule.attrs.some(attr => {
      if (!element.hasAttribute(attr.name)) {
        return false;
      } else if (attr.operator === undefined) {
        return true;
      }

      let value = element.getAttribute(attr.name);

      switch (attr.operator) {
        case '=':
          return value === attr.value;
        case '^=':
          return value.startsWith(attr.value);
        case '$=':
          return value.endsWith(attr.value);
        case '~=':
          let words = value.split(' ');
          return words.some(word => word === attr.value);
        case '*=':
          return value.indexOf(attr.value) !== -1;
        case '|=':
          return value === attr.value || value.startsWith(`${attr.value}-`);
        default:
          throw new Error(`Unsupported attribute operator ${attr.operator}`);
      }
    })) {
      return false;
    }
  }

  return true;
}
