const Roles = {
    GUEST: 'guest',
    USER: 'user',
    MODERATOR: 'moderator',
    DEVELOPER: 'developer',
    ADMIN: 'admin',
}

const RoleGroups = {
    AUTHENTICATED: [Roles.USER, Roles.MODERATOR, Roles.DEVELOPER, Roles.ADMIN],
    STAFF: [Roles.MODERATOR, Roles.DEVELOPER, Roles.ADMIN],
    ADMINS_ONLY: [Roles.ADMIN],
    DEVS_ONLY: [Roles.DEVELOPER],
}

module.exports = { Roles, RoleGroups }