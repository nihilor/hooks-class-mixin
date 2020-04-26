# hooks-class-mixin

A class mixin for a simple Hooks implementation in Javascript.

## What?

Hooks are a concept of modifying the behaviour of a program by injecting code without changing the original code.

## How?

This simple hook implementation is designed as a class mixin for composition. Just add the mixin to your existing class.

## Example

```javascript
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
```

## LICENSE

MIT License

Copyright (c) 2020 Mark Lubkowitz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
