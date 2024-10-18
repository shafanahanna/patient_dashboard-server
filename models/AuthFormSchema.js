import mongoose from 'mongoose';

const authorizationRequestSchema = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
        treatment: { type: String, required: true },
        insurancePlan: { type: String, required: true },
        dateOfService: { type: Date, required: true }, 
        diagnosisCode: { type: String, required: true },
        doctorNotes: { type: String }, 
        status: { type: String, enum: ['Pending', 'Approved', 'Denied'] },
    },
    { timestamps: true }
);

const AuthorizationRequest = mongoose.model('AuthorizationRequest', authorizationRequestSchema);
export default AuthorizationRequest;
