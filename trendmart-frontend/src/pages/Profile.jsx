import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Profile() {

    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow p-5">

                    <h1>My Profile</h1>

                    <hr />

                    <h4>
                        Name : {name}
                    </h4>

                    <h4>
                        Role : {role}
                    </h4>

                </div>

            </div>

            <Footer />

        </>
    );

}

export default Profile;