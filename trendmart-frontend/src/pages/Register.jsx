import axios from "axios";
import { useState } from "react";
function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8081/api/users/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Registration Successful");
            console.log(response.data);

        } catch (error) {

            alert("Registration Failed");
            console.log(error);

        }
    };
    return (
        <div>
            <h1>Register</h1>

            <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default Register;