const Hyperswarm = require("hyperswarm");
const crypto = require("crypto");

class TradingNode {
    constructor(port) {
        this.swarm = new Hyperswarm();
        this.peers = new Map();
        this.topic = crypto.createHash('sha256')
            .update('dats').digest();
        this.setupSwarm();
    }

    setupSwarm() {
        this.swarm.join(this.topic, {
            lookup: true,
            announce: true
        })

        this.swarm.on('connection', (socket, info) => {
            const decoder = new TextDecoder('UTF-8')

            const peerId = decoder.decode(info.publicKey);
            this.peers.set(peerId, socket);

            console.log('New peer connected:', peerId);
            
            socket.on('data', data => {
                try {
                    const message = JSON.parse(data);
                    this.handlePeermessage(message, peerId)
                } catch (e) {
                    console.error('Error parsing peer message:', e);
                }
            })

            socket.on('close', () => {
                this.peers.delete(peerId);
                console.log('Peer disconnected:', peerId);
            })

        })
    }

    async handlePeermessage(message, peerId) {
        // Handle peer messages based on the message
        console.log('Peer received:', message, 'from', peerId);
    }

    broadcast(message, excludePeerIds = []) { 
        const messageStr = JSON.stringify(message);
        this.peers.forEach((socket, peerId) => {
            if (!excludePeerIds.includes(peerId)) {
                socket.write(messageStr);
            }
        });
    }
}

module.exports = TradingNode