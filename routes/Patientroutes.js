// routes/patientRoutes.js
import express from "express";
import { getPatients, addPatient, getPatientById, deletePatient } from "../controller/PatientController.js";
import { verifyToken } from "../middleware/auth.js";

const patientrouter = express.Router();
patientrouter.use(verifyToken)
patientrouter.post("/patients",  addPatient);
patientrouter.get("/patients", getPatients);
patientrouter.get("/patients/:id",getPatientById)
patientrouter.delete("/patients/:id",deletePatient)


export default patientrouter;
