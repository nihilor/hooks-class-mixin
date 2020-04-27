let errorMessages = {
    1:  `.latch() expects at least two arguments, a hook name and a callback.`,
    2:  '.latch() expects a string for the hook name.',
    3:  '.latch() expects a function for the latch callback.',
    10: '.unlatch() expects exactly two arguments, the latch id and the hook name.',
    11: '.unlatch() expects a Symbol for the latch id.',
    12: '.unlatch() expects a string for the hook name.',
    20: '.hook() expects at least two arguments, the hook name and the initial result.',
    21: '.hook() expects a string for the hook name.'
}

let hooksMixin = {
    _hooks: {},

    at: function () {
        this.latch.apply(this, arguments)
    },

    latch: function (hookName, latchCallback, ...latchParams) {
        //  check
        if (arguments.length < 2)
            throw new Error(errorMessages[1])
        if (typeof arguments[0] !== 'string')
            throw new TypeError(errorMessages[2])
        if (typeof arguments[1] !== 'function')
            throw new TypeError(errorMessages[3])

        //  register hook
        if (hookName in this._hooks === false)
            this._hooks[hookName] = []

        //  add latch
        let latchId = Symbol(`Latch for the hook '${hookName}'`)
            this._hooks[hookName].push({
                id: latchId,
                fn: latchCallback,
                pr: latchParams
            })

        return latchId
    },

    unlatch: function (latchId, hookName) {
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
    },

    hook: function (hookName, result, ...hookParams) {
        //  check
        if (arguments.length < 2)
            throw new Error(errorMessages[20])
        if (typeof arguments[0] !== 'string')
            throw new TypeError(errorMessages[21])

        //  pick up latches
        if (hookName in this._hooks) {
            this._hooks[hookName].forEach(latch => {
                result = latch.fn.apply(this, hookParams.concat(result, latch.pr))
            })
        }

        return result
    }
}

module.exports = hooksMixin