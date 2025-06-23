const HttpError = require('../utils/HttpError');

module.exports = (err, req, res, next) => {
    // HttpError personnalisé
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Erreurs Prisma connues
    if (err.code === 'P2002') {
        return res.status(409).json({
            success: false,
            message: "Ce champ doit être unique. Valeur déjà utilisée."
        });
    }

    if (err.code === 'P2025') {
        return res.status(404).json({
            success: false,
            message: "L'élément demandé n'existe pas."
        });
    }

    // Autres erreurs non prévues
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Une erreur interne est survenue. Veuillez réessayer plus tard."
    });
};
