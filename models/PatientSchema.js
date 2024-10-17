// src/models/PatientSchema.js

import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    condition: {
        type: String,
        default: '',
        max: 200,
    },
    
    medications: [{
        name: {
            type: String,
            required: true,
        },
        prescribedDate: {
            type: Date,
            required: true,
        },
    }],
    labResults: [{
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    }],
}, { timestamps: true });

const Patient = mongoose.model('Patient', PatientSchema); // Ensure this is correct
export default Patient; // Export the model
