const CalendarService = require("../services/CalendarServices.js");

// Create Calendar
exports.createCalendar = async (req, res) => {
    await CalendarService.createCalendar(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Get Calendar
exports.getCalendar = async (req, res) => {
    await CalendarService.getCalendar(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Get Calendar by ID
exports.getCalendarById = async (req, res) => {
    await CalendarService.getCalendarById(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: 'Categoria Principal does not exists'
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Update Calendar by id
exports.updateCalendarById = async (req, res) => {
    await CalendarService.updateCalendarById(req, function (err, result) {
        if (err) {
            if (err.errors.catPriIcon.name === 'ValidatorError') {
                return res.status(400).json({
                    success: false,
                    body: err._message
                })
            } else {
                return res.status(400).json({
                    success: false,
                    body: err
                });
            }
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

// Delete Calendar by id
exports.deleteCalendarById = async (req, res) => {
    await CalendarService.deleteCalendarById(req, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};