const express = require('express');
const router = express.Router();

//Insert Model
const Delivery = require('../Models/DeliveryModel');

//Insert DeliveryController
const DeliveryController = require('../Controllers/DeliveryController');

router.get('/', DeliveryController.getAllDeliveries);
router.post('/', DeliveryController.addDeliveries);
router.get("/drivers", DeliveryController.getAllDrivers);
router.get('/:id', DeliveryController.getById);
router.put('/:id', DeliveryController.updateDelivery);
router.delete('/:id', DeliveryController.deleteDelivery);

// Driver dashboard routes
router.get('/driver/:driver', DeliveryController.getDeliveriesByDriver);
router.get('/driver/:driver/stats', DeliveryController.getDriverDeliveryStats);
router.put('/driver/:driver/respond/:id', DeliveryController.respondToDelivery);
router.put('/driver/:driver/status/:id', DeliveryController.updateDeliveryStatus);
router.post('/driver/:driver/proof/:id', DeliveryController.uploadProofOfDelivery);
router.post('/driver/:driver/failed/:id', DeliveryController.reportFailedDelivery);

// Admin routes
router.put('/assign/:id', DeliveryController.assignDelivery);


//Expoert
module.exports = router;