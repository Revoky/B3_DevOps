const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const HttpError = require('../utils/HttpError');

exports.getAllMessages = async (matchId, skip = 0, take = 10) => {
    return prisma.message.findMany({
        where: { idmatch: matchId },
        orderBy: { timestamp: 'asc' },
        skip: skip,
        take: take
    });
};

exports.createMessage = async (matchId, senderId, content) => {
    if (!senderId || !content) {
        throw new HttpError(400, 'Le champ senderId et content sont requis');
    }

    try {
        return await prisma.message.create({
            data: {
                idmatch: matchId,
                senderid: senderId,
                content: content,
                timestamp: new Date()
            }
        });
    } catch (err) {
        throw new HttpError(400, "Impossible d'envoyer le message. Vérifiez les données envoyées.");
    }
};

exports.getMessageById = async (messageId) => {
    const message = prisma.message.findUnique({
        where: { id: messageId }
    });

    if (!message) {
        throw new HttpError(404, 'Message non trouvé');
    }

    return message;
};

exports.deleteMessage = async (messageId) => {
    try {
        return await prisma.message.delete({
            where: { id: messageId }
        });
    } catch (err) {
        throw new HttpError(404, 'Impossible de supprimer : message non trouvé');
    }
};
