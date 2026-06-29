import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await axios.get(
                `http://localhost:8081/api/orders/all/${userId}`
            );

            setOrders(response.data);

        } catch (error) {

            console.log(error);

        }
    };


    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h1 className="mb-4">Orders</h1>

                {orders.length === 0 ? (

                    <div className="alert alert-info">
                        No Orders Found
                    </div>

                ) : (

                    <table className="table table-striped table-bordered">

                        <thead className="table-dark">

                        <tr>

                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Pincode</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Status</th>


                        </tr>

                        </thead>

                        <tbody>

                        {orders.map((order) => (

                            <tr key={order.id}>

                                <td>{order.id}</td>

                                <td>{order.customerName}</td>

                                <td>{order.orderDate}</td>

                                <td>{order.phone}</td>

                                <td>
                                    <small>
                                        {order.address}
                                    </small>
                                </td>

                                <td>{order.city}</td>

                                <td>{order.pincode}</td>

                                <td>

                                    {order.items?.map((item, index) => (

                                        <div key={index}>

                                            {item.productName}
                                            {" × "}
                                            {item.quantity}

                                        </div>

                                    ))}

                                </td>

                                <td>
                                    ₹{order.totalAmount}
                                </td>

                                <td>

                                    <span
                                        className={
                                            order.status === "PLACED"
                                                ? "badge bg-warning"
                                                : order.status === "SHIPPED"
                                                    ? "badge bg-info"
                                                    : "badge bg-success"
                                        }
                                    >
                                        {order.status}
                                    </span>

                                </td>

                                <td>


                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                )}

            </div>

            <Footer />

        </>
    );
}

export default Orders;