const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
// require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server OK');
});

app.post('/send', (req, res) => {

  const output = `
    <h2>Detalhes do contato:</h2>
    <ul>  
      <li>Nome: </li>
      <li>Telefone: </li>
      <li>Email: </li>
   </ul>
   <h3>Assunto: </h3>
    <p></p>
   `;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dauglsc@gmail.com',
      pass: 'macrex20'
    }
  });
  var mailOptions = {
    from: '"Teste" dauglsc@gmail.com',
    to: "dauglsc@gmail.com",
    subject: "Teste",
    text: "Teste",
    html: output,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  });

})

app.listen(3008, () => console.log('Servidor Iniciado...'));