import Node from './Node';
import Event from './Event';
import Document from './Document';
import DocumentFragment from './DocumentFragment';

global.window = global;
global.document = new Document();
global.Event = Event;
global.Node = Node;
global.Document = Document;
global.DocumentFragment = DocumentFragment;

global.Test = test;
