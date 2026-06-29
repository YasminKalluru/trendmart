import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function ProductDetails() {

    const { id } = useParams();

    const [reviews, setReviews] = useState([]);

    const [comment, setComment] = useState("");

    const [rating, setRating] = useState("");

    const userName = localStorage.getItem("name");

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        fetchReviews();

    }, []);

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : 0;

    const fetchReviews = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8081/api/reviews/${id}`
            );

            setReviews(response.data);
        }

        catch (error) {
            console.log(error);
            toast.error("Failed to submit review");
        }
    };

    const addReview = async () => {

        try {
            if (!rating || !comment.trim()) {

                toast.warning("Please enter rating and review.");

                return;

            }

            await axios.post(
                "http://localhost:8081/api/reviews/add",
                {

                userId,
                    productId: id,
                userName,
                rating: Number(rating),
                comment

                }
            );

            setComment("");
            setRating("");

            fetchReviews();

        } catch (error) {
            console.log(error);
            toast.error("Failed to load reviews");
        }

    };

    const deleteReview = async (id) => {

        if (!window.confirm("Delete this review?")) return;

        try {

            await axios.delete(
                `http://localhost:8081/api/reviews/delete/${id}`
            );

            fetchReviews();

        } catch (error) {

            console.log(error);
            toast.error("Failed to delete review");
        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Reviews</h2>

                <div className="card shadow p-3 mb-4 text-center">

                    <h3>
                        ⭐ {averageRating} / 5
                    </h3>

                    <h5>
                        {reviews.length} Customer Reviews
                    </h5>

                </div>

                <div className="card shadow p-4 mb-4">

                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="form-control mb-3"
                        placeholder="Rating (1-5)"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Write your review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={addReview}
                    >
                        Submit Review
                    </button>

                </div>

                {reviews.map((review) => (

                    <div
                        className="card shadow mb-3 p-3 text-center"
                        key={review.id}
                    >

                        <h4>{review.userName}</h4>

                        <h5>
                            ⭐ {review.rating}
                        </h5>

                        <p>{review.comment}</p>

                        {Number(userId) === review.userId && (

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteReview(review.id)}
                            >
                                Delete Review
                            </button>

                        )}

                    </div>

                ))}



            </div>

            <Footer />

        </>
    );

}

export default ProductDetails;