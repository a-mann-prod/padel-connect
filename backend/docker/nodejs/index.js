const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const htmlPath = path.join(__dirname, 'public', 'index.html');

app.get('*', (req, res) => {
    const redirectUrl = `a-mann-prod.padel-connect://${req.url}`

    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading HTML file:', err);
          return res.status(500).send('Internal Server Error');
        }
    
        const htmlWithRedirect = data.replace('{{REDIRECT_URL}}', redirectUrl);
        res.send(htmlWithRedirect);
      });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
