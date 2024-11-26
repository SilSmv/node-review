import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import dotenv from 'dotenv'
import {createClient} from '@libsql/client'
import { Socket } from 'node:dgram'
import { userInfo } from 'node:os'

dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

const db = createClient({
    url: 'libsql://top-ballistic-silsmv.turso.io',
    authToken: process.env.DB_TOKEN
})
await db.execute(`DROP TABLE IF NOT EXISTS messages;`)

await db.execute(`CREATE TABLE IF NOT EXISTS messages( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    content TEXT,
    user TEXT)`)


io.on('connection', async(socket)  =>{
    console.log('a user has connected')


    socket.on('disconnect', () =>{
        console.log('an user has disconnected')
    })

    socket.on('chat message',async(msg,username) => {
        let result 
        try{
            result = await db.execute({
                sql:'INSERT INTO messages (content,user) VALUES (:message,:username)', 
                args: {msg, username}
            })
        } catch (e) {
            console.error(e)
        }
        io.emit('chat message',msg, result.lastInsertRowid.toString(),username)

    })

    console.log('auth')
    console.log(socket.handshake.auth)
    if(!socket.recovered){
        const username = socket.auth.username ?? 'anonymous'
        try{

            
            const result = await db.execute({
                sql:'SELECT id, content, user FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset??0]
            })

            result.rows.forEach(row => {
                socket.emit('chat message', row.content,row.id.toString(),row.user)
            })
        }catch(e){
            console.log(e)

        }
    }
})

app.get('/', (req,res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
    console.log(`Server runnign on port ${port}`)
})