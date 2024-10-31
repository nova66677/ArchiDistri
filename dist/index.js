const express = require('express');
const getSystemInformation = require('./sysInfo');

const app = express();
const port = 3000;

app.get('/systeminfo', async (req, res) => {
  try {
    const systemInfo = await getSystemInformation();
    res.json(systemInfo); // Renvoie les informations système en format JSON
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ error: 'System information not available' }); // Envoie une erreur 404
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
