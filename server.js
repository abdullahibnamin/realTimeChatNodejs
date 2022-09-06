const express = require('express')
const app = express()

const http = require('http')
const httpServer = http.createServer(app)

const io = require('socket.io')(httpServer)


const PORT = process.env.PORT || 3000
const host = 'localhost'
app.use(express.static(__dirname + '/public'))



app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    console.log('Connect ...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

httpServer.listen(PORT, ()=>{
    console.log(`app listening on port http://${host}:${PORT}`)
})














































