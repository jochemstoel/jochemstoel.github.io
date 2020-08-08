function Generator() {
    if (!(this instanceof Generator)) throw '!Generator'

    this.generating = false

    var ws

    const host = 'wss://bellard.org/textsynth/ws' // 'ws://161.35.155.75:666'
    const protocol = 'gpt2'
    const emitter = new Emitter()

    this.start = prompt => {
        this.generating = true
        let tries = 1
        try {
            ws = new WebSocket(host, protocol)

            ws.onopen = () => {
                console.log('generating...', { prompt })
                ws.send(`g,${prompt}`)
            }
            ws.onmessage = message =>
                emitter.emit('data', message.data)


            ws.onerror = error => {
                emitter.emit('error', error)
            }
        } catch (error) {
            emitter.emit('error', error)
            tries++
            console.log('retrying', tries)
            this.start(prompt)
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