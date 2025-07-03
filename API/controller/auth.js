const bcrypt = require('bcryptjs');
const { readUsersFromFile, writeUsersToFile } = require('../../utils/fileUtils');
const { generateToken } = require('../../utils/jwt');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const users = await readUsersFromFile();
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Generate new user ID (sequential)
    const newUserId = users.length > 0 ? users[users.length - 1].user_id + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      user_id: newUserId,
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);
    await writeUsersToFile(users);

    res.status(201).json({ message: 'User registered successfully.', user_id: newUserId });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user.', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await readUsersFromFile();
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken({ email: user.email, id: user.user_id });

    res.json({
      message: 'Login successful.',
      token,
      user_id: user.user_id
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed.', error: err.message });
  }
};
