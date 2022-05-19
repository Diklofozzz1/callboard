import { Server } from "socket.io";
import dotenv from "dotenv";
import {auctionFinder, newPrice} from "./auction.handler.js";
import {messageHandler} from "./message.handler.js";

dotenv.config();

export default function InitSocketIO(server){
    const io = new Server(server, {
        cors:{
            origin: `http://localhost:${process.env.PORT || 3070}`,
            credentials: true
        }
    })

    io.on('connection', async (socket)=>{
        try{
            socket.on('auction: finder', async ()=>{await auctionFinder(socket)})
            socket.on('auction: price_updater', async (data)=>{await newPrice(socket, data)})
            socket.on('message: handler',async (data)=>{await messageHandler(socket, data)})
            socket.on('chat: join', async (data)=>{socket.join(data.chat_id)})
            socket.on('chat: leave', async (data)=>{socket.leave(data.chat_id)})
        }catch (err){
            socket.emit('socket: err', {
                    status: 'Error',
                    data: err,
                }
            )
        }
    })
}