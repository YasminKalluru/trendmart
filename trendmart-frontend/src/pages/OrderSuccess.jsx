import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function OrderSuccess() {

    return (
        <>
            <Navbar />

            <div className="container text-center mt-5">

                <div className="card shadow p-5">

                    <h1 className="text-success">
                        ✓ Order Placed Successfully
                    </h1>

                    <p className="mt-3">
                        Thank you for shopping with TrendMart!
                    </p>

                    <Link to="/">
                        <button className="btn btn-primary mt-3">
                            Continue Shopping
                        </button>
                    </Link>

                </div>

            </div>
            <Footer />
        </>
    );
}

export default OrderSuccess;