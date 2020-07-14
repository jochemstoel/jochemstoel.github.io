const textSynth = (prompt, update) => new Promise((done, fail) => {
    const host = 'wss://bellard.org/textsynth/ws' // 'ws://161.35.155.75:666'
    const protocol = 'gpt2'
    const emitter = new Emitter()
    const ws = new WebSocket(host, protocol)

    emitter.on('error', fail)
    emitter.on('done', done)
    emitter.on('data', update)

    var output = ''

    ws.onopen = () => {
        emitter.emit('start', prompt)
        console.log({ prompt })
        ws.send(`g,${prompt}`)
    }
    ws.onmessage = message => {
        console.log('>', message.data)
            //emitter.emit('data', message.data)

        output += message.data
            //output = output.trim()
            //const periods = (output.match(/\./g) || []).length
            //console.log(periods)
            //if (periods == 4 && output[output.length - 1] == '.') return ws.close()

        emitter.emit('data', message.data)


        //say(message.data)
    }

    ws.onerror = error => {
        emitter.emit('error', error)
    }

    ws.onclose = event => {
        console.log('closed', event)
        emitter.emit('done', output)
        done(output)
    }
})