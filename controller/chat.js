module.exports = {
  GetChat: async (req, res) => {
    /**
      #swagger.tags = ['Chat']
      #swagger.summary = 'Chat List'
      #swagger.description = 'Chat List'
      #swagger.responses[200] = {
            description: 'Chat List',
            schema: {
                    "success": true,
                    messages: []             
            }
      }
      */
    const recipientId = req.Customer["id"];

    let chat = await req.chatUC.GetChat(recipientId);

    res.json({
      success: true,
      messages: chat,
    });
  },
};
