import AuthorizationRequest from '../models/AuthFormSchema.js';
import { validateAuthorizationRequest } from '../middleware/ValidationSchema.js'; 


//add authorization form
export const authform = async (req, res) => {
    const {value, error } = validateAuthorizationRequest(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });


    try {
        const newRequest = new AuthorizationRequest({
            ...value
        });
        
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get authorization form
export const authformlist = async (req, res) => {
    try {
        const requests = await AuthorizationRequest.find().populate('patientId');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
