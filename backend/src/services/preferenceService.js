const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllPreferences = async () => {
  return await prisma.preference.findMany({
    include: {
      user: true
    }
  });
};

exports.getPreferenceByUserId = async (iduser) => {
  return await prisma.preference.findUnique({ where: { iduser: Number(iduser) } });
};

exports.createPreference = async (iduser, data) => {
  return await prisma.preference.create({
    data: {
      ...data,
      iduser: Number(iduser)
    }
  });
};

exports.updatePreference = async (iduser, data) => {
  try {
    return await prisma.preference.update({
      where: { iduser: Number(iduser) },
      data
    });
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
};