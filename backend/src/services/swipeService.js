const { PrismaClient } = require("@prisma/client");
const {createMatch} = require("./matchService");
const prisma = new PrismaClient();

exports.getAllSwipes = async () => {
    return await prisma.swipe.findMany();
};

exports.getSwipeByUserId = async (id) => {
    return await prisma.swipe.findMany({ where: { iduser1: Number(id) } });
};

exports.createSwipe = async ({ iduser1, iduser2, liked }) => {
    if (!iduser1 || !iduser2 || typeof liked !== 'boolean')
        throw new Error('Données de swipe invalides');

    if (iduser1 === iduser2)
        throw new Error('Impossible de swiper soi-même');

    const [user1, user2] = await Promise.all([
        prisma.user.findUnique({ where: { id: iduser1 } }),
        prisma.user.findUnique({ where: { id: iduser2 } })
    ]);

    if (!user1 || !user2) {
        throw new Error('Un ou les deux utilisateurs n\'existent pas');
    }

    const existingSwipe = await prisma.swipe.findFirst({
        where: {
            iduser1,
            iduser2
        }
    });

    if (existingSwipe) {
        throw new Error('Swipe déjà effectué');
    }

    const newSwipe = await prisma.swipe.create({
        data: { iduser1, iduser2, liked }
    });

    if (liked) {
        const mutual = await prisma.swipe.findFirst({
            where: {
                iduser1: iduser2,
                iduser2: iduser1,
                liked: true
            }
        });

        if (mutual) {
            const alreadyMatched = await prisma.match.findFirst({
                where: {
                    OR: [
                        { iduser1, iduser2 },
                        { iduser1: iduser2, iduser2: iduser1 }
                    ]
                }
            });

            if (!alreadyMatched) {
                data = {
                    iduser1,
                    iduser2
                };
                createMatch(data);
            }
        }
    }

    return newSwipe;
};