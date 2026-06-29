import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [saveDefault, setSaveDefault] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
        loadUserAddress();

    }, []);

    const fetchCart = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await axios.get(
                `http://localhost:8081/api/cart/all/${userId}`
            );

            setCartItems(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const loadUserAddress = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await axios.get(
                `http://localhost:8081/api/users/address/${userId}`
            );

            const user = response.data;

            setCustomerName(user.name || "");
            setPhone(user.phone || "");
            setAddress(user.address || "");
            setCity(user.city || "");
            setState(user.state || "");
            setPincode(user.pincode || "");

        } catch (error) {

            console.log(error);

        }

    };

    const removeItem = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8081/api/cart/remove/${id}`
            );

            fetchCart();

        } catch (error) {

            console.log(error);

        }

    };

    const increaseQuantity = async (id) => {

        try {

            await axios.put(
                `http://localhost:8081/api/cart/increase/${id}`
            );

            fetchCart();

        } catch (error) {

            console.log(error);

        }

    };

    const decreaseQuantity = async (id) => {

        try {

            await axios.put(
                `http://localhost:8081/api/cart/decrease/${id}`
            );

            fetchCart();

        } catch (error) {

            console.log(error);

        }

    };

    const getLocation = () => {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    try {

                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );

                        setAddress(response.data.display_name);

                        setCity(
                            response.data.address.city ||
                            response.data.address.town ||
                            response.data.address.village ||
                            ""
                        );

                        setPincode(
                            response.data.address.postcode || ""
                        );

                    } catch (error) {

                        console.log(error);

                    }

                }

            );

        }

    };

    const placeOrder = async () => {

        try {
            const userId = localStorage.getItem("userId");
            const totalAmount = cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            const orderData = {


                userId,
                customerName,
                phone,
                address,
                city,
                state,
                pincode,
                totalAmount,
                status: "PENDING",
                orderDate: new Date().toLocaleString(),

                items: cartItems.map(item => ({
                    productName: item.productName,
                    quantity: item.quantity,
                    price: item.price
                }))

            };
            if (saveDefault) {

                await axios.put(
                    `http://localhost:8081/api/users/address/${userId}`,
                    {
                        phone,
                        address,
                        city,
                        state,
                        pincode
                    }
                );

            }

            await axios.post(
                "http://localhost:8081/api/orders/place",
                orderData
            );

            for (const item of cartItems) {

                await axios.delete(
                    `http://localhost:8081/api/cart/remove/${item.id}`
                );

            }

            toast.success("Order Placed Successfully");

            navigate("/orders");

        } catch (error) {

            console.log(error);
            toast.error("Failed To Place Order");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? (

                    <div className="alert alert-info">
                        Cart is Empty
                    </div>

                ) : (

                    <>
                        <table className="table table-bordered">

                            <thead className="table-dark">
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>

                            {cartItems.map(item => (

                                <tr key={item.id}>

                                    <td>{item.productName}</td>

                                    <td>₹{item.price}</td>

                                    <td>

                                        <button
                                            className="btn btn-secondary btn-sm me-2"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>

                                        {item.quantity}

                                        <button
                                            className="btn btn-secondary btn-sm ms-2"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </button>

                                    </td>

                                    <td>
                                        ₹{item.price * item.quantity}
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                        <div className="card shadow p-4 mt-4">

                            <h3>Delivery Details</h3>

                            <input
                                className="form-control mb-3"
                                placeholder="Customer Name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <textarea
                                className="form-control mb-3"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />


                                <div className="form-check mb-3">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={saveDefault}
                                        onChange={(e) => setSaveDefault(e.target.checked)}
                                    />

                                    <label className="form-check-label">
                                        Save as Default Address
                                    </label>

                                </div>

                            <button
                                className="btn btn-primary"
                                onClick={getLocation}
                            >
                                Use My Location
                            </button>

                        </div>

                        <div className="text-end mt-4">

                            <h3>

                                Total Amount ₹

                                {
                                    cartItems.reduce(
                                        (total, item) =>
                                            total + item.price * item.quantity,
                                        0
                                    )
                                }

                            </h3>

                            <button
                                className="btn btn-success mt-3"
                                onClick={placeOrder}
                            >
                                Place Order
                            </button>

                        </div>

                    </>

                )}

            </div>

            <Footer />

        </>

    );

}

export default Cart;