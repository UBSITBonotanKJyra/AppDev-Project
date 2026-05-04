const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const breachedUsers = ['admin', 'test', 'root', 'user123', 'pwned'];

app.get('/check-breach/:username', (req, res) => {
  const username = req.params.username.toLowerCase();

  const isBreached = breachedUsers.includes(username);

  res.json({
    username,
    isBreached
  });
});

app.get('/', (req, res) => {
  res.send('SafeStash Server is running 💖');
});

app.listen(PORT, () => {
  console.log(`SafeStash server running on http://localhost:${PORT}`);
});