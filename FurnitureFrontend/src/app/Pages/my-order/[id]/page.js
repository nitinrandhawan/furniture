// app/my-orders/[id]/page.jsx
import Image from 'next/image';
import pic1 from "@/app/Components/assets/icon1.jpg";
import pic2 from "@/app/Components/assets/icon2.webp";
import React from 'react';

const dummyOrder = {
  orderId: "M-T1265",
  date: "20/12/2025",
  status: "Delivered",
  payment: "Paid via UPI",
  products: [
    {
      id: 1,
      name: "Drawing Room Sofa",
      image: pic1,
      price: 5000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Luxury Chair Set",
      image: pic2,
      price: 3200,
      quantity: 2,
    },
  ],
};

const OrderDetails = ({ params }) => {
  const order = dummyOrder; // later replace with real data
  const totalAmount = order.products.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Order Details</h2>

      <div className="mb-4 p-3 bg-light rounded">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Order Date:</strong> {order.date}</p>
        <p><strong>Status:</strong> <span className="badge bg-success">{order.status}</span></p>
        <p><strong>Payment Method:</strong> {order.payment}</p>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Details</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image src={product.image} alt={product.name} width={80} height={80} className="rounded" />
                </td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price * product.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-end"><strong>Grand Total:</strong></td>
              <td><strong>₹{totalAmount}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
