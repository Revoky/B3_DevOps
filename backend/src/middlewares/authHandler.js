const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]
    if (!token) return res.status(401).json({ success: false, message: 'Token manquant' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ success: false, message: 'Token invalide ou expiré' })
        req.user = { id: payload.id, role: payload.role }
        next()
    })
}

function authorizeRoles(allowedRoles) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ success: false, message: 'Non authentifié' })

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Accès refusé pour votre rôle' })
        }
        next()
    }
}

module.exports = { authenticateToken, authorizeRoles }
