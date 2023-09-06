const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const index = require('./routers/index');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(index);

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`)
})

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })