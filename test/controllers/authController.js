// // controllers/authController.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const { JWT_SECRET } = process.env;

// exports.signup = async (req, res) => {
//     const { email, password, role } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ email, password: hashedPassword, role });
//         await user.save();
//         res.status(201).json({ message: 'User created' });
//     } catch (err) {
//         res.status(400).json({ message: 'Error creating user' });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password)))
//             return res.status(401).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: 'Error logging in' });
//     }
// };
