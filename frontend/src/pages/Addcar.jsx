import axios from 'axios';
import { useEffect, useState } from "react";
import { RotatingLines } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

const Addcar = () => {

    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [car, setCar] = useState({
        carname: "",
        price: "", 
        details: "",
        category: "", // New state variable for the product category
        tags: "" // New state variable for tags as a string
    });

    const { user, isLoading } = useAuth();

    useEffect(() => {
        // Pre-fill username and phone if available
        if (!isLoading && user) {
            setCar(prevState => ({
                ...prevState, 
            }));
        }
    }, [user, isLoading]);


    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (!user.isAdmin && !user.car_provider) {
        return <Navigate to="/" />
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        // If the input is an image, update the image state
        if (name === "image") {
            setImg(e.target.files[0]);
        } else {
            setCar({
                ...car,
                [name]: value
            });
        }
    };

    // Upload
    const uploadFile = async (type) => {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

        try {
            let cloudName = 'diyw5ilre';
            let resourceType = type === 'image' ? 'image' : 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log(secure_url);
            return secure_url;
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const imgUrl = await uploadFile('image');

            console.log(imgUrl);

            const formData = new FormData();
            formData.append("carname", car.carname);
            formData.append("price", car.price); 
            formData.append("details", car.details);
            formData.append("category", car.category); // Append category to formData
            formData.append("tags", car.tags); // Append tags as a string

            const response = await fetch('http://localhost:8080/api/data/addcar', {
                method: "POST",
                headers: {
                    "X-Additional-Info": imgUrl // Custom header with additional info
                },
                body: formData,
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success("Car registration successful");
                setCar({
                    carname: "",
                    price: "", 
                    details: "",
                    image: null, // Reset the image field after submission
                    category: "",
                    tags: ""
                });
                setLoading(false);
                if (user.isAdmin) {
                    navigate('/admin');
                    // window.location.reload();
                }
                else {
                    navigate('/userhome');
                    window.location.reload();
                }
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error("ERROR", error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img className="register_image" src="/images/addcar.png" alt="Register image" />
                            </div>

                            {/* Tackle registration form */}
                            <div className="registration-form" >
                                <h1 className="main-heading mb-3"> Add Your Course </h1>
                                <br />

                                <div className="form">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div>
                                            <label htmlFor="carname">Course Name</label>
                                            <input
                                                type="text"
                                                name="carname"
                                                placeholder="Course Name"
                                                id="carname"
                                                required
                                                autoComplete="off"
                                                value={car.carname}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="price">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                placeholder="Enter Price"
                                                id="price"
                                                required
                                                autoComplete="off"
                                                value={car.price}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="category">Category</label>
                                            <select
                                                className='category-select'
                                                name="category"
                                                id="category"
                                                value={car.category}
                                                onChange={handleInput}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Loans">Loans</option>     
                                                <option value="INVESTMENT">INVESTMENT</option>             
                                                <option value="Mahindra">Financial Advice</option>          
                                                <option value="INSURANCE">INSURANCE</option>          {/* Creta, Venue, i20, Verna */}
                                                <option value="TAX PLANNING">TAX PLANNING</option>             
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="details">Description</label>
                                            <textarea
                                                name="details"
                                                id="details"
                                                autoComplete="off"
                                                value={car.details}
                                                onChange={handleInput}
                                                required
                                                cols="30"
                                                rows="2"
                                            ></textarea>
                                        </div>

                                        {/* Add image input field */}
                                        <div>
                                            <label htmlFor="image">Course Image</label>
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                onChange={(e) => setImg(() => e.target.files[0])}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="tags">Tags</label>
                                            <input
                                                type="text"
                                                name="tags"
                                                placeholder="Enter tags separated by commas"
                                                id="tags"
                                                autoComplete="off"
                                                value={car.tags}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        {
                                            loading && (<RotatingLines
                                                visible={true}
                                                height="96"
                                                width="96"
                                                color="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />)

                                        }

                                        <button type="submit" className="btn btn-submit">
                                            Add Course
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Addcar;
