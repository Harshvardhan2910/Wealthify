
const Car = require('../models/cars_model');


// ??AddCars Post
const addcar = async (req, res) => {
    try {
        // Destructure car details from request body
        const { carname, price, details, category, tags } = req.body;

        const imageUrl = req.headers['x-additional-info'];
        console.log(imageUrl);

        // const tag = JSON.parse(_tags);

        console.log(tags)

        // if (owner_phone.toString().length !== 10) {
        //     return res.status(400).json({ message: "owner_phone number must be exactly 10 digits" });
        // }

        // Set default image if not provided in request
        // let image = req.file ? req.file.filename : 'default_car_image.png';

        // Create new car instance
        const carCreated = await Car.create({ carname, price, details, image:imageUrl, category, tags });

        // Return success response with car details
        res.status(200).json({
            message: "Car added successful",
            car: carCreated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
}


const services = async(req, res) => {
    try{ 
        const response = await Car.find(); 
        if(!response) {
            res.status(404).json({message : "No service Found"})
            return;
        }  
        // console.log(response);
        // console.log(response);
        return res.status(200).json({msg : "service found", data : response})
    }
    catch(error){
        console.log(error.message); 
    }
}

module.exports = {
    services,
    addcar
};