const express = require('express');
const app = express();

const cors = require('cors');

const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
