import { strictEqual } from 'proclaim';
import { Document, NodeList } from '../../src';

suite('NodeList', () => {
  test('NodeList items', () => {
    const document = new Document();
    const div = document.createElement('div');

    const nodeList = new NodeList();

    strictEqual(nodeList.length, 0);
    nodeList._push(div);
    strictEqual(nodeList.length, 1);

    strictEqual(nodeList[0], div);
    strictEqual(nodeList[1], undefined);

    strictEqual(nodeList.item(0), div);
    strictEqual(nodeList.item(1), null);
  });

  test('NodeList iterator', () => {
    const document = new Document();
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    const nodeList = new NodeList();

    nodeList._push(div1);
    nodeList._push(div2);

    strictEqual(nodeList[0], div1);
    strictEqual(nodeList[1], div2);

    let index = 0;
    for (let item of nodeList) {
      if (index++ === 0) {
        strictEqual(item, div1);
      } else {
        strictEqual(item, div2);
      }
    }

    strictEqual(index, 2);
  });
});
