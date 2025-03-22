import Ticket from '../models/TicketModel.js';

// Get all tickets (Users)
const getAllUsers = async (req, res, next) => {
    let tickets;

    try {
        // Get all tickets
        tickets = await Ticket.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!tickets) {
        return res.status(404).json({ message: "Tickets not found" });
    }

    return res.status(200).json(tickets);
};

// Add a new support ticket
const addTicket = async (req, res) => {
    const { name, email, mobileNumber, product, subject, inquiry, image } = req.body;

    try {
        // Create new ticket
        const ticket = new Ticket({
            name,
            email,
            mobileNumber,
            product,
            subject,
            inquiry,
            image,
        });

        await ticket.save();

        return res.status(201).json({ message: "Ticket added successfully", ticket });
    } catch (error) {
        console.error("Error adding ticket:", error);
        return res.status(500).json({ message: "Failed to add ticket", error: error.message });
    }
};

// Get ticket by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    let ticket;

    try {
        ticket = await Ticket.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching ticket" });
    }

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(ticket);
};

// Update ticket details
const updateUser = async (req, res, next) => {
    const id = req.params.id;

    const { name, email, mobileNumber, product, subject, inquiry, image } = req.body;

    let ticket;

    try {
        ticket = await Ticket.findByIdAndUpdate(
            id,
            { name, email, mobileNumber, product, subject, inquiry, image },
            { new: true } // This option returns the updated document
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating ticket" });
    }

    if (!ticket) {
        return res.status(404).json({ message: "Unable to update ticket" });
    }

    return res.status(200).json(ticket);
};

// Delete ticket
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let ticket;

    try {
        ticket = await Ticket.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting ticket" });
    }

    if (!ticket) {
        return res.status(404).json({ message: "Unable to delete ticket" });
    }

    return res.status(200).json({ message: "Ticket deleted successfully" });
};

export default {
    getAllUsers,
    addTicket,
    getById,
    updateUser,
    deleteUser,
};
