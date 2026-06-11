import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/orders/all"
            );

            setOrders(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, status) => {

        try {

            await axios.put(
                `http://localhost:8081/api/orders/status/${id}?status=${status}`
            );

            fetchOrders();

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="container">

            <h1>My Orders</h1>

            {
                orders.map(order => (

                    <div key={order.id}>

                        <h3>Order #{order.id}</h3>

                        <p>Customer: {order.customerName}</p>

                        <p>Total: ₹{order.totalAmount}</p>

                        <p>Status: {order.status}</p>

                        <button
                            onClick={() =>
                                updateStatus(order.id, "SHIPPED")
                            }
                        >
                            Mark Shipped
                        </button>

                        <button
                            onClick={() =>
                                updateStatus(order.id, "DELIVERED")
                            }
                        >
                            Mark Delivered
                        </button>

                        <hr />

                    </div>

                ))
            }

        </div>
    );
}

export default Orders;