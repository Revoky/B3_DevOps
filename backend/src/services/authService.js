const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

const prisma = new PrismaClient();

const refresh = async (token) => {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user || user.refreshToken !== token) throw new Error('Invalid refresh token');

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken }
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const checkToken = async (token) => {
    try {
        const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!tokenData) throw new Error('Invalid token');

        return tokenData ;
    } catch (err) {
        return new Error(err.message);
    }
}

module.exports = { refresh, checkToken };
