const express = require('express');
const app = express();
const cors = require('cors');
const cleverbot = require('cleverbot-free');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/chat', async (req, res) => {
  const message = req.body.message;
  const response = await cleverbot(message);
  res.json({ response: response });
});

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
