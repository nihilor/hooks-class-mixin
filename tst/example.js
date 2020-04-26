//  import and mixin
const HooksClassMixin = require('../hooks')
class aClass extends HooksClassMixin {}
let theObject = new aClass()

//  create a hook
theObject.hook('export')

//  create a latch for a hook
let exportLatchId = theObject.latch('export', data => console.log(data))

//  create a latch for a hook with an object as parameter
let importLatchId = theObject.latch('import', data => console.log(data), { k: 'Some data' })

//  unlatch
theObject.unlatch(importLatchId, 'import')
theObject.unlatch(exportLatchId, 'export')