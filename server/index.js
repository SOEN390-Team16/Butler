const express = require('express');
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())





app.listen(8801, () => {
    try{
        console.log('Succesfully connected!')
    }catch(err){
        console.error(err)
    }
})