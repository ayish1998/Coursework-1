const Event = require("../models/eventModel");

// Create a new event
const createEvent = (req, res) => {
    const eventData = req.body;
    Event.create(eventData)
        .then((event) => {
            console.log({ message: 'Event created successfully', event });
            res.redirect('/dashboard/create-event');
        })
        .catch((err) => {
            console.error('An error occurred while creating the event:');
            console.error(err);
            res.status(500).send('Error creating a new event; please try again.');
        });
};



// Get all users
const getAllEvents = (req, res) => {
    Event.find({})
        .then((event) => {
            console.log(event);
            // Render the "dashboard" template and pass the user data to it
            res.render("my-event", { EventData: event});
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
}

module.exports = {
    createEvent,
    getAllEvents
};

