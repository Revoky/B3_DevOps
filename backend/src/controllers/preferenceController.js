const preferenceService = require('../services/preferenceService');
const HttpError = require('../utils/HttpError');

exports.getAllPreferences = async (req, res, next) => {
  try {
    const preferences = await preferenceService.getAllPreferences();
    res.json({ success: true, preferences });
  } catch (err) {
    next(err);
  }
};

exports.getPreferenceByUserId = async (req, res, next) => {
  try {
    const preference = await preferenceService.getPreferenceByUserId(req.params.id);
    if (!preference) {
      return next(new HttpError(404, "Préférence non trouvée"));
    }
    res.json({ success: true, preference });
  } catch (err) {
    next(err);
  }
};

exports.createPreference = async (req, res, next) => {
  try {
    const preference = await preferenceService.createPreference(req.params.id, req.body);
    res.status(201).json({ success: true, message: "Préférence créée", preference });
  } catch (err) {
    next(err);
  }
};

exports.updatePreference = async (req, res, next) => {
  try {
    const preference = await preferenceService.updatePreference(req.params.id, req.body);
    if (!preference) {
      return next(new HttpError(404, "Préférence non trouvée"));
    }
    res.json({ success: true, message: "Préférence mise à jour", preference });
  } catch (err) {
    next(err);
  }
};
