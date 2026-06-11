import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/cart/all"
            );

            setCartItems(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = async (id) => {
        try {

            await axios.delete(
                `http://localhost:8081/api/cart/remove/${id}`
            );

            alert("Item Removed");

            fetchCart();

        } catch (error) {

            console.log(error);
            alert("Failed to Remove Item");

        }
    };

    const placeOrder = async () => {

        try {

            const totalAmount = cartItems.reduce(
                (total, item) => total + (item.price * item.quantity),
                0
            );

            const orderData = {
                customerName: "Yasmin",
                totalAmount: totalAmount,
                status: "PLACED"
            };

            const response = await axios.post(
                "http://localhost:8081/api/orders/place",
                orderData
            );

            alert("Order Placed Successfully");

            console.log(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to Place Order");

        }
    };

    return (
        <div className="container">

            <h1>Cart</h1>

            {cartItems.length === 0 ? (
                <p>Cart is Empty</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h3>{item.productName}</h3>
                        <p>Price: ₹{item.price}</p>
                        <p>Quantity: {item.quantity}</p>

                        <button onClick={() => removeItem(item.id)}>
                            Remove
                        </button>

                        <hr />
                    </div>
                ))
            )}

            <h3>
                Total: ₹{
                cartItems.reduce(
                    (total, item) => total + (item.price * item.quantity),
                    0
                )
            }
            </h3>

            <br />

            <button onClick={placeOrder}>
                Place Order
            </button>

        </div>
    );
}

export default Cart;