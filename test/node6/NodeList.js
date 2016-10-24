'use strict';

var _proclaim = require('proclaim');

var _ = require('../..');

suite('NodeList', () => {
  test('NodeList items', () => {
    const document = new _.Document();
    const div = document.createElement('div');

    const nodeList = new _.NodeList();

    (0, _proclaim.strictEqual)(nodeList.length, 0);
    nodeList._push(div);
    (0, _proclaim.strictEqual)(nodeList.length, 1);

    (0, _proclaim.strictEqual)(nodeList[0], div);
    (0, _proclaim.strictEqual)(nodeList[1], undefined);

    (0, _proclaim.strictEqual)(nodeList.item(0), div);
    (0, _proclaim.strictEqual)(nodeList.item(1), null);
  });

  test('NodeList iterator', () => {
    const document = new _.Document();
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    const nodeList = new _.NodeList();

    nodeList._push(div1);
    nodeList._push(div2);

    (0, _proclaim.strictEqual)(nodeList[0], div1);
    (0, _proclaim.strictEqual)(nodeList[1], div2);

    let index = 0;
    for (let item of nodeList) {
      if (index++ === 0) {
        (0, _proclaim.strictEqual)(item, div1);
      } else {
        (0, _proclaim.strictEqual)(item, div2);
      }
    }

    (0, _proclaim.strictEqual)(index, 2);
  });
});
//# sourceMappingURL=NodeList.js.map