import Connect from "../models/db_models.js"

const sleep = ms => new Promise(res => setTimeout(res, ms))

export const auctionFinder = async (socket) => {
    try{
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

                        const auction = await Connect.models.Announcement.findOne({
                            where:{
                                id: item.id
                            }
                        })

                        socket.emit('auction: time_left', {
                                data: auction,
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
    }catch(err){
        socket.emit('auction: err', {
                status: 'Error',
                data: err,
            }
        )
    }

}

export const newPrice = async (socket, data) => {
    try{
        const auction = await Connect.models.Announcement.findOne({
            where: {
                id: data.auction_id,
                is_auction: true
            }
        })

        if(data.new_price > auction.last_price){
            await auction.update({
                last_price: data.new_price,
                last_payer: data.payer_id
            })
        }else{
            socket.emit('auction: err', {
                    status: 'Error',
                    data: 'Not much with new price! Too low!',
                }
            )
        }

        socket.emit('auction: new_price', {
                data: auction,
                message: 'New price is set!'
            }
        )
    }catch (err){
        socket.emit('auction: err', {
                status: 'Error',
                data: err,
            }
        )
    }
}