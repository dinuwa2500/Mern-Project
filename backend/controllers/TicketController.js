import Ticket from '../models/TicketModel.js';

//fetch all ticket from the db
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

// Add a new support ticket from db
const addTicket = async (req, res) => {
    const { name, email, mobileNumber, product, subject, inquiry, image } = req.body;

    try {
        // Create new ticket
        const ticket = new Ticket({
            user:req.user._id,
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

// Fetches a specific ticket by its ID.
const getTicketById = async (req, res, next) => {
    try {
        // Get ticket by ID and populate user info
        const ticket = await Ticket.findById(req.params.id).populate('user');

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        return res.status(200).json(ticket);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching ticket" });
    }
};

//Fetches all tickets from the database, including user details.
const getAllTickets = async (req, res, next) => {
    try {
        // Fetch all tickets and populate user info
        const tickets = await Ticket.find().populate('user');

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: "No tickets found" });
        }

         // Check if user exists
         if (!tickets.user) {
            return res.status(404).json({ message: "User not found for this ticket" });
        }

        return res.status(200).json(tickets);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching tickets" });
    }
};

//Fetches all tickets associated with the authenticated user.
const getUserTickets = async (req, res) => {
    const userId = req.user._id; // Make sure the user is authenticated

    try {
        const tickets = await Ticket.find({ user: userId });

        if (tickets.length === 0) {
            return res.status(404).json({ message: "No tickets found for this user" });
        }

        return res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ message: "Server error" });
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

//Update Ticket by User ID
const updateTicketByUserId = async (req, res) => {
    const userId = req.params.userId;
    const ticketId = req.params.ticketId;

    console.log('Received userId:', userId);
    console.log('Received ticketId:', ticketId);

    // Check if userId and ticketId are present
    if (!userId || !ticketId) {
        return res.status(400).json({ message: 'User ID or Ticket ID is missing' });
    }

    try {
        // Convert string IDs to MongoDB ObjectId
    

        // Find the ticket by both userId and ticketId
        const ticket = await Ticket.findOneAndUpdate(
            { _id: ticketId, user: userId },  // Assuming Ticket has userId
            {
                name: req.body.name,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                product: req.body.product,
                subject: req.body.subject,
                inquiry: req.body.inquiry,
                image: req.body.image,
            },
            { new: true }  // Return the updated ticket
        );


        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Return updated ticket
        return res.status(200).json(ticket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        return res.status(500).json({ message: 'Error updating ticket' });
    }
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

//Deletes a ticket only if it belongs to the authenticated user.
const deleteTicket = async (req, res) => {
    const { ticketId } = req.params;  // Get ticketId from URL
    const userId = req.user._id;        // Get userId from JWT


    console.log('Received ticketId:', ticketId);
    console.log('Received userId:', userId);

    try {
        // Find the ticket by its ID
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            console.log("Ticket not found");
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Check if the ticket belongs to the authenticated user
        if (ticket.user.toString() !== userId.toString()) {
            console.log("Unauthorized deletion attempt");
            return res.status(403).json({ message: "You are not authorized to delete this ticket" });
        }

        // Delete the ticket
        await Ticket.findByIdAndDelete(ticketId);
        return res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (err) {
        console.error("Error during ticket deletion:", err);
        return res.status(500).json({ message: "Error deleting ticket" });
    }
};



export default {
    getAllUsers,
    addTicket,
    getById,
    updateUser,
    deleteUser,
    getTicketById,
    getAllTickets,
    getUserTickets,
    updateTicketByUserId,
    deleteTicket
};
