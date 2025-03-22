import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    product: { type: String },
    subject: { type: String, required: true },
    inquiry: { type: String, required: true },
    image: { type: String }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const SupportTicket = mongoose.model('SupportTicket', ticketSchema);

export default SupportTicket;
