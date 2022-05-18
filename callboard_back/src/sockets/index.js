import { Server } from "socket.io";
import dotenv from "dotenv";
import {auctionFinder, newPrice} from "./auction.handler.js";

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
        }catch (err){
            socket.emit('socket: err', {
                    status: 'Error',
                    data: err,
                }
            )
        }
    })
}