const Calendar = require("../models/Calendar.js");

// Create calendar
exports.createCalendar = async (req, callback) => {
    try {
        const {
            userId,
            appoinment
        } = req.body; //destructuracion del objeto

        try {
            const newCalendar = new Calendar({
                userId,
                appoinment
            });
            try {
                const CalendarSave = await newCalendar.save();
                callback(null, CalendarSave);
                return;
            } catch (error) {
                callback(error);
                return;
            }
        } catch (error) {
            callback(error);
            return;
        }
    } catch (error) {
        callback(error);
        return;
    }
};

// Get calendar
exports.getCalendar = async (req, callback) => {

    try {
        const calendar = await Calendar.find();
        callback(null, calendar);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Get calendar by ID
exports.getCalendarById = async (req, callback) => {
    const { calendarId } = req.params;

    try {
        const calendar = await Calendar.findById(calendarId);
        callback(null, calendar);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Update calendar
exports.updateCalendarById = async (req, callback) => {
    try {
        const updatedCalendar = await Calendar.findByIdAndUpdate(
            req.params.calendarId,
            req.body,
            {
                new: true, // para que el metodo devuelva los datos nuevos.
            }
        );
        callback(null, updatedCalendar);
        return;
    } catch (error) {
        callback(error);
        return;
    }
};

// Delete calendar
exports.deleteCalendarById = async (req, callback) => {
    const { calendarId } = req.params;

    try {
        await Calendar.findByIdAndDelete(calendarId);
        callback(null, 'Calendar deleted');
        return;
    } catch (error) {
        callback(error);
        return;
    }
};