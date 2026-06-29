import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        toast.success("Logged Out Successfully");

        navigate("/");

        window.location.reload();
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    TrendMart
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <div className="navbar-nav ms-auto">

                        <Link className="nav-link" to="/">
                            Home
                        </Link>

                        <Link className="nav-link" to="/cart">
                            Cart
                        </Link>

                        <Link className="nav-link" to="/wishlist">
                            Wishlist
                        </Link>

                        <Link className="nav-link" to="/orders">
                            Orders
                        </Link>

                        {token ? (

                            <>
                                <Link
                                    className="nav-link text-warning"
                                    to="/profile"
                                >
                                    Welcome, {name}
                                </Link>

                                {role === "ADMIN" && (

                                    <Link className="nav-link" to="/admin">
                                        Admin
                                    </Link>

                                )}

                                <button
                                    className="btn btn-danger ms-3"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </>

                        ) : (

                            <>
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>

                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;