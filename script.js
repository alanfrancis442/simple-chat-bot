const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

require('dotenv').config()

app.use(cors())

app.get('/random',(req,res)=>{
    // res.send('hello from express!!')
    // console.log(`api_key=${process.env.API_KEY}`)
    res.json({data:Math.random()*10})
})

app.get('/chat/:text',(req,res)=>{
    console.log('request trigered')
    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.API_KEY}`
    const text = req.params.text
    // let payload = {
    //     "prompt": {"messages": [{"content":text}]},
    //     "temperature": 0.1, 
    //     "candidateCount": 1}
    let payload = {
        "contents":[{
            "parts":[
                {"text": text}
            ]
        }],
        "generationConfig": {
            "stopSequences": [
                "Title"
            ],
            "temperature": 1.0,
            "maxOutputTokens": 800,
            "topP": 0.8,
            "topK": 10
        }}
    
    const get_data = async ()=>{
        const response = await fetch(url,{
            headers : {
                'Content-Type': 'application/json',
            },
            method:'POST',
            body : JSON.stringify(payload)
        })
        const api_data = await response.json()
        console.log("api data",api_data)
        return await api_data;
    }
    get_data()
    .then(e=>{
        // let response = res.json(e)
        console.log('response',e.candidates[0].content.parts[0].text);
        // console.log('request recived',response)
    })
    // console.log(typeof(get_data))
})

app.listen(port,()=>{
    console.log(`The server is up and running at the pot.no:${port}`)
})