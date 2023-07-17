const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Database configuration
const sequelize = new Sequelize('test', 'root', '2001', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the database: ', err);
  });

// Sign-up endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ email }, generateSecretKey(), { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error signing up: ', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });

// Generate a dynamic secret key
const generateSecretKey = () => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
  const expirationTime = 3600; // Set expiration time to 1 hour (in seconds)
  const futureTimestamp = currentTimestamp + expirationTime;
  const secretKey = `your_secret_key_${futureTimestamp}`;
  return secretKey;
};
