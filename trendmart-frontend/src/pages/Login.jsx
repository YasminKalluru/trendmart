import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!password.trim()) {
            toast.error("Password is required");
            return;
        }
        try {

            const response = await axios.post(
                "http://localhost:8081/api/users/login",
                {
                    email,
                    password
                }
            );

            // Save JWT token and user details
            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "name",
                response.data.name
            );

            localStorage.setItem(
                "userId",
                response.data.userId
            );

            toast.success ("Login Successful");

            // Redirect according to role
            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else {

                navigate("/");

            }

        } catch (error) {

            toast.error("Login Failed");
            console.log(error);

        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h1>Login</h1>

                <div className="mb-3">

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

            <Footer />

        </>
    );
}

export default Login;