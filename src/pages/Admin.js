import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

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

  return (
    <div>
      <h2>Admin Panel - Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
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
              <button onClick={() => handleApprove(order.id)}>Approve</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
