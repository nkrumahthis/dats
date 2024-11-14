const Hyperswarm = require("hyperswarm");
const crypto = require("crypto");
const { generateNodeName } = require("./node-names")

class TradingNode {
    constructor(port) {
        console.log("setting up trading node")
        this.swarm = new Hyperswarm();
        this.peers = new Map();
        this.nickNames = new Map();
        this.topic = crypto.createHash('sha256')
            .update('dats').digest();
        this.setupSwarm();
    }

    setupSwarm() {
        console.log("setting up swarm")

        this.swarm.join(this.topic, {
            lookup: true,
            announce: true
        })

        this.swarm.on('connection', (socket, info) => {
            const decoder = new TextDecoder('UTF-8')

            const peerId = decoder.decode(info.publicKey);
            this.peers.set(peerId, socket);
            this.nickNames.set(peerId, generateNodeName()); // Generate a random nickname for each peer

            console.log('New peer connected:', this.nickNames.get(peerId));
            
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
                console.log('Peer disconnected:', this.nickNames.get(peerId));
                this.nickNames.delete(peerId);
            })

        })
    }

    async handlePeermessage(message, peerId) {
        // Handle peer messages based on the message
        console.log('Peer received:', message, 'from', this.nickNames.get(peerId));
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