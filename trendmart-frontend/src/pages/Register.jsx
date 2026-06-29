import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8081/api/users/register",
                {
                    name,
                    email,
                    password
                }
            );

            toast.success("Registration Successful");
            console.log(response.data);

        } catch (error) {

            toast.error("Registration Failed");
            console.log(error);

        }
    };
    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h1>Register</h1>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

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
                    className="btn btn-success"
                    onClick={handleRegister}
                >
                    Register
                </button>

            </div>
            <Footer />
        </>
    );
}

export default Register;