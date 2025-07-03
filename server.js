const express = require('express');
const authRoutes = require('./API/routes/auth');
const bookRoutes = require('./API/routes/book');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '❌ Something went wrong' });
});

if (require.main === module) {
  app.listen(3000, () => console.log(' Server running on port 3000'));
}

module.exports = app; // Exported for testing
