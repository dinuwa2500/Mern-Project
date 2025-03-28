import express from 'express';
import { authGuard } from '../middleware/authMiddleware.js';

// Insert Model (Ticket)
import Ticket from '../models/TicketModel.js';

// Insert Ticket Controller
import TicketControllers from '../controllers/TicketController.js';



const TicketRouter = express.Router();
// Routes for managing tickets
TicketRouter.post("/addticket",authGuard, TicketControllers.addTicket);
TicketRouter.get("/tickets/:id", TicketControllers.getTicketById);
TicketRouter.get("/tickets",authGuard, TicketControllers.getUserTickets);
TicketRouter.put("/tickets/:userId/:ticketId",authGuard, TicketControllers.updateTicketByUserId);
TicketRouter.delete("/:id", TicketControllers.deleteUser);
TicketRouter.delete("/tickets/:ticketId", authGuard, TicketControllers.deleteTicket);


// Export router
export default TicketRouter;
