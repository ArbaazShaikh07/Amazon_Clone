import Event from "../models/Event.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Public (later you can add auth)
export const createEvent = async (req, res) => {
    const { title, type, date, desc, image, link } = req.body;

    try {
        const event = new Event({ title, type, date, desc, image, link });
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Public (later you can add auth)
export const updateEvent = async (req, res) => {
    const { title, type, date, desc, image, link } = req.body;

    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        event.title = title || event.title;
        event.type = type || event.type;
        event.date = date || event.date;
        event.desc = desc || event.desc;
        event.image = image || event.image;
        event.link = link || event.link;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Public
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json({ message: "Event removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
