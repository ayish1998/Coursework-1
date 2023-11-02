const Event = require("../models/eventModel");


// Create a new event
const createEvent = (req, res) => {
    const eventData = req.body;
    Event.create(eventData)
        .then((event) => {
            console.log({ message: 'Event created successfully', event });
            res.redirect('/alumni-event');
        })
        .catch((err) => {
            console.error('An error occurred while creating the event:');
            console.error(err);
            res.status(500).send('Error creating a new event; please try again.');
        });
};


// const formattedDate = new Date(event.datetime).toDateString();
//             const formattedTime = new Date(event.datetime).toLocaleTimeString("en-US", {
//                 timeZone: "UTC",
//                 hour12: false,
//                 hour: "numeric",
//                 minute: "numeric",
//             });
//             const eventData = {
//                 ...event,
//                 formattedDate,
//                 formattedTime,
//             };

// Get all users
const getAllEvents = (req, res) => {
    Event.find({})
        .then((events) => {
            // Render the "dashboard" template and pass the user data to it
            const formattedEvents = events.map((event) => {
                const formattedDate = new Date(event.datetime).toDateString();
                const formattedTime = new Date(event.datetime).toLocaleTimeString("en-US", {
                    timeZone: "UTC",
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric",
                });

                return { ...event._doc, formattedDate, formattedTime }
            })
            console.log(formattedEvents);
            res.render("my-event", { EventData: formattedEvents });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
}

const updateEvent = (req, res) => {
    const eventData = req.body;
    Event.findOneAndUpdate({ _id: req.params.id }, eventData, { new: true })
        .then((event) => {
            console.log({ message: 'Event updated successfully', event });
            res.flash("Event updated successfully", {
                position: "r",
                duration: "3000",
            });
            res.redirect('/alumni-event');
        })
        .catch((err) => {
            console.error('An error occurred while updating the event:');
            console.error(err);
            res.status(500).send('Error updating event; please try again.');
        });

};

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent
};

