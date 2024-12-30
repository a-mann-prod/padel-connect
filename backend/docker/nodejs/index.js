const express = require('express');
const app = express();

app.get('*', (req, res) => {
    console.log(`a-mann-prod://${req.url}`)
    res.redirect(`a-mann-prod://${req.url}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
