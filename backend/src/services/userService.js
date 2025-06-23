const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

exports.getAllUsers = async () => {
    return await prisma.user.findMany();
};

exports.getUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id: Number(id) } });
};

exports.registerUser = async (data) => {
    // Validate the input data

    // Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    if (!data.password || !data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/)) {
        throw new Error("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
    }

    // Username must be between 3 and 20 characters long and contain only alphanumeric characters
    if (!data.username || !data.username.match(/^[a-zA-Z0-9]{3,20}$/)) {
        throw new Error("Username must be between 3 and 20 characters long");
    }

    // Age must be between 18 and 100
    if (!data.age || !String(data.age).match(/^(1[89]|[2-9]\d)$/)) {
        throw new Error("Age must be between 18 and 100");
    }

    // City must be between 2 and 30 characters long and contain only letters
    if (!data.city || !data.city.match(/^[a-zA-Z]{2,30}$/)) {
        throw new Error("City must be between 2 and 30 characters long");
    }

    // Email must be a valid email address
    if (!data.email || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Invalid email address");
    }

    // Firstname must be between 2 and 30 characters long and contain only letters and accents
    if (!data.firstname || !data.firstname.match(/^[a-zA-ZÀ-ÿ]{2,30}$/)) {
        throw new Error("Firstname must be between 2 and 30 characters long");
    }

    // Lastname must be between 2 and 30 characters long and contain only letters
    if (!data.lastname || !data.lastname.match(/^[a-zA-Z]{2,30}$/)) {
        throw new Error("Lastname must be between 2 and 30 characters long");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Check if the username already exists
    const existingUsername = await prisma.user.findUnique({
        where: {
            username: data.username,
        },
    });

    if (existingUsername) {
        throw new Error("Username already exists");
    }

    // Check if the email already exists
    const existingEmail = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    data.role = "guest";

    const user = await prisma.user.create({ data });

    const userDataToken = {
        id: user.id,
        username: user.username,
        role: user.role,
    }

    const accessToken = generateAccessToken(userDataToken);
    const refreshToken = generateRefreshToken(userDataToken);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
    });

    return { user: userDataToken, accessToken, refreshToken };
};

exports.loginUser = async (username, password) => {
    console.log(username)
    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    console.log(user.id);

    const userDataToken = {
        id: user.id,
        username: user.username,
        role: user.role,
    }

    const accessToken = generateAccessToken(userDataToken);
    const refreshToken = generateRefreshToken(userDataToken);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
    });

    return { user: userDataToken, accessToken, refreshToken };
};

exports.updateUser = async (id, data) => {
    try {
        return await prisma.user.update({ where: { id: Number(id) }, data });
    } catch (err) {
        if (err.code === "P2025") return null;
        throw err;
    }
};

exports.deleteUser = async (id) => {
    try {
        return await prisma.user.delete({ where: { id: Number(id) } });
    } catch (err) {
        if (err.code === "P2025") return null;
        throw err;
    }
};

// const User = require('../models/User');
//
// exports.getAllUsers = () => User.find().select('-password -refreshTokens');
// exports.getUserById = (id) => User.findById(id).select('-password -refreshTokens');
