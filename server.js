// const express = require('express');
// const path = require('path');
//
// const app = express();
//
// app.use(express.static('src/'));
// app.use('/profile', express.static(path.resolve(__dirname, '', 'src/')));
// app.use('/login', express.static(path.resolve(__dirname, '', 'src/')));
// app.use('/signup', express.static(path.resolve(__dirname, '', 'src/')));
// app.use('/restaurants/1', express.static(path.resolve(__dirname, '', 'src/')));
//
// app.all('*', (request, response) => {
//   response.sendFile(path.resolve(__dirname, '', 'src/')); // TODO: придумать что-то с отдачей статики, поднять nginx
// });
//
// const port = process.env.PORT || 3000;
//
// app.listen(port, () => {
//   console.log(`Server listening port ${port}`);
// });

'use strict';

// const express = require('express');
// const path = require('path');
// const app = express();
// app.use(express.static(path.resolve(__dirname, './dist')));
// app.get('sw.js', function (req, res) {
//   res.sendFile(path.resolve(__dirname, './dist/sw.js'));
// })
//
// app.all('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './dist'));
// });
//
// const port = process.env.PORT || 3000;
//
// app.listen(port, function () {
//   console.log(`Server listening port ${port}`);
// });

'use strict';

const express = require('express');
const body = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(body.json());

app.get('serviceWorker.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'serviceWorker.js'));
})

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});


//
// const statice = require('node-static');
// const http = require('http');
//
// const file = new(statice.Server)('./dist');
//
// http.createServer(function (req, res) {
//   file.serve(req, res);
// }).listen(3000);