import express from "express";
import {
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// GET all events
router.get("/", getEvents);

// POST new event
router.post("/", createEvent);

// GET single event by ID
router.get("/:id", getEventById);

// UPDATE event by ID
router.put("/:id", updateEvent);

// DELETE event by ID
router.delete("/:id", deleteEvent);

export default router;
