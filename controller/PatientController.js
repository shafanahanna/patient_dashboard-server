import { validatePatient } from "../middleware/ValidationSchema.js";
import Patient from "../models/PatientSchema.js";

//add a patient
export const addPatient = async (req, res) => {
  const { value, error } = validatePatient(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newPatient = new Patient({
      ...value,
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single patient by ID
export const getPatientById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a patient by ID
export const deletePatient = async (req, res) => {
    const { id } = req.params;
  
    try {
      const patient = await Patient.findByIdAndDelete(id);
      if (!patient) return res.status(404).json({ message: "Patient not found" });
  
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a patient by ID
  export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { value, error } = validatePatient(req.body); 
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(id, value, {
        new: true,
        runValidators: true, 
      });
  
      if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });
  
      res.status(200).json({data:updatedPatient});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
