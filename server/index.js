import express from 'express'
import logger from 'morgan'
import http from 'http'
import path from 'path'

import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { log } from 'console'

const __dirname = path.resolve()

const port = process.env.PORT ?? 4000

const app = express()
const server = createServer(app)
const io = new Server(server)

http.globalAgent.maxSockets = Infinity // Sin límite de conexiones simultáneas.

app.use(logger('dev'))

const room = 'hub'

io.on('connection', (socket) => {
  console.log('Usuasrio conectado')
  console.log(socket.id)

  // Unirse a la sala
  socket.on('joinRoom', (room) => {
    socket.join(room)
    console.log(`Usuario ${socket.id} se unió a la sala: ${room}`)
  })

  socket.on(room, (data) => {
    console.log('Datos recibidos de miEvento:', data)

    socket.broadcast.emit(room, data)
  })

  socket.on('disconnect', () => {
    console.log('Usuario desconectado')
  })
})

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(port, () => {
  console.log(`El servidor esta ON en el puerto ${port}`)
})

const mapToJson = (map) => {
  return JSON.stringify([...map])
}
