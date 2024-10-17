import mongoose from 'mongoose';

const authorizationRequestSchema = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
        treatment: { type: String, required: true },
        insurancePlan: { type: String, required: true }, // New field for insurance plan
        dateOfService: { type: Date, required: true }, // New field for date of service
        diagnosisCode: { type: String, required: true }, // New field for diagnosis code
        doctorNotes: { type: String }, // Optional field for doctor notes
        status: { type: String, enum: ['Pending', 'Approved', 'Denied'] },
    },
    { timestamps: true }
);

const AuthorizationRequest = mongoose.model('AuthorizationRequest', authorizationRequestSchema);
export default AuthorizationRequest;
