const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')


const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query
    
    

    connectedUsers[user] = socket.id
})

mongoose.connect('mongodb+srv://USER:PASSWORD@cluster0-ipugg.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use((request, response, next) => {
    request.io = io
    request.connectedUsers = connectedUsers

    return next()
})

app.use(express.json())
app.use(cors())
app.use(routes)

server.listen(3333)