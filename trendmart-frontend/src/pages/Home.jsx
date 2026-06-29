import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Home() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [ratings, setRatings] = useState({});

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                const response = await axios.get(
                    `http://localhost:8081/api/products?page=${currentPage}&size=6`
                );

                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);

                const ratingMap = {};

                for (const product of response.data.content) {

                    try {

                        const ratingResponse = await axios.get(
                            `http://localhost:8081/api/reviews/average/${product.id}`
                        );

                        ratingMap[product.id] = ratingResponse.data;

                    } catch {

                        ratingMap[product.id] = 0;

                    }

                }

                setRatings(ratingMap);
                setLoading(false);
            }

            catch (error) {

                console.log(error);
                setLoading(false);

            }

        };

        fetchProducts();

    }, [currentPage]);

    const filteredProducts = products
        .filter((product) => {

            const matchesSearch =
                product.name.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;

        })
        .sort((a, b) => {

            if (sortBy === "lowToHigh") {

                return a.price - b.price;

            }

            if (sortBy === "highToLow") {

                return b.price - a.price;

            }

            return 0;

        });

    const categories = [
        "All",
        ...new Set(
            products
                .map(product => product.category)
                .filter(category => category)
        )
    ];

    const addToCart = (product) => {

        axios.post(
            "http://localhost:8081/api/cart/add",
            {
                userId: localStorage.getItem("userId"),
                productName: product.name,
                price: product.price,
                quantity: 1
            }
        )
            .then(() => {

                toast.success(product.name + " added to cart!");

            })
            .catch((error) => {

                console.log(error);

                toast.error("Failed to add item to cart");

            });

    };

    const addToWishlist = async (product) => {

        try {

            const userId = localStorage.getItem("userId");

            await axios.post(
                "http://localhost:8081/api/wishlist/add",
                {
                    userId,
                    productName: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl
                }
            );

            toast.success("Added to Wishlist");

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to add to wishlist");

        }

    };

    return (

        <div className="container">

            <Navbar />

            <div className="mt-4">

                <h2>Products</h2>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select mb-3"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >

                    <option value="default">
                        Default
                    </option>

                    <option value="lowToHigh">
                        Price Low → High
                    </option>

                    <option value="highToLow">
                        Price High → Low
                    </option>

                </select>

                <div className="mb-4">

                    {categories.map((category) => (

                        <button
                            key={category}
                            className={`btn me-2 mb-2 ${
                                selectedCategory === category
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>

                    ))}

                </div>

                {loading ? (

                    <div className="text-center my-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <h5 className="mt-3">
                            Loading Products...
                        </h5>

                    </div>

                ) : filteredProducts.length === 0 ? (

                    <p>No products found.</p>

                ) : (

                    <div className="row">

                        {filteredProducts.map((product) => (

                            <div
                                key={product.id}
                                className="col-md-4 mb-4"
                            >

                                <div className="card h-100 shadow">

                                    <img
                                        src={product.imageUrl}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div className="card-body">

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="text-decoration-none"
                                        >
                                            <h4>{product.name}</h4>
                                        </Link>

                                        <h6 className="text-muted">
                                            {product.category}
                                        </h6>

                                        <p className="mt-3">
                                            {product.description}
                                        </p>

                                        <h5>
                                            ₹{product.price}
                                        </h5>

                                        <p className="text-warning fw-bold">
                                            ⭐ {ratings[product.id]?.toFixed(1) || "0.0"} / 5
                                        </p>

                                        <div className="mb-2">

                                            {product.stock > 0 ? (

                                                <span className="badge bg-success">
                                                    In Stock ({product.stock})
                                                </span>

                                            ) : (

                                                <span className="badge bg-danger">
                                                    Out of Stock
                                                </span>

                                            )}

                                        </div>

                                    </div>

                                    <div className="card-footer bg-white border-0">

                                        <button
                                            className="btn btn-outline-danger w-100 mb-2"
                                            onClick={() => addToWishlist(product)}
                                        >
                                            ❤️ Wishlist
                                        </button>

                                        <button
                                            className="btn btn-dark w-100"
                                            disabled={product.stock === 0}
                                            onClick={() => addToCart(product)}
                                        >
                                            {product.stock === 0
                                                ? "Out of Stock"
                                                : "Add To Cart"}
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}
                <div className="d-flex justify-content-center mt-4">

                    <button
                        className="btn btn-outline-primary me-2"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (

                        <button
                            key={index}
                            className={`btn me-2 ${
                                currentPage === index
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                            }`}
                            onClick={() => setCurrentPage(index)}
                        >
                            {index + 1}
                        </button>

                    ))}

                    <button
                        className="btn btn-outline-primary"
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>

            <Footer />

        </div>

    );

}

export default Home;

