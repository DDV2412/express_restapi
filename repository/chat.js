const {Chat} = require('../models');
const Op = require('sequelize').Op;

class ChatRepository {
    constructor() {
        this.Model = Chat
    }

    async getChatByRecipientID(recipient_id) {
        let result = []
        try {
            result = await this.Model.findAll({
                where: {
                    [Op.or]: [{recipient_id: recipient_id}, {sender_id: recipient_id}]
                },
                order: [
                    ["createdAt", "ASC"]
                ]
            })
        }catch (e) {
            console.error(e)
            return []
        }
        if(result === null) {
            let result = null

            try {
                result = await this.Model.create(chat_data)
            } catch (e) {
                console.error(e)
                return null
            }
            return result
        }
    }
}

module.exports = ChatRepository

