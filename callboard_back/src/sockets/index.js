import { Server } from "socket.io";
import dotenv from "dotenv";
import {auctionFinder} from "./auction.handler.js";

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
        }catch (err){}
    })
}