import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {

        axios.get("http://localhost:8081/api/products/all")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });


    const addToCart = (product) => {

        axios.post("http://localhost:8081/api/cart/add", {
            productName: product.name,
            price: product.price,
            quantity: 1
        })
            .then(() => {
                alert(product.name + " added to cart!");
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to add item to cart");
            });
    };

    return (
        <div className="container">

            <h1>TrendMart</h1>

            <Link to="/login">
                <button>Login</button>
            </Link>

            <br /><br />

            <Link to="/register">
                <button>Register</button>
            </Link>

            <br /><br />

            <Link to="/cart">
                <button>Cart</button>
            </Link>

            <br /><br />

            <Link to="/orders">
                <button>Orders</button>
            </Link>

            <br /><br />

            <h2>Products</h2>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br /><br />

            <div className="mb-3">

                <button
                    className="btn btn-secondary me-2"
                    onClick={() => setSelectedCategory("All")}
                >
                    All
                </button>

                <button
                    className="btn btn-primary me-2"
                    onClick={() => setSelectedCategory("Electronics")}
                >
                    Electronics
                </button>

                <button
                    className="btn btn-success me-2"
                    onClick={() => setSelectedCategory("Accessories")}
                >
                    Accessories
                </button>

                <button
                    className="btn btn-warning me-2"
                    onClick={() => setSelectedCategory("Wearables")}
                >
                    Wearables
                </button>

                <button
                    className="btn btn-danger"
                    onClick={() => setSelectedCategory("Gaming")}
                >
                    Gaming
                </button>

            </div>


            {filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="row">

                    {filteredProducts.map((product) => (

                        <div key={product.id} className="col-md-4 mb-4">

                            <div className="card h-100 shadow">

                                <div className="card-body">

                                    <h4 className="card-title">
                                        {product.name}
                                    </h4>

                                    <h6 className="text-muted">
                                        {product.category}
                                    </h6>

                                    <p className="mt-3">
                                        {product.description}
                                    </p>

                                    <h5>
                                        ₹{product.price}
                                    </h5>

                                </div>

                                <div className="card-footer bg-white border-0">

                                    <button
                                        className="btn btn-dark w-100"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add To Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Home;
