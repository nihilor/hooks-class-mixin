const HooksClassMixin = require('../index.class.js')
class LongShort extends HooksClassMixin {}
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