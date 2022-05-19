import Connect from "../models/db_models.js"
import {Op} from 'sequelize'

export const messageHandler = async (socket, data) => {
    try {
        let chat = await Connect.models.Chat.findOne({
            where: {
                [Op.or]: [{
                    user2_id: data.id_from,
                    user1_id: data.id_to
                },
                    {
                        user1_id: data.id_from,
                        user2_id: data.id_to
                    }
                ]
            }
        })

        if (!chat) {
            chat = await Connect.models.Chat.create({
                user2_id: data.id_from,
                user1_id: data.id_to
            })
        }

        socket.join(chat.id)

        const message = await Connect.models.Message.create({
            msg_text: data.msg_text,
            user_id: data.id_from,
            chat_id: chat.id
        })

        socket.broadcast.to(chat.id).emit('chat: message',{
            user_id: message.user_id,
            text: message.msg_text
        })

    } catch (err) {
        socket.emit('auction: err', {
                status: 'Error',
                data: err,
            }
        )
    }
}
