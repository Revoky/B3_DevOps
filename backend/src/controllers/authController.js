const authService = require('../services/authService');

exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refresh(refreshToken);
        res.json(tokens);
    } catch (err) {
        next(err);
    }
};

exports.checkToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]
        const user = await authService.checkToken(token);
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
}
