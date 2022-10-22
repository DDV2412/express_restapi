module.exports = {
  GetChat: async (req, res) => {
    const recipientId = req.Customer["id"];

    let chat = await req.chatUC.GetChat(recipientId);

    res.json({
      success: true,
      messages: chat,
    });
  },
};
