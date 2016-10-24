import Node from './Node';

export default class Doctype extends Node {
  _toHTML() {
    return '<!DOCTYPE html>';
  }
}
