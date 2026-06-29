import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Admin() {

    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {

        return (
            <div className="container mt-5 text-center">

                <h1 className="text-danger">
                    Access Denied
                </h1>

                <h4>
                    Only Admin can access this page.
                </h4>

            </div>
        );
    }

    /* ---------------- Dashboard ---------------- */

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [productCount, setProductCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const [editCategoryName, setEditCategoryName] = useState("");
    const [editCategoryDescription, setEditCategoryDescription] = useState("");
    const [orderCount, setOrderCount] = useState(0);
    const [revenue, setRevenue] = useState(0);

    const [pendingOrders, setPendingOrders] = useState(0);
    const [shippedOrders, setShippedOrders] = useState(0);
    const [deliveredOrders, setDeliveredOrders] = useState(0);

    /* ---------------- Search ---------------- */

    const [search, setSearch] = useState("");

    /* ---------------- Add Product ---------------- */

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    /* ---------------- Edit Product ---------------- */

    const [editingId, setEditingId] = useState(null);

    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editImageUrl, setEditImageUrl] = useState("");
    const [stock, setStock] = useState("");
    const [editStock, setEditStock] = useState("");

    useEffect(() => {

        fetchProducts();
        fetchOrders();
        fetchCategories();

    }, []);
    /* ---------------- Fetch Products ---------------- */
    const fetchCategories = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/api/categories/all"
            );

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const addCategory = async () => {
        if (!categoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!categoryDescription.trim()) {
            toast.error("Category description is required");
            return;
        }
        try {

            await axios.post(
                "http://localhost:8081/api/categories/add",
                {
                    name: categoryName,
                    description: categoryDescription
                }
            );

            toast.success("Category Added");

            setCategoryName("");
            setCategoryDescription("");

            fetchCategories();

        } catch (error) {

            console.log(error);

        }

    };
    const deleteCategory = async (id) => {

        if (!window.confirm("Delete this category?")) {

            return;

        }

        await axios.delete(
            `http://localhost:8081/api/categories/delete/${id}`
        );

        fetchCategories();

    };
    const startCategoryEdit = (category) => {

        setEditingCategoryId(category.id);

        setEditCategoryName(category.name);

        setEditCategoryDescription(category.description);

    };
    const updateCategory = async () => {
        if (!editCategoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!editCategoryDescription.trim()) {
            toast.error("Category description is required");
            return;
        }
        await axios.put(

            `http://localhost:8081/api/categories/update/${editingCategoryId}`,

            {
                name: editCategoryName,
                description: editCategoryDescription
            }

        );

        setEditingCategoryId(null);

        fetchCategories();

    };
    const fetchProducts = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/api/products/all"
            );

            setProducts(response.data);
            setProductCount(response.data.length);

        }

        catch (error) {

            console.log(error);

        }

    };

    /* ---------------- Fetch Orders ---------------- */

    const fetchOrders = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/api/orders/all"
            );

            const data = response.data;

            setOrders(data);
            setOrderCount(data.length);

            setPendingOrders(
                data.filter(order => order.status === "PENDING").length
            );

            setShippedOrders(
                data.filter(order => order.status === "SHIPPED").length
            );

            setDeliveredOrders(
                data.filter(order => order.status === "DELIVERED").length
            );

            const totalRevenue = data.reduce(
                (sum, order) => sum + order.totalAmount,
                0
            );

            setRevenue(totalRevenue);

        }

        catch (error) {

            console.log(error);

        }

    };

    /* ---------------- Add Product ---------------- */

    const addProduct = async () => {
        if (!name.trim()) {
            toast.error("Product name is required");
            return;
        }

        if (price <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        if (!category) {
            toast.error("Please select a category");
            return;
        }

        if (!description.trim()) {
            toast.error("Description is required");
            return;
        }

        if (stock < 0) {
            toast.error("Stock cannot be negative");
            return;
        }

        if (!selectedImage) {
            toast.error("Please choose a product image");
            return;
        }
        let uploadedImageUrl = "";

        if (selectedImage) {

            const formData = new FormData();

            formData.append("file", selectedImage);

            const uploadResponse = await axios.post(
                "http://localhost:8081/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            uploadedImageUrl = uploadResponse.data;

        }
        try {

            await axios.post(
                "http://localhost:8081/api/products/add",
                {
                    name,
                    price,
                    category,
                    description,
                    imageUrl: uploadedImageUrl,
                    stock
                }
            );

            toast.success ("Product Added Successfully");

            setName("");
            setPrice("");
            setCategory("");
            setDescription("");
            setSelectedImage(null);
            setStock("");
            fetchProducts();

        }

        catch (error) {

            console.log(error);

            toast.error("Failed To Add Product");

        }

    };

    /* ---------------- Delete Product ---------------- */

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete this product?")) {

            return;

        }

        try {

            await axios.delete(
                `http://localhost:8081/api/products/delete/${id}`
            );

            fetchProducts();

        }

        catch (error) {

            console.log(error);

        }

    };

    /* ---------------- Start Edit ---------------- */

    const startEdit = (product) => {

        setEditingId(product.id);
        setEditName(product.name);
        setEditPrice(product.price);
        setEditCategory(product.category);
        setEditDescription(product.description);
        setEditImageUrl(product.imageUrl);
        setEditStock(product.stock);

    };

    /* ---------------- Update Product ---------------- */

    const updateProduct = async () => {
        if (!editName.trim()) {
            toast.error("Product name is required");
            return;
        }

        if (editPrice <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        if (!editCategory) {
            toast.error("Category is required");
            return;
        }

        if (!editDescription.trim()) {
            toast.error("Description is required");
            return;
        }

        if (editStock < 0) {
            toast.error("Stock cannot be negative");
            return;
        }
        let uploadedImageUrl = editImageUrl;

        try {

            // Upload new image if selected
            if (selectedImage) {

                const formData = new FormData();
                formData.append("file", selectedImage);

                const uploadResponse = await axios.post(
                    "http://localhost:8081/api/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                uploadedImageUrl = uploadResponse.data;
            }

            // Update product
            await axios.put(
                `http://localhost:8081/api/products/update/${editingId}`,
                {
                    name: editName,
                    price: editPrice,
                    category: editCategory,
                    description: editDescription,
                    imageUrl: uploadedImageUrl,
                    stock: editStock
                }
            );

            toast.success("Product Updated Successfully");

            setEditingId(null);
            setSelectedImage(null);

            fetchProducts();

        } catch (error) {

            console.log(error);
            toast.error("Failed To Update Product");

        }
    };

    /* ---------------- Update Order Status ---------------- */

    const updateStatus = async (id, status) => {

        try {

            await axios.put(
                `http://localhost:8081/api/orders/status/${id}?status=${status}`
            );

            fetchOrders();

        }

        catch (error) {

            console.log(error);

        }

    };

    /* ---------------- Charts ---------------- */

    const barData = {
        labels: ["Pending", "Shipped", "Delivered"],
        datasets: [
            {
                label: "Orders",
                data: [pendingOrders, shippedOrders, deliveredOrders],
                backgroundColor: [
                    "#FFC107", // Yellow
                    "#0DCAF0", // Blue
                    "#198754"  // Green
                ],
                borderColor: [
                    "#FFC107",
                    "#0DCAF0",
                    "#198754"
                ],
                borderWidth: 1
            }
        ]
    };

    const pieData = {
        labels: ["Pending", "Shipped", "Delivered"],
        datasets: [
            {
                data: [pendingOrders, shippedOrders, deliveredOrders],
                backgroundColor: [
                    "#FFC107",
                    "#0DCAF0",
                    "#198754"
                ],
                hoverBackgroundColor: [
                    "#FFCA2C",
                    "#31D2F2",
                    "#157347"
                ]
            }
        ]
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h1 className="mb-4">
                    Admin Dashboard
                </h1>

                {/* Dashboard Cards */}

                <div className="row g-4">

                    <div className="col-md-4">
                        <div className="card shadow text-center p-4">
                            <h5>Total Products</h5>
                            <h2>{productCount}</h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow text-center p-4">
                            <h5>Total Orders</h5>
                            <h2>{orderCount}</h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow text-center p-4">
                            <h5>Total Revenue</h5>
                            <h2>
                                ₹{revenue.toLocaleString()}
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow text-center border-warning p-4">
                            <h5>Pending Orders</h5>
                            <h2 className="text-warning">
                                {pendingOrders}
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow text-center border-info p-4">
                            <h5>Shipped Orders</h5>
                            <h2 className="text-info">
                                {shippedOrders}
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow text-center border-success p-4">
                            <h5>Delivered Orders</h5>
                            <h2 className="text-success">
                                {deliveredOrders}
                            </h2>
                        </div>
                    </div>

                </div>

                {/* Charts */}

                <div className="row mt-5">

                    <div className="col-lg-6 mb-4">

                        <div className="card shadow p-4">

                            <h4 className="text-center mb-4">
                                Order Statistics
                            </h4>

                            <Bar data={barData} />

                        </div>

                    </div>

                    <div className="col-lg-6 mb-4">

                        <div className="card shadow p-4">

                            <h4 className="text-center mb-4">
                                Order Distribution
                            </h4>

                            <Pie data={pieData} />

                        </div>

                    </div>

                </div>

                {/* Add Product */}

                <div className="card shadow mt-5 p-4">

                    <h3 className="mb-4">
                        Add New Product
                    </h3>

                    <div className="row">



                        <div className="col-md-6">

                            <input
                                className="form-control mb-3"
                                placeholder="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className="col-md-6">

                            <input
                                type="number"
                                className="form-control mb-3"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                        </div>

                        <div className="col-md-6">

                            <select
                                className="form-select mb-3"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((cat) => (

                                    <option
                                        key={cat.id}
                                        value={cat.name}
                                    >
                                        {cat.name}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="col-md-6">

                            <input
                                type="file"
                                className="form-control mb-3"
                                accept="image/*"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />

                        </div>

                        <div className="col-md-6">

                            <input
                                type="number"
                                className="form-control mb-3"
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />

                        </div>

                        <div className="col-12">

                        <textarea
                            rows="3"
                            className="form-control mb-3"
                            placeholder="Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        </div>

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={addProduct}
                    >
                        Add Product
                    </button>

                </div>
                <div className="card shadow mt-5 p-4">

                    <h3 className="mb-4">
                        Manage Categories
                    </h3>

                    <div className="row">

                        <div className="col-md-5">

                            <input
                                className="form-control"
                                placeholder="Category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />

                        </div>

                        <div className="col-md-5">

                            <input
                                className="form-control"
                                placeholder="Description"
                                value={categoryDescription}
                                onChange={(e) => setCategoryDescription(e.target.value)}
                            />

                        </div>

                        <div className="col-md-2">

                            <button
                                className="btn btn-primary w-100"
                                onClick={addCategory}
                            >
                                Add
                            </button>

                        </div>

                    </div>

                    <table className="table table-hover mt-4">

                        <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>

                        </tr>

                        </thead>

                        <tbody>

                        {categories.map((cat) => (

                            <tr key={cat.id}>

                                <td>{cat.id}</td>

                                <td>{cat.name}</td>

                                <td>{cat.description}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => startCategoryEdit(cat)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCategory(cat.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

                {/* Search */}

                <div className="card shadow mt-5 p-4">

                    <h3 className="mb-3">
                        Search Products
                    </h3>

                    <input
                        className="form-control"
                        placeholder="Search by Product Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* ==================== Manage Products ==================== */}

                <div className="card shadow mt-5 p-4">

                    <h3 className="mb-4">
                        Manage Products
                    </h3>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                            <tr>

                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Action</th>
                                <th>Stock</th>

                            </tr>

                            </thead>

                            <tbody>

                            {filteredProducts.map((product) => (

                                <tr key={product.id}>

                                    <td>{product.id}</td>

                                    <td>

                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            width="70"
                                            height="70"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "8px"
                                            }}
                                        />

                                    </td>

                                    <td>

                                        <strong>
                                            {product.name}
                                        </strong>

                                    </td>

                                    <td>
                                        {product.category}
                                    </td>

                                    <td>

                                        ₹{product.price}

                                    </td>

                                    <td>

                                        ⭐ {product.rating
                                        ? Number(product.rating).toFixed(1)
                                        : "No Ratings"}

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => startEdit(product)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                    <td>{product.stock}</td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ==================== Edit Product ==================== */}

                {editingId && (

                    <div className="card shadow mt-5 p-4">

                        <h3 className="mb-4">
                            Edit Product
                        </h3>

                        <div className="row">

                            <div className="col-md-6">

                                <input
                                    className="form-control mb-3"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />

                            </div>

                            <div className="col-md-6">

                                <input
                                    type="number"
                                    className="form-control mb-3"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                />

                            </div>

                            <div className="col-md-6">

                                <input
                                    className="form-control mb-3"
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                />

                            </div>

                            <div className="col-md-6">

                                {editImageUrl && (
                                    <div className="mb-3 text-center">

                                        <img
                                            src={editImageUrl}
                                            alt="Current Product"
                                            width="150"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid #ccc"
                                            }}
                                        />

                                        <p className="text-muted mt-2">
                                            Current Image
                                        </p>

                                    </div>
                                )}

                                <input
                                    type="file"
                                    className="form-control mb-3"
                                    accept="image/*"
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                />




                            </div>

                            <div className="col-12">

            <textarea
                rows="4"
                className="form-control mb-3"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
            />

                                <div className="col-md-6">

                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        placeholder="Stock"
                                        value={editStock}
                                        onChange={(e) => setEditStock(e.target.value)}
                                    />

                                </div>

                            </div>

                        </div>

                        <button
                            className="btn btn-success"
                            onClick={updateProduct}
                        >
                            Save Changes
                        </button>

                        <button
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setEditingId(null);
                                setEditStock("");
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                )}

                {editingCategoryId && (

                    <div className="card shadow mt-5 p-4">

                        <h3>Edit Category</h3>

                        <input
                            className="form-control mb-3"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                        />

                        <textarea
                            className="form-control mb-3"
                            value={editCategoryDescription}
                            onChange={(e) => setEditCategoryDescription(e.target.value)}
                        />

                        <button
                            className="btn btn-success"
                            onClick={updateCategory}
                        >
                            Save Changes
                        </button>

                    </div>

                )}

                {/* ==================== Manage Orders ==================== */}

                <div className="card shadow mt-5 p-4">

                    <h3 className="mb-4">
                        Manage Orders
                    </h3>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                            <tr>

                                <th>ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                            </thead>

                            <tbody>

                            {orders.map((order) => (

                                <tr key={order.id}>

                                    <td>{order.id}</td>

                                    <td>{order.customerName}</td>

                                    <td>
                                        ₹{Number(order.totalAmount).toLocaleString()}
                                    </td>

                                    <td>

                                        {order.status === "PENDING" && (

                                            <span className="badge bg-warning text-dark">
                                PENDING
                            </span>

                                        )}

                                        {order.status === "SHIPPED" && (

                                            <span className="badge bg-info">
                                SHIPPED
                            </span>

                                        )}

                                        {order.status === "DELIVERED" && (

                                            <span className="badge bg-success">
                                DELIVERED
                            </span>

                                        )}

                                    </td>

                                    <td>

                                        {order.status === "PENDING" && (

                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "SHIPPED"
                                                    )
                                                }
                                            >
                                                Ship
                                            </button>

                                        )}

                                        {order.status === "SHIPPED" && (

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "DELIVERED"
                                                    )
                                                }
                                            >
                                                Deliver
                                            </button>

                                        )}

                                        {order.status === "DELIVERED" && (

                                            <span
                                                className="badge bg-success"
                                            >
                                Completed
                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>




                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}
export default Admin;

