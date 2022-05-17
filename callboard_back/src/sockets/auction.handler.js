import Connect from "../models/db_models.js"
import {response} from "express";

const sleep = ms => new Promise(res => setTimeout(res, ms))

export const auctionFinder = async (socket) => {
    const allAuction = await Connect.models.Announcement.findAll({
        where: {
            is_auction: true,
            complated: false
        }
    })

    for (const item of allAuction){
        if(item.begin - Date.now() <= 3000){
            setTimeout(async ()=>{
                while (true){
                    const time_left = new Date((Date.now() - item.end)*1000)

                    socket.emit('auction: time_left', {
                            data: item,
                            time_left: time_left
                        }
                    )

                    if (item.end <= Date.now()){
                        await item.update({
                            complated: true
                        })

                        socket.emit('auction: time_end', {
                                data: item,
                                time_left: 'Time is up!'
                            }
                        )
                        return
                    }
                    await sleep(3000)
                }
            }, item.begin - Date.now())
        }
    }
}