const Delivery = require("../Models/DeliveryModel");

//Get all deliveries--------------------------------------------------------------------------------------------
const getAllDeliveries = async (req, res, next) => {
  let deliveries;

  //Get all deliveries
  try {
    deliveries = await Delivery.find();
  } catch (err) {
    console.log(err);
  }

  //Deliveries not found
  if (!deliveries) {
    return res.status(404).json({ message: "Deliveries not found" });
  }

  //Display all deliveries
  return res.status(200).json({ deliveries });
};

//Insert Deliveries--------------------------------------------------------------------------------------------
const addDeliveries = async (req, res, next) => {
  const {
    orderId,
    driver,
    status,
    pickup,
    dropoff,
    amount,
    proofOfDelivery,
    failedReason,
  } = req.body;

  let deliveries;

  try {
    deliveries = new Delivery({
      orderId,
      driver,
      status,
      pickup,
      dropoff,
      amount,
      proofOfDelivery,
      failedReason,
    });
    await deliveries.save();
  } catch (err) {
    console.log(err);
  }

  //fail to insert
  if (!deliveries) {
    return res.status(404).send({ message: "unable to add deliveries" });
  }

  return res.status(200).json({ deliveries });
};

//Deliveries get by id-------------------------------------------------------------------------------------

const getById = async (req, res, next) => {
  const id = req.params.id;

  let delivery;

  try {
    delivery = await Delivery.findById(id);
  } catch (err) {
    console.log(err);
  }

  //If Deliveries not available
  if (!delivery) {
    return res.status(404).send({ message: "Delivery not found" });
  }

  return res.status(200).json({ delivery });
};

//Update delivery details---------------------------------------------------------------------------------
const updateDelivery = async (req, res, next) => {
  const id = req.params.id;

  const {
    orderId,
    driver,
    status,
    pickup,
    dropoff,
    amount,
    proofOfDelivery,
    failedReason,
  } = req.body;

  let deliveries;

  try {
    deliveries = await Delivery.findByIdAndUpdate(
      id,

      {
        orderId: orderId,
        driver: driver,
        status: status,
        pickup: pickup,
        dropoff: dropoff,
        amount: amount,
        proofOfDelivery: proofOfDelivery,
        failedReason: failedReason,
      },
      {new:true}
    );
    deliveries = await deliveries.save();
  } catch (err) {
    console.log(err);
  }
  if (!deliveries) {
    return res
      .status(404)
      .send({ message: "Unable to update Delivery details" });
  }

  return res.status(200).json({ deliveries });
};

//Delete Deliveries----------------------------------------------------------------------------------------------

const deleteDelivery = async (req, res, next) => {
  const id = req.params.id;

  let delivery;

  try {
    delivery = await Delivery.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!delivery) {
    return res
      .status(404)
      .send({ message: "Unable to delete Delivery details" });
  }

  return res.status(200).json({ delivery });
};


//Get driver names---------------------------------------------------------------------------------------


// Get all unique drivers from delivery records
const getAllDrivers = async (req, res, next) => {
  try {
    // Use Delivery instead of DeliveryModel to match your import
    const driverNames = await Delivery.distinct('driver');
    
    // Filter out null or empty values
    const filteredDrivers = driverNames.filter(driver => 
      driver !== null && driver !== ""
    );
    
    // Format the response
    const drivers = filteredDrivers.map((name, index) => ({
      id: index + 1,
      name: name
    }));
    
    return res.status(200).json(drivers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch drivers" });
  }
};


//-----------------------------------------------------------------------------------------------------------------



//Get deliveries by driver-----------------------------------------------------------------------------
const getDeliveriesByDriver = async (req, res, next) => {
  const driver = req.params.driver;
  
  let deliveries;
  
  try {
    deliveries = await Delivery.find({ driver: driver }).sort({ createdAt: -1 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch driver deliveries" });
  }
  
  if (!deliveries || deliveries.length === 0) {
    return res.status(404).json({ message: "No deliveries found for this driver" });
  }
  
  return res.status(200).json({ deliveries });
};

//Assign delivery to driver------------------------------------------------------------------------------
const assignDelivery = async (req, res, next) => {
  const id = req.params.id;
  const { driver } = req.body;
  
  if (!driver) {
    return res.status(400).json({ message: "Driver name is required" });
  }
  
  let delivery;
  
  try {
    delivery = await Delivery.findById(id);
    
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    
    delivery.driver = driver;
    delivery.status = "assigned";
    await delivery.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to assign delivery" });
  }
  
  return res.status(200).json({ 
    message: "Delivery assigned successfully", 
    delivery 
  });
};

//Accept or decline delivery------------------------------------------------------------------------------
const respondToDelivery = async (req, res, next) => {
  const id = req.params.id;
  const { response } = req.body; // 'accepted' or 'declined'
  const driver = req.params.driver; // Or from auth token in a real app
  
  if (!response || !["accepted", "declined"].includes(response)) {
    return res.status(400).json({ message: "Response must be either 'accepted' or 'declined'" });
  }
  
  let delivery;
  
  try {
    delivery = await Delivery.findById(id);
    
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    
    if (delivery.driver !== driver) {
      return res.status(403).json({ message: "Unauthorized: You are not assigned to this delivery" });
    }
    
    if (delivery.status !== "assigned") {
      return res.status(400).json({ message: `Cannot ${response} delivery that is not in 'assigned' status` });
    }
    
    delivery.status = response;
    
    if (response === "declined") {
      delivery.driver = null;
      delivery.status = "pending";
    }
    
    await delivery.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Failed to ${response} delivery` });
  }
  
  return res.status(200).json({ 
    message: `Delivery ${response} successfully`, 
    delivery 
  });
};

//Update delivery status (for drivers)--------------------------------------------------------------------
const updateDeliveryStatus = async (req, res, next) => {
  const id = req.params.id;
  const { status } = req.body;
  const driver = req.params.driver; // Or from auth token in a real app
  
  const validStatuses = ["picked_up", "out_for_delivery", "delivered"];
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ 
      message: "Invalid status. Status must be one of: " + validStatuses.join(", ") 
    });
  }
  
  let delivery;
  
  try {
    delivery = await Delivery.findById(id);
    
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    
    if (delivery.driver !== driver) {
      return res.status(403).json({ message: "Unauthorized: You are not assigned to this delivery" });
    }
    
    delivery.status = status;
    await delivery.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update delivery status" });
  }
  
  return res.status(200).json({ 
    message: `Delivery status updated to ${status} successfully`, 
    delivery 
  });
};

//Upload proof of delivery--------------------------------------------------------------------------------
const uploadProofOfDelivery = async (req, res, next) => {
  const id = req.params.id;
  const driver = req.params.driver; // Or from auth token in a real app
  
  // In a real implementation, you'd handle file upload
  let proofImagePath = req.body.proofImage || req.file?.path;
  
  if (!proofImagePath) {
    return res.status(400).json({ message: "Proof of delivery image is required" });
  }
  
  let delivery;
  
  try {
    delivery = await Delivery.findById(id);
    
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    
    if (delivery.driver !== driver) {
      return res.status(403).json({ message: "Unauthorized: You are not assigned to this delivery" });
    }
    
    delivery.proofOfDelivery = proofImagePath;
    
    if (delivery.status === "out_for_delivery") {
      delivery.status = "delivered";
    }
    
    await delivery.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to upload proof of delivery" });
  }
  
  return res.status(200).json({ 
    message: "Proof of delivery uploaded successfully", 
    delivery 
  });
};

//Report failed delivery----------------------------------------------------------------------------------
const reportFailedDelivery = async (req, res, next) => {
  const id = req.params.id;
  const { failedReason } = req.body;
  const driver = req.params.driver; // Or from auth token in a real app
  
  if (!failedReason) {
    return res.status(400).json({ message: "Failed reason is required" });
  }
  
  let delivery;
  
  try {
    delivery = await Delivery.findById(id);
    
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    
    if (delivery.driver !== driver) {
      return res.status(403).json({ message: "Unauthorized: You are not assigned to this delivery" });
    }
    
    delivery.status = "failed";
    delivery.failedReason = failedReason;
    await delivery.save();
    
    // In a real app, you might want to notify admin here
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to report failed delivery" });
  }
  
  return res.status(200).json({ 
    message: "Failed delivery reported successfully", 
    delivery 
  });
};

//Get delivery stats for a driver (for dashboard)---------------------------------------------------------
const getDriverDeliveryStats = async (req, res, next) => {
  const driver = req.params.driver;
  
  try {
    // Get counts by status
    const allDeliveries = await Delivery.find({ driver: driver });
    
    // Count by status
    const statusCounts = {};
    allDeliveries.forEach(delivery => {
      statusCounts[delivery.status] = (statusCounts[delivery.status] || 0) + 1;
    });
    
    // Calculate earnings (for delivered)
    const deliveredDeliveries = allDeliveries.filter(d => d.status === "delivered");
    const totalEarnings = deliveredDeliveries.reduce((sum, d) => sum + (d.amount || 0), 0);
    
    return res.status(200).json({
      statusCounts,
      earnings: {
        totalEarnings,
        deliveriesCompleted: deliveredDeliveries.length
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get driver delivery stats" });
  }
};


//Functions for Driver Dashboard------------------------------------------------------------------------------------------------------------

exports.getDeliveriesByDriver = getDeliveriesByDriver;
exports.assignDelivery = assignDelivery;
exports.respondToDelivery = respondToDelivery;
exports.updateDeliveryStatus = updateDeliveryStatus;
exports.uploadProofOfDelivery = uploadProofOfDelivery;
exports.reportFailedDelivery = reportFailedDelivery;
exports.getDriverDeliveryStats = getDriverDeliveryStats;


//Functions for Admin Delivery dashboard--------------------------------------------------------------------------------------------------------------
exports.getAllDeliveries = getAllDeliveries;
exports.addDeliveries = addDeliveries;
exports.getById = getById;
exports.updateDelivery = updateDelivery;
exports.deleteDelivery = deleteDelivery;
exports.getAllDrivers = getAllDrivers;
