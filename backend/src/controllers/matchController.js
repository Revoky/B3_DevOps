const matchService = require('../services/matchService');
const HttpError = require('../utils/HttpError');

exports.getAllMatches = async (req, res, next) => {
    try {
        const matches = await matchService.getAllMatches();
        res.json({ success: true, matches });
    } catch (error) {
        next(error);
    }
};

exports.createMatch = async (req, res, next) => {
    const { iduser1, iduser2 } = req.body;
    if (!iduser1 || !iduser2) {
        return next(new HttpError(400, 'iduser1 et iduser2 sont requis'));
    }
    try {
        const newMatch = await matchService.createMatch({ iduser1, iduser2 });
        res.status(201).json(newMatch);
    } catch (error) {
        next(error);
    }
};

exports.getMatchById = async (req, res, next) => {
    const matchId = parseInt(req.params.match_id, 10);
    if (isNaN(matchId)) {
        return next(new HttpError(400, 'Match ID invalide'));
    }
    try {
        const match = await matchService.getMatchById(matchId);
        if (!match) {
            return next(new HttpError(404, 'Match non trouvé'));
        }
        res.json({ success: true, match });
    } catch (error) {
        next(error);
    }
};

exports.deleteMatch = async (req, res, next) => {
    const matchId = parseInt(req.params.match_id, 10);
    if (isNaN(matchId)) {
        return next(new HttpError(400, 'Match ID invalide'));
    }
    try {
        await matchService.deleteMatch(matchId);
        res.json({ message: 'Match supprimé avec succès' });
    } catch (error) {
        next(error);
    }
};

