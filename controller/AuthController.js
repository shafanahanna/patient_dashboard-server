import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD; 

        if (username !== adminUsername) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (password !== adminPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: adminUsername }, process.env.JWT_SECRET, );

        res.status(200).json({ status:"success",message:"logged In",data:token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
