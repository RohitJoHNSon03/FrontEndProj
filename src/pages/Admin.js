import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import './Admin.css'; // Import the admin-specific styles

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderSnapshot = await getDocs(collection(db, "orders"));
      const orderList = orderSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setOrders(orderList);
    };

    fetchOrders();
  }, []);

  const handleApprove = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "Approved" });

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Approved" } : order
      )
    );
  };

  const handleClearOrders = async () => {
    try {
      // Clear all previous orders (you could modify this as needed, such as deleting specific orders)
      const orderSnapshot = await getDocs(collection(db, "orders"));
      orderSnapshot.forEach(async (docSnap) => {
        await updateDoc(doc(db, "orders", docSnap.id), { status: "Cancelled" });
      });

      // Clear orders from local state as well
      setOrders([]);
    } catch (error) {
      console.error("Error clearing orders:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Orders</h2>
      <button className="clear-button" onClick={handleClearOrders}>
        Clear Previous Orders
      </button>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {Array.isArray(order.cart) ? (
                order.cart.map((item, index) => (
                  <li key={index}>
                    {item.name} - ₹{item.price}
                  </li>
                ))
              ) : (
                <li>No items</li>
              )}
            </ul>
            {order.status !== "Approved" && (
              <button className="approve-button" onClick={() => handleApprove(order.id)}>
                Approve
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
