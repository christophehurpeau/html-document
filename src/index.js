var Document = require('./Document').Document;

global.window = global;
global.document = new Document();
global.Event = require('./Event').Event;
global.Node = require('./Node').Node;
global.DocumentFragment = require('./DocumentFragment').DocumentFragment;
module.exports = global.document;
