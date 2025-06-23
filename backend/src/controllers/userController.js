const userService = require('../services/userService');
const HttpError = require('../utils/HttpError');

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json({success: true, users});
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next(new HttpError(404, "Utilisateur non trouvé"));
        }
        res.json({success: true, user});
    } catch (err) {
        next(err);
    }
};

exports.registerUser = async (req, res, next) => {
    try {
        const {firstname, lastname, username, email, password, age, city} = req.body;

        if (!firstname || !lastname || !username || !email || !password || !age || !city) {
            return next(new HttpError(400, "Tous les champs sont obligatoires"));
        }

        const { user, accessToken, refreshToken } = await userService.registerUser({ firstname, lastname, username, email, password, age, city });

        res
            .cookie('token', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
            .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(201)
            .json({ success: true, message: "Utilisateur créé avec succès", id: user.id, username: user.username, role: user.role });
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return next(new HttpError(400, "Tous les champs sont obligatoires"));
        }

        const { user, accessToken, refreshToken } = await userService.loginUser(username, password);

        res
            .cookie('token', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
            .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json({ success: true, message: "Utilisateur connecté avec succès", id: user.id, username: user.username, role: user.role });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return next(new HttpError(404, "Utilisateur non trouvé"));
        }
        res.json({success: true, message: "Utilisateur mis à jour", user: updatedUser});
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return next(new HttpError(404, "Utilisateur non trouvé"));
        }
        res.json({success: true, message: "Utilisateur supprimé", user: deletedUser});
    } catch (err) {
        next(err);
    }
};

