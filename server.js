'use strict';

const express = require('express');
const body = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(body.json());
app.get('serviceWorker.ts', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'serviceWorker.ts'));
})

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
