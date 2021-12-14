//imports
const express = require('express');
const cors = require('cors');

//internal
const routes = require('./routes')

//misc
const app = express();
const port = process.env.PORT || 4000

//middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/api/auth',routes.auth);
app.use('/api/users',routes.users);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
