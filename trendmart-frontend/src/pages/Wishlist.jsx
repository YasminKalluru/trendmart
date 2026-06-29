import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Wishlist() {

    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {

        fetchWishlist();

    }, []);

    const fetchWishlist = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await axios.get(
                `http://localhost:8081/api/wishlist/all/${userId}`
            );

            setWishlistItems(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const removeItem = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8081/api/wishlist/remove/${id}`
            );

            toast.success("Item Removed");

            fetchWishlist();

        } catch (error) {

            console.log(error);

            toast.error("Failed To Remove Item");

        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h1 className="mb-4">My Wishlist</h1>

                {
                    wishlistItems.length === 0 ?

                        (
                            <div className="alert alert-info">
                                Wishlist is Empty
                            </div>
                        )

                        :

                        (
                            <table className="table table-striped table-bordered">

                                <thead className="table-dark">

                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>

                                </thead>

                                <tbody>

                                {

                                    wishlistItems.map((item) => (

                                        <tr key={item.id}>

                                            <td>{item.productName}</td>

                                            <td>₹{item.price}</td>

                                            <td>

                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.productName}
                                                    width="100"
                                                    height="100"
                                                />

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

                                    ))

                                }

                                </tbody>

                            </table>
                        )
                }

            </div>

            <Footer />

        </>
    );
}

export default Wishlist;







