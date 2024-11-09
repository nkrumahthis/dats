const Hyperswarm = require('hyperswarm')
const crypto = require('crypto')

const topic = crypto.createHash('sha256').update('dats').digest();

console.log(topic)

const swarm = Hyperswarm()

swarm.join(topic, {
    lookup: true, announce: true
})

swarm.on('connection', (socket, details) => {
    console.log(`Connected to ${details.host}:${details.port}`)

    socket.on('data', (data) => {
        console.log(`Received data from ${details.host}:${details.port}: ${data.toString()}`)
    })

    socket.on('close', () => {
        console.log(`Connection to ${details.host}:${details.port} closed`)
    })
})

swarm.on('disconnection', (socket, details) => {
    console.log(`Disconnected from ${details.host}:${details.port}`)
})

swarm.on('error', (error) => {
    console.error('Swarm error: ', error);
})