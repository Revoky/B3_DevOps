const messageService = require('../services/messageService');

// GET /matches/:idmatch/messages
exports.getAllMessages = async (req, res, next) => {
    const matchId = parseInt(req.params.idmatch, 10);

    if (isNaN(matchId)) {
        return res.status(400).json({ error: 'Invalid match ID' });
    }

    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;

    try {
        const messages = await messageService.getAllMessages(matchId, skip, limit);
        return res.json({
            matchId,
            page,
            limit,
            totalMessages: messages.length,
            messages
        });
    } catch (error) {
        next(error);
    }
};

// POST /matches/:idmatch/messages
exports.createMessage = async (req, res, next) => {
    const matchId = parseInt(req.params.idmatch, 10);
    const { senderId, content } = req.body;

    try {
        const newMessage = await messageService.createMessage(matchId, senderId, content);
        return res.status(201).json(newMessage);
    } catch (error) {
        next(error);
    }
};

// GET /messages/:id
exports.getMessageById = async (req, res, next) => {
    const messageId = parseInt(req.params.id, 10);

    try {
        const message = await messageService.getMessageById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        return res.json(message);
    } catch (error) {
        next(error);
    }
};

// DELETE /messages/:id
exports.deleteMessage = async (req, res, next) => {
    const messageId = parseInt(req.params.id, 10);

    try {
        await messageService.deleteMessage(messageId);
        return res.json({ message: 'Message supprimé avec succès' });
    } catch (error) {
        next(error);
    }
};
