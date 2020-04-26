/*
Hooks are a concept of modifying the behaviour of a program by injecting code without changing the original code.
*/

let errorMessages = {
    1:  `.latch() expects at least two arguments, a hook name and a callback.`,
    2:  '.latch() expects a string for the hook name.',
    3:  '.latch() expects a function for the hook callback.',
    10: '.unlatch() expects at least one arguments, the latch id and optionally the hook name.',
    11: '.unlatch() expects a Symbol for the latch id.',
    12: '.unlatch() expects a string for the hook name.',
    20: '.hook() expects exactly one argument, a hook name.',
    21: '.hook() expects a string for the hook name.'
}

class HooksClassMixin {
    _hooks = {}

    at () {
        this.latch.apply(this, arguments)
    }

    latch (hookName, hookCallback, hookParams) {
        //  check
        if (arguments.length < 2)
            throw new Error(errorMessages[1])
        if (typeof arguments[0] !== 'string')
            throw new TypeError(errorMessages[2])
        if (typeof arguments[1] !== 'function')
            throw new TypeError(errorMessages[3])

        //  register hook
        this.hook(hookName)

        //  add latch
        let latchId = Symbol(`Latch for the hook '${hookName}'`)
            this._hooks[hookName].push({
            id: latchId,
            fn: hookCallback,
            pr: hookParams
        })

        return latchId
    }

    unlatch (latchId, hookName) {
        //  check
        if (arguments.length !== 2)
            throw new Error(errorMessages[10])
        if (typeof arguments[0] !== 'symbol')
            throw new TypeError(errorMessages[11])
        if (typeof arguments[1] !== 'string')
            throw new TypeError(errorMessages[12])
        
        //  remove latch
        if (hookName in this._hooks)
            this._hooks[hookName] = this._hooks[hookName].filter(latch => latch.id !== latchId)
    }

    hook (hookName) {
        //  check
        if (arguments.length !== 1)
            throw new Error(errorMessages[20])
        if (typeof arguments[0] !== 'string')
            throw new TypeError(errorMessages[21])

        //  initialize hook
        if (hookName in this._hooks === false)
            this._hooks[hookName] = []
    }
}

module.exports = HooksClassMixin