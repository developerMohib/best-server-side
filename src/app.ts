import express, { Request, Response } from "express"
const app = express()

// parsers
app.use(express.json())

app.get('/', (req : Request , res : Response) => {
    res.send('Hello World Server Test joy bangla!')
})
app.post("/",async(req:Request, res:Response)=>{
    console.log(req.body)
    res.send('post data send')
})

export default app ;