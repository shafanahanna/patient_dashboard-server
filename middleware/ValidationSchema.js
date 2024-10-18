import Joi from 'joi';

// Patient Validation Schema
export const validatePatient = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        age: Joi.number().integer().min(0).required(),
        condition: Joi.string().allow("").max(200), 
        
        medications: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                prescribedDate: Joi.date().required(),
            })
        ).optional(),
        labResults: Joi.array().items(
            Joi.object({
                description: Joi.string().required(),
                date: Joi.date().required(),
            })
        ).optional(),
    });

    return schema.validate(data);
};


// Authorization Request Validation Schema
export const validateAuthorizationRequest = (data) => {
    const schema = Joi.object({
      patientId: Joi.string().required(),
      treatment: Joi.string().min(3).max(255).required(),
      insurancePlan: Joi.string().min(3).max(255).required(), 
      dateOfService: Joi.date().required(), 
      diagnosisCode: Joi.string().min(1).max(20).required(), 
      doctorNotes: Joi.string().allow(''), 
      status: Joi.string().valid('Pending', 'Approved', 'Denied'),
    });
  
    return schema.validate(data);
  };