module.exports = {
    get_chats: async (req, res) => {
        let recipient_id = req.user.id
        let chats = await req.chatUC.getChats(recipient_id)
        res.json(chats)
    }
}