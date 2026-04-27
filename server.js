const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🧠 Fake "breached database"
const breachedUsers = ['admin', 'test', 'root', 'user123', 'pwned'];

// 🔐 Check breach endpoint
app.get('/check-breach/:username', (req, res) => {
  const username = req.params.username.toLowerCase();

  const isBreached = breachedUsers.includes(username);

  res.json({
    username,
    isBreached
  });
});

// 🧪 Optional: health check
app.get('/', (req, res) => {
  res.send('SafeStash Server is running 💖');
});

// 🚀 start server
app.listen(PORT, () => {
  console.log(`SafeStash server running on http://localhost:${PORT}`);
});