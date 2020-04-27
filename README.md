# hooks-class-mixin

A mixin for a simple Hooks implementation in Javascript.

## What?

Hooks are a concept of modifying the behaviour of a program by adding code without changing the original code. The additional code is provided via latches. At certain situations during runtime the program actively collects the latches, provides the current result and takes the processing result from the latches. Latches can just provide and run their own code, or they can change what the program is doing or outputting by default.

## How?

This simplified hook implementation is designed as an universally as possible applicable mixin. Just add the mixin to your existing project. Then extend your class or assign the additional properties by composition.

Extending a class from `HooksClassMixin`:

```javascript
const HooksClassMixin = require('hooks-class-mixin/index.class')
class AClass extends HooksClassMixin {}
let   anObject = new AClass()
```

Compose a class by assign the object properties:

```javascript
const hooksMixin = require('hooks-class-mixin/index.object')
class AClass {}
Object.assign(MyClass.prototype, hooksMixin)
let   anObject = new AClass()
```

## LongShort Example

In `./examples/longshort` you will find a very simple example of a hooks application. The example is not very representative, but explains the functionality of Hooks very clearly. `LongShort` shortens or lengthens strings. The hooks just handover the current result, the latches check the current result and will change it, if it matches a specific condition.

`LongShort` will change the result `Read-eval-print loop` to `REPL` and vice versa. It will also change the result `Javascript` to `JavaS.` and `JavaS.` to `JS`.

```javascript
const hooksMixin = require('../index.object.js')
class LongShort {}
Object.assign(LongShort.prototype, hooksMixin)
let   ls = new LongShort()

//  a. shorten Read-eval-print loop to REPL
ls.latch(
    'shorten',
    result => { return result === 'Read-eval-print loop' ? 'REPL' : result }
)
//  b. shorten Javascript to JavaS.
ls.latch(
    'shorten',
    result => { return result === 'Javascript' ? 'JavaS.' : result }
)
//  c. shorten JavaS. to JS
ls.latch(
    'shorten',
    result => { return result === 'JavaS.' ? 'JS' : result }
)
//  d. lengthens REPL to Read-eval-print loop
ls.latch(
    'lengthen',
    result => { return result === 'REPL' ? 'Read-eval-print loop' : result }
)
//  e. lengthens JS to Javascript
ls.latch(
    'lengthen',
result => { return result === 'JS' ? 'Javascript' : result }
)

//  nothing changes
console.log('1. Test =>', ls.hook('shorten', 'Test'))
//  Read-eval-print loop will be shortened to REPL (a)
console.log('2. Read-eval-print loop =>', ls.hook('shorten', 'Read-eval-print loop'))
//  Javascript will be shortened to JavaS. and then to JS (b, c)
console.log('3. Javascript =>', ls.hook('shorten', 'Javascript'))

//  nothing changes
console.log('4. Test =>', ls.hook('lengthen', 'Test'))
//  JS will be lengthened to Javascript (e)
console.log('5. JS =>', ls.hook('lengthen', 'JS'))
//  REPL will be lengthened to Read-eval-print loop (d)
console.log('6. REPL =>', ls.hook('lengthen', 'REPL'))
```

## Origin

This work is based on [Microkernel for Server Applications](https://github.com/rse/microkernel/blob/master/src/microkernel-5-hook.js) by [Ralf S. Engelschall](https://github.com/rse), but reimplemented and modified to be as universally applicable as possible.

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
