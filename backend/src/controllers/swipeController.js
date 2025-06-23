const swipeService = require('../services/swipeService');
const HttpError = require('../utils/HttpError');

exports.getAllSwipes = async (req, res, next) => {
    try {
        const swipes = await swipeService.getAllSwipes();
        res.json({ success: true, swipes });
    } catch (err) {
        next(err);
    }
};

exports.getSwipeByUserId = async (req, res, next) => {
    const id = Number(req.params.user_id);
    if (!id) {
        return next(new HttpError(400, 'ID utilisateur manquant'));
    }
    try {
        const swipes = await swipeService.getSwipeByUserId(id);
        if (!swipes || swipes.length === 0) {
            return next(new HttpError(404, "Aucun swipe trouvé pour cet utilisateur"));
        }
        res.json({ success: true, swipes });
    } catch (err) {
        next(err);
    }
};

exports.createSwipe = async (req, res, next) => {
    try {
        const iduser1 = req.user.id;
        const { iduser2, liked } = req.body;

        if (!iduser2 || typeof liked !== 'boolean') {
            return next(new HttpError(400, 'Champs iduser2 et liked obligatoires'));
        }

        const swipe = await swipeService.createSwipe({ iduser1, iduser2, liked });
        res.status(201).json({ success: true, swipe });
    } catch (err) {
        next(err);
    }
};
