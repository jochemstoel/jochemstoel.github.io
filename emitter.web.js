/**
 * Simpler EventTarget class without the need to dispatch Event instances.
 * @constructor
 * @returns {Emitter} new instance of Emitter
 */
function Emitter() {
    if (!(this instanceof Emitter)) throw new TypeError('Emitter is not a function.')

    /**
     * Store event handlers here.
     * @type {Array}
     * @private
     */
    let handlers = []

    /**
     * Add event listener.
     * @param {string} event type 
     * @param {function} callback function
     */
    this.addEventListener = (type, fn) => {
        handlers.push([type, fn])
    }

    /**
     * Remove event listener.
     * @param {string} event type 
     * @param {function} callback function
     */
    this.removeEventListener = (type, fn = true) => {
        handlers = handlers.filter(handler => !(handler[0] == type && (fn == true ? true : handler[1] == fn)))
    }

    /**
     * Dispatch event.
     * @param {string} event type 
     * @param {any} event data
     */
    this.dispatchEvent = (type, data) => {
        handlers.filter(handler => new RegExp("^" + handler[0].split("*").join(".*") + "$").test(type)).forEach(handler => handler[1](data, type))
    }

    /**
     * Clear event listeners
     * @param {string} [event type] (optional)
     */
    this.clearEventListeners = () => {
        handlers = []
    }

    /**
     * Get list of event handlers (of a type) or all if type is not specified
     * @param {string} [event type] (optional) 
     */
    this.getEventListeners = type => {
        if (!type)
            return handlers

        let fns = []
        handlers.filter(handler => handler[0] == type).forEach(handler => fns.push(handler[1]))

        return fns
    }

    /**
     * Shortcut for addEventListener.
     * @param {string} event type 
     * @param {function} callback function 
     */
    this.on = (type, fn) => {
        /* added: array van types */
        if (Array.isArray(type)) type.forEach(t => this.addEventListener(t, fn))
        else this.addEventListener(type, fn)
        return this /* chain */
    }

    /**
     * Shortcut for removeEventListener
     * @param {string} event type 
     * @param {function} callback function 
     */
    this.off = (type, fn) => {
        /* added: array van types */
        if (Array.isArray(type)) type.forEach(t => this.removeEventListener(t, fn))
        else this.removeEventListener(type, fn)
        return this /* chain */
    }

    /**
     * Shortcut for dispatchEvent
     * @param {string} event type 
     * @param {any} event data
     */
    this.emit = (type, data) => {
        this.dispatchEvent(type, data)
        return this /* chain */
    }

    /**
     * Shortcut to pipe all events
     * @param {Emitter} target target 
     * @returns {Emitter} target Emitter for chaining pipes
     */
    this.pipe = target => this.on('*', (event, type) => target.emit(type, event))

    /**
     * Shortcut for clearEventListeners
     * @param {string} event type 
     */
    this.clear = type => {
        this.clearEventListeners(type)
        return this
    }

    /**
     * 
     * @param {string} [type]
     */
    this.list = type => this.getEventListeners(type)
}