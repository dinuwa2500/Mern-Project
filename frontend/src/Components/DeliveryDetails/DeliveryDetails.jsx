import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDeliveryDashboard from "../AdminDeliveryDashboard/AdminDeliveryDashboard";

const URL = "http://localhost:5000/deliveries";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    throw error;
  }
};

function DeliveryDetails() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchHandler()
      .then((data) => {
        console.log("Data received:", data);
        setDeliveries(data.deliveries);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch deliveries:", err);
        setError(err.message || "Failed to fetch deliveries");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <p>Loading deliveries...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (!deliveries || deliveries.length === 0) && (
        <p>No deliveries found. Please add some deliveries to get started.</p>
      )}

      {/* Only render the AdminDeliveryDashboard if we have deliveries */}
      {!loading && !error && deliveries && deliveries.length > 0 && (
        <AdminDeliveryDashboard deliveries={deliveries} />
      )}
    </div>
  );
}

export default DeliveryDetails;
