function Generator() {
    if (!(this instanceof Generator)) throw '!Generator'

    this.generating = false

    var ws

    const host = 'wss://bellard.org/textsynth/ws' // 'ws://161.35.155.75:666'
    const protocol = 'gpt2'
    const emitter = new Emitter()

    var output = ''



    this.start = prompt => {
        this.generating = true

        ws = new WebSocket(host, protocol)

        ws.onopen = () => {
            console.log('generating...', { prompt })
            ws.send(`g,${prompt}`)
        }
        ws.onmessage = message => {
            console.log('>', message.data)
            output += message.data

            emitter.emit('data', message.data)
        }

        ws.onerror = error => {
            emitter.emit('error', error)
        }

        return this
    }

    this.stop = () => {
        this.generating = false
        ws.close()
        ws = null
        return this
    }

    this.on = (what, then) => {
        emitter.on(what, then)
        return this
    }

    this.off = (what, then) => {
        emitter.off(what, then)
        return this
    }
}