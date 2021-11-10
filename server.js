const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '', 'src/')));
app.use('/profile', express.static(path.resolve(__dirname, '', 'src/')));
app.use('/login', express.static(path.resolve(__dirname, '', 'src/')));
app.use('/signup', express.static(path.resolve(__dirname, '', 'src/')));

app.all('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '', 'src/'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
