const HooksClassMixin = require('../index.class.js')
class LongShort extends HooksClassMixin {}
let ls = new LongShort()

ls.latch(
    'shorten',
    result => { return result === 'Read-eval-print loop' ? 'REPL' : result }
)
ls.at(
    'shorten',
    result => { return result === 'Javascript' ? 'JavaS.' : result }
)
ls.at(
    'shorten',
    result => { return result === 'JavaS.' ? 'JS' : result }
)
ls.latch(
    'lengthen',
    result => { return result === 'REPL' ? 'Read-eval-print loop' : result }
)
ls.at(
    'lengthen',
    result => { return result === 'JS' ? 'Javascript' : result }
)

console.log('Test =>', ls.hook('shorten', 'Test'))
console.log('Javascript =>', ls.hook('shorten', 'Javascript'))
console.log('Read-eval-print loop =>', ls.hook('shorten', 'Read-eval-print loop'))

console.log('Test =>', ls.hook('lengthen', 'Test'))
console.log('JS =>', ls.hook('lengthen', 'JS'))
console.log('REPL =>', ls.hook('lengthen', 'REPL'))