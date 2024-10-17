import express from 'express';
import { authform, authformlist, } from '../controller/AuthFormController.js';
import { verifyToken } from '../middleware/auth.js';

const formrouter = express.Router();
formrouter.use(verifyToken)
formrouter.post('/authform',  authform);
formrouter.get('/authform',  authformlist);

export default formrouter;
