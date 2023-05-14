import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration, OpenAIApi} from 'openai'

const app = express()

env.config()

app.use(cors({
    origin: '*',
}))
app.use(bodyParser.json())


// Configure open api
const configuration = new Configuration({
    apiKey: process.env.API_KEY // VISIT .env AND MAKE CHANGES
})
const openai = new OpenAIApi(configuration)


// listeninng
app.listen("3080", ()=>console.log("listening on port 3080"))



// dummy route to test
app.get("/", (req, res) => {
    res.send("Hello World!")
})


//post route for making requests
app.post('/', async (req, res)=>{
    const {message} = req.body
    const {hapi} = req.body
    // console.log("message")
    // console.log({message})
    // console.log("hapi")
    // console.log({hapi})

    //convert json naming to openai naming
    let curMsg = [{role: "system", content: "A curious therapist that asks questions"}]
    
    curMsg=curMsg.concat({role: "user", content: hapi.slice(-1)[0].message})

    try{
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: curMsg,
          });
        res.json({message: response.data.choices[0].message.content})

        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: `${message}`,
        //     max_tokens: 100,
        //     temperature: .5
        // })
        // res.json({message: response.data.choices[0].text})

    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})


// import express from 'express'
// import cors from 'cors'
// import bodyParser from 'body-parser'
// import env from 'dotenv'
// import {Configuration, OpenAIApi} from 'openai'

// const app = express()

// env.config()

// app.use(cors())
// app.use(bodyParser.json())


// // Configure open api
// const configuration = new Configuration({
//     apiKey: process.env.API_KEY // VISIT .env AND MAKE CHANGES
// })
// const openai = new OpenAIApi(configuration)


// // listeninng
// app.listen("3080", ()=>console.log("listening on port 3080"))


// // dummy route to test
// app.get("/", (req, res) => {
//     res.send("Hello World!")
// })


// //post route for making requests
// app.post('/', async (req, res)=>{
//     const {messagess} = req.body
//     console.log("prompt")
//     console.log({messagess})
//     console.log(typeof(messagess))
//     try{
//         let curMsg = [{role: "system", content: "A curious therapist that asks questions"}]
//         console.log("prompt")
//         console.log({prompt})
//         curMsg=curMsg.concat(prompt)
//         console.log("curMsg")
//         console.log(curMsg)
//         const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: curMsg,
//         });
//         res.json({message: response.data.choices[0].message.content})

//     }catch(e){
//         console.log(e)
//         res.send(e).status(400)
//     }
// })
