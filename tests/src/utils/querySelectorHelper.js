/* global test */
import { strictEqual, deepEqual, isNull } from 'proclaim';
import Document from '../../../lib/Document';

const document = new Document();

test('querySelector', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    const span1 = div.children[0];

    strictEqual(div.querySelector('span'), span1);
});

test('querySelectorAll', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    const span1 = div.children[0];
    const spanAbc = div.children[1];
    const innerSpan = div.children[1].children[0];

    deepEqual(div.querySelectorAll('span'), [span1, spanAbc, innerSpan]);
});

test('querySelector class', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    const spanA = div.children[0];

    strictEqual(div.querySelector('span.a'), spanA);
});

test('querySelectorAll class', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    const spanA = div.children[0];
    const spanAbc = div.children[1];

    deepEqual(div.querySelectorAll('span.a'), [spanA, spanAbc]);
});

test('querySelector classes', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    const spanAbc = div.children[1];

    strictEqual(div.querySelector('span.a.b'), spanAbc);
    strictEqual(div.querySelector('span.a.b.c'), spanAbc);
});

test('querySelectorAll classes', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    const spanAbc = div.children[1];

    deepEqual(div.querySelectorAll('span.a.b'), [spanAbc]);
    deepEqual(div.querySelectorAll('span.a.b.c'), [spanAbc]);
});

test('querySelector has attribute', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    const spanAbc = div.children[1];

    strictEqual(div.querySelector('span[class]'), spanAbc);
});

test('querySelectorAll has attribute', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    const spanAbc = div.children[1];

    deepEqual(div.querySelectorAll('span[class]'), [spanAbc]);

    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    const spanA = div.children[0];
    const spanAbc2 = div.children[1];

    deepEqual(div.querySelectorAll('span[class]'), [spanA, spanAbc2]);
});

test('querySelectorAll = attribute', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    const spanAbc = div.children[1];

    isNull(div.querySelector('span[class="a"]'));
    deepEqual(div.querySelectorAll('span[class="a b c"]'), [spanAbc]);
});

test('querySelector on several selectors', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="second">Text</span></div><i>Skip me</i><input type="text"/>';
    let element = document.body.querySelector('.first, input');
    strictEqual(element.getAttribute('type'), 'text');
});

test('querySelectorAll', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first">Text</span></div><i>Skip me</i><input type="text"/>';
    let elements = document.body.querySelectorAll('.first, input');
    strictEqual(elements.length, 2);
    strictEqual(elements[0].textContent, 'Text');
    strictEqual(elements[1].getAttribute('type'), 'text');
});

test('querySelectorAll for several elements', () => {
    const document = new Document();
    document.body.innerHTML = '<div>1</div><div>2</div><div>3</div><span></span><div>4</div>';
    let elements = document.body.querySelectorAll('div');
    strictEqual(elements.length, 4);
    strictEqual(elements[0].textContent, '1');
    strictEqual(elements[1].textContent, '2');
    strictEqual(elements[2].textContent, '3');
    strictEqual(elements[3].textContent, '4');
});

test('querySelectorAll deep several', () => {
    const document = new Document();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    let elements = document.body.querySelectorAll('div');
    strictEqual(elements.length, 4);
    strictEqual(elements[0].textContent, '1234');
    strictEqual(elements[1].textContent, '234');
    strictEqual(elements[2].textContent, '34');
    strictEqual(elements[3].textContent, '4');
});

test('querySelector complex rules', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' +
        '<i data-attr="1">Skip me</i><input type="text"/><i data-attr="some words"></i>' +
        '<i data-attr="some-words"></i>';
    let elements = document.body.querySelectorAll('[data-attr^=1]');
    strictEqual(elements.length, 2);
    elements = document.body.querySelectorAll('[data-attr$=3]');
    strictEqual(elements.length, 1);
    elements = document.body.querySelectorAll('[data-attr~="some"]');
    strictEqual(elements.length, 1);
    elements = document.body.querySelectorAll('[data-attr*="om"]');
    strictEqual(elements.length, 2);
});

test('querySelector attribute rules', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' +
        '<i data-attr="1">Skip me</i><input type="text"/><i data-attr="some words"></i>' +
        '<i data-attr="some-words"></i>';
    let elements = document.body.querySelectorAll('[data-attr]');
    strictEqual(elements.length, 4);
});

test('querySelector for nested elements', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="css class"></span></div><span title="title"></span>';

    let span = document.body.querySelector('div span.css');
    strictEqual(span.getAttribute('class'), 'css class');
});

test('Element querySelector on several selectors', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="second">Text</span></div><i>Skip me</i><input type="text"/>';
    let element = document.body.querySelector('.first, input');
    strictEqual(element.getAttribute('type'), 'text');
});

test('Element querySelectorAll for several selectors', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first">Text</span></div><i>Skip me</i><input type="text"/>';
    let elements = document.body.querySelectorAll('.first, input');
    strictEqual(elements.length, 2);
    strictEqual(elements[0].textContent, 'Text');
    strictEqual(elements[1].getAttribute('type'), 'text');
});

test('Element querySelectorAll returns nothing if not found', () => {
    const document = new Document();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    let elements = document.body.querySelectorAll('i');
    strictEqual(elements.length, 0);
});

test('Element querySelector with ID', () => {
    const document = new Document();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    let elements = document.body.querySelectorAll('#element');
    strictEqual(elements.length, 0);
});

test('Element name equal or starts with "|="', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' +
        '<i data-attr="123-other">Skip me</i><input type="text"/><i data-attr="123other"></i>' +
        '<i data-attr="other123-"></i>';
    let elements = document.body.querySelectorAll('[data-attr|=123]');
    strictEqual(elements.length, 2);
});

test('Nesting with > combinator', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' +
        '<div><i data-attr="123-other"><span>Skip me</span></i></div><input type="text"/>' +
        '<i data-attr="123other"></i><i data-attr="other123-"></i>';
    let elements = document.body.querySelectorAll('div > span');
    strictEqual(elements.length, 1);
});

test('Nesting with + combinator', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' +
        '<div><i data-attr="123-other"><span>Skip me</span></i></div><input type="text"/>' +
        '<i data-attr="123other"></i><i data-attr="other123-"></i>';
    let element = document.body.querySelector('input + i');
    strictEqual(element.getAttribute('data-attr'), '123other');

    document.body.innerHTML = '<div></div><p></p><div></div><a></a>';
    element = document.body.querySelector('div + p');
    strictEqual(element.tagName, 'p');
});

test('Nesting with ~ combinator', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' +
        '<div><i data-attr="123-other"><span>Skip me</span></i></div><input type="text"/>' +
        '<i data-attr="123other"></i><i data-attr="other123-"></i>';
    let elements = document.body.querySelectorAll('input ~ i');
    strictEqual(elements.length, 2);
});

test('Searching for nested structures', () => {
    const document = new Document();
    document.body.innerHTML =
        '<b>' +
            '<span>' +
                '<b>' +
                    '<span>' +
                        '<b><span></span></b>' +
                    '</span>' +
                '</b>' +
            '</span>' +
        '</b>';
    let elements = document.body.querySelectorAll('b > span');
    strictEqual(elements.length, 3);
});
