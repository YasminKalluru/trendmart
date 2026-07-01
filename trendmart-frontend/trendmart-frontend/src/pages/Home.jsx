import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>TrendMart Home</h1>

            <Link to="/login">
                <button>Login</button>
            </Link>

            <br /><br />

            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
}

export default Home;