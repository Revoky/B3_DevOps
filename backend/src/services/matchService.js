const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllMatches = async () => {
    return prisma.match.findMany({
        include: {
            user1: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    age: true,
                    city: true,
                }
            },
            user2: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    age: true,
                    city: true,
                }
            },
            messages: true
        }
    });
};

exports.createMatch = async (data) => {
    const match = await prisma.match.create({
        data: {
            iduser1: data.iduser1,
            iduser2: data.iduser2
        }
    });

    const challenge = await prisma.challenge.findFirst({
        orderBy: { id: 'asc' },
        skip: Math.floor(Math.random() * 20)
    });

    await prisma.message.create({
        data: {
            idmatch: match.id,
            senderid: data.iduser1,
            content: challenge.content,
            timestamp: new Date()
        }
    });

    return match;
};


exports.getMatchById = async (matchId) => {
    return prisma.match.findUnique({
        where: { id: matchId },
        include: {
            user1: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    age: true,
                    city: true,
                }
            },
            user2: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    age: true,
                    city: true,
                }
            },
            messages: true
        }
    });
};

exports.deleteMatch = async (matchId) => {
    return prisma.match.delete({
        where: { id: matchId }
    });
};
