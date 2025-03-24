import React, { useState, useEffect } from 'react';
import './DriverDashboard.css';

const DriverDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const [deliveries, setDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('assigned');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call to fetch deliveries
    const fetchDeliveries = async () => {
      setIsLoading(true);
      
      // Mock data - replace with actual API call
      setTimeout(() => {
        const mockDeliveries = [
          {
            id: 'DEL-001',
            pickupAddress: '123 Main St, Anytown, AN 12345',
            dropoffAddress: '456 Oak Ave, Somecity, SC 67890',
            status: 'assigned',
            assignedAt: '2025-03-22T10:30:00',
            estimatedDelivery: '2025-03-23T14:00:00'
          },
          {
            id: 'DEL-002',
            pickupAddress: '789 Pine Rd, Othertown, OT 54321',
            dropoffAddress: '456 Oak Ave, Somecity, SC 67890',
            status: 'assigned',
            assignedAt: '2025-03-22T11:15:00',
            estimatedDelivery: '2025-03-23T15:30:00'
          },
          {
            id: 'DEL-003',
            pickupAddress: '321 Cedar Ln, Newcity, NC 13579',
            dropoffAddress: '789 Pine Rd, Othertown, OT 54321',
            status: 'picked_up',
            assignedAt: '2025-03-22T09:00:00',
            estimatedDelivery: '2025-03-23T13:00:00'
          },
          {
            id: 'DEL-004',
            pickupAddress: '654 Birch St, Oldtown, OT 97531',
            dropoffAddress: '321 Cedar Ln, Newcity, NC 13579',
            status: 'out_for_delivery',
            assignedAt: '2025-03-22T08:30:00',
            estimatedDelivery: '2025-03-23T12:00:00'
          },
          {
            id: 'DEL-005',
            pickupAddress: '123 Main St, Anytown, AN 12345',
            dropoffAddress: '654 Birch St, Oldtown, OT 97531',
            status: 'delivered',
            assignedAt: '2025-03-21T14:00:00',
            estimatedDelivery: '2025-03-22T16:00:00',
            deliveredAt: '2025-03-22T15:45:00'
          }
        ];
        
        setDeliveries(mockDeliveries);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchDeliveries();
  }, []);
  
  const handleAcceptDelivery = (id) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === id ? {...delivery, status: 'accepted'} : delivery
    ));
  };
  
  const handleDeclineDelivery = (id) => {
    setDeliveries(deliveries.filter(delivery => delivery.id !== id));
  };
  
  const handleStatusUpdate = (id, newStatus) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === id ? {...delivery, status: newStatus} : delivery
    ));
  };
  
  const handleReportIssue = (id) => {
    // In a real app, this would open a modal or form to report the issue
    alert(`Reporting issue for delivery ${id}. In a real app, this would open a form.`);
  };
  
  const handleUploadProof = (id, event) => {
    // Prevent default form submission
    event.preventDefault();
    
    // In a real app, this would handle file uploads
    alert(`Proof of delivery for ${id} uploaded successfully!`);
    
    // Update the status to delivered
    handleStatusUpdate(id, 'delivered');
  };
  
  const filteredDeliveries = deliveries.filter(delivery => {
    switch(activeTab) {
      case 'assigned':
        return delivery.status === 'assigned';
      case 'accepted':
        return delivery.status === 'accepted' || delivery.status === 'picked_up' || delivery.status === 'out_for_delivery';
      case 'completed':
        return delivery.status === 'delivered';
      default:
        return true;
    }
  });
  
  const getStatusText = (status) => {
    switch(status) {
      case 'assigned': return 'Assigned';
      case 'accepted': return 'Accepted';
      case 'picked_up': return 'Picked Up';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className="driver-dashboard">
      <header className="dashboard-header">
        <h1>Delivery Partner Dashboard</h1>
        <div className="user-info">
          <span className="user-name">Alex Driver</span>
          <span className="user-status online">●</span>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <ul className="tabs">
          <li className={activeTab === 'assigned' ? 'active' : ''} onClick={() => setActiveTab('assigned')}>
            Assigned Deliveries
          </li>
          <li className={activeTab === 'accepted' ? 'active' : ''} onClick={() => setActiveTab('accepted')}>
            In Progress
          </li>
          <li className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>
            Completed
          </li>
        </ul>
      </nav>
      
      <main className="dashboard-content">
        <h2>{activeTab === 'assigned' ? 'Assigned Deliveries' : 
             activeTab === 'accepted' ? 'In Progress Deliveries' : 'Completed Deliveries'}</h2>
        
        {isLoading ? (
          <div className="loading">Loading deliveries...</div>
        ) : filteredDeliveries.length === 0 ? (
          <div className="no-deliveries">No deliveries in this category.</div>
        ) : (
          <div className="deliveries-list">
            {filteredDeliveries.map(delivery => (
              <div key={delivery.id} className={`delivery-card status-${delivery.status}`}>
                <div className="delivery-header">
                  <h3>{delivery.id}</h3>
                  <span className={`status-badge ${delivery.status}`}>
                    {getStatusText(delivery.status)}
                  </span>
                </div>
                
                <div className="delivery-details">
                  <p><strong>Pickup:</strong> {delivery.pickupAddress}</p>
                  <p><strong>Dropoff:</strong> {delivery.dropoffAddress}</p>
                </div>
                
                <div className="delivery-actions">
                  {delivery.status === 'assigned' && (
                    <>
                      <button className="btn accept" onClick={() => handleAcceptDelivery(delivery.id)}>
                        Accept Delivery
                      </button>
                      <button className="btn decline" onClick={() => handleDeclineDelivery(delivery.id)}>
                        Decline
                      </button>
                    </>
                  )}
                  
                  {delivery.status === 'accepted' && (
                    <button className="btn update" onClick={() => handleStatusUpdate(delivery.id, 'picked_up')}>
                      Mark as Picked Up
                    </button>
                  )}
                  
                  {delivery.status === 'picked_up' && (
                    <button className="btn update" onClick={() => handleStatusUpdate(delivery.id, 'out_for_delivery')}>
                      Mark as Out for Delivery
                    </button>
                  )}
                  
                  {delivery.status === 'out_for_delivery' && (
                    <>
                      <form className="proof-form" onSubmit={(e) => handleUploadProof(delivery.id, e)}>
                        <div className="file-input-group">
                          <label htmlFor={`proof-${delivery.id}`} className="file-label">
                            Upload Proof of Delivery
                          </label>
                          <input 
                            type="file" 
                            id={`proof-${delivery.id}`} 
                            accept="image/*" 
                            className="file-input"
                            required
                          />
                        </div>
                        <button type="submit" className="btn upload">
                          Submit & Complete
                        </button>
                      </form>
                      <button className="btn report" onClick={() => handleReportIssue(delivery.id)}>
                        Report Issue
                      </button>
                    </>
                  )}
                  
                  {(delivery.status === 'accepted' || delivery.status === 'picked_up' || delivery.status === 'out_for_delivery') && (
                    <button className="btn report" onClick={() => handleReportIssue(delivery.id)}>
                      Report Issue
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="dashboard-footer">
        {/* Empty footer as requested */}
      </footer>
    </div>
  );
};

export default DriverDashboard;