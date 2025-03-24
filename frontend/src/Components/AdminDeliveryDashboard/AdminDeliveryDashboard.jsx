import React, { useState, useEffect } from "react";
import "./AdminDeliveryDashboard.css";

function AdminDeliveryDashboard({ deliveries }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [displayDeliveries, setDisplayDeliveries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    assigned: 0
  });

  // Fetch drivers from database
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/deliveries/drivers"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch drivers");
        }

        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  // Initialize the state with the current deliveries
  useEffect(() => {
    const initialDeliveries = [...deliveries];
    setFilteredDeliveries(initialDeliveries);
    setDisplayDeliveries(initialDeliveries);

    // Initialize selectedDrivers object with existing driver assignments
    const driverSelections = {};
    initialDeliveries.forEach((delivery) => {
      // Use _id instead of id if MongoDB is returning _id
      const deliveryId = delivery._id || delivery.id;
      driverSelections[deliveryId] = delivery.driverId || "";
    });
    setSelectedDrivers(driverSelections);
    
    // Update stats
    updateStats(initialDeliveries);
  }, [deliveries]);

  
 // Calculate and update statistics
const updateStats = (deliveriesArray) => {
  const total = deliveriesArray.length;
  const pending = deliveriesArray.filter(d => !d.status || d.status === "Pending" || d.status === "pending").length;
  const assigned = deliveriesArray.filter(d => d.status === "Assigned" || d.status === "assigned").length;
  
  setStats({
    total,
    pending,
    assigned
  });
};

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter deliveries based on search term
    const filtered = deliveries.filter(
      (delivery) =>
        delivery.orderId
          ?.toString()
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        delivery.pickup?.toLowerCase().includes(term.toLowerCase()) ||
        delivery.dropoff?.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredDeliveries(filtered);
    setDisplayDeliveries(filtered);
    
    // Update stats based on filtered deliveries for consistent display
    updateStats(filtered);
  };

  // Handle driver selection change
  const handleDriverChange = (deliveryId, driverId) => {
    console.log(`Changing driver for delivery ${deliveryId} to ${driverId}`);
    
    // Create a new object to ensure state is properly updated
    setSelectedDrivers(prevState => ({
      ...prevState,
      [deliveryId]: driverId
    }));
  };

  // Handle assign button click
  const handleAssignDriver = async (delivery) => {
    // Use _id instead of id if MongoDB is returning _id
    const deliveryId = delivery._id || delivery.id;
    const driverId = selectedDrivers[deliveryId];
    
    if (!driverId) {
      alert("Please select a driver first");
      return;
    }

    // Find the selected driver's name for display
    const selectedDriver = drivers.find(
      (driver) => driver.id.toString() === driverId.toString()
    );

    // Create a deep copy of the current display deliveries
    const updatedDeliveries = displayDeliveries.map(del => {
      const currentId = del._id || del.id;
      if (currentId === deliveryId) {
        return {
          ...del,
          status: "Assigned",
          driverId: driverId,
          driver: selectedDriver?.name, // Update both driverId and driver name
        };
      }
      return { ...del };
    });

    setDisplayDeliveries(updatedDeliveries);
    
    // Also update the filtered deliveries to maintain consistency
    const updatedFilteredDeliveries = filteredDeliveries.map(del => {
      const currentId = del._id || del.id;
      if (currentId === deliveryId) {
        return {
          ...del,
          status: "Assigned",
          driverId: driverId,
          driver: selectedDriver?.name,
        };
      }
      return { ...del };
    });
    
    setFilteredDeliveries(updatedFilteredDeliveries);
    
    // Update statistics after assignment
    updateStats(updatedFilteredDeliveries);

    // Here you should make an API call to update the backend
    try {
      // Update the delivery in your backend
      await fetch(`http://localhost:5000/deliveries/${deliveryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...delivery,
          status: "Assigned",
          driver: selectedDriver?.name,
          driverId: driverId
        }),
      });
      
      alert(`Order ${delivery.orderId} has been assigned to ${selectedDriver?.name}`);
    } catch (error) {
      console.error("Error updating delivery:", error);
      alert(`Failed to assign driver. Please try again.`);
    }
  };

  // Handle reassign button click
  const handleReassignDriver = async (delivery) => {
    // Use _id instead of id if MongoDB is returning _id
    const deliveryId = delivery._id || delivery.id;
    
    // Create a deep copy of the current display deliveries
    const updatedDeliveries = displayDeliveries.map(del => {
      const currentId = del._id || del.id;
      if (currentId === deliveryId) {
        return {
          ...del,
          status: "Pending",
          driverId: "",
          driver: "", 
        };
      }
      return { ...del };
    });

    setDisplayDeliveries(updatedDeliveries);
    
    // Also update the filtered deliveries to maintain consistency
    const updatedFilteredDeliveries = filteredDeliveries.map(del => {
      const currentId = del._id || del.id;
      if (currentId === deliveryId) {
        return {
          ...del,
          status: "Pending",
          driverId: "",
          driver: "",
        };
      }
      return { ...del };
    });
    
    setFilteredDeliveries(updatedFilteredDeliveries);
    
    // Reset the selected driver for this delivery
    setSelectedDrivers(prevState => ({
      ...prevState,
      [deliveryId]: ""
    }));
    
    // Update statistics after reassignment
    updateStats(updatedFilteredDeliveries);

    // Here you should make an API call to update the backend
    try {
      // Update the delivery in your backend
      await fetch(`http://localhost:5000/deliveries/${deliveryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...delivery,
          status: "Pending",
          driver: "",
          driverId: ""
        }),
      });
      
      alert(`Order ${delivery.orderId} has been reset and is ready for reassignment`);
    } catch (error) {
      console.error("Error updating delivery:", error);
      alert(`Failed to reset assignment. Please try again.`);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Delivery Management Dashboard</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Order ID, Pickup or Dropoff location..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Deliveries</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>Assigned</h3>
          <p>{stats.assigned}</p>
        </div>
      </div>

      <div className="delivery-table-container">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Pickup</th>
              <th>Dropoff</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Driver</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayDeliveries.length > 0 ? (
              displayDeliveries.map((delivery) => {
                // Use _id if available, otherwise use id
                const deliveryId = delivery._id || delivery.id;
                return (
                  <tr
                    key={deliveryId}
                    className={
                      delivery.status === "Assigned"
                        ? "assigned-row"
                        : "pending-row"
                    }
                  >
                    <td>{delivery.orderId}</td>
                    <td>{delivery.pickup}</td>
                    <td>{delivery.dropoff}</td>
                    <td>${parseFloat(delivery.amount || 0).toFixed(2)}</td>
                    <td>
                      <span
                        className={`status-badge status-${delivery.status?.toLowerCase() || "pending"}`}
                      >
                        {delivery.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <select
                        value={selectedDrivers[deliveryId] || ""}
                        onChange={(e) => handleDriverChange(deliveryId, e.target.value)}
                        disabled={delivery.status === "Assigned"}
                      >
                        <option value="">Select Driver</option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {driver.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {delivery.status === "Assigned" ? (
                        <button
                          className="reassign-button"
                          onClick={() => handleReassignDriver(delivery)}
                        >
                          Reassign
                        </button>
                      ) : (
                        <button
                          className="assign-button"
                          onClick={() => handleAssignDriver(delivery)}
                          disabled={!selectedDrivers[deliveryId]}
                        >
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No deliveries match your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDeliveryDashboard;