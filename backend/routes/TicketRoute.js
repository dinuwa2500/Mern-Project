import express from 'express';


// Insert Model (Ticket)
import Ticket from '../models/TicketModel.js';

// Insert Ticket Controller
import TicketControllers from '../controllers/TicketController.js';



const TicketRouter = express.Router();
// Routes for managing tickets
TicketRouter.get("/tickets", TicketControllers.getAllUsers);
TicketRouter.post("/addticket", TicketControllers.addTicket);
TicketRouter.get("/tickets/:id", TicketControllers.getById);
TicketRouter.put("/:id", TicketControllers.updateUser);
TicketRouter.delete("/:id", TicketControllers.deleteUser);

// Export router
export default TicketRouter;
