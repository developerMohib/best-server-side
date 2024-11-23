import express, { Application, NextFunction, Request, Response } from "express"
const app: Application = express()
import cors from "cors"
// parsers
app.use(express.json())
app.use(cors())

// middle wares
const someData = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("from middle war", req.hostname);
        next()
    } catch (error) {
        next(error)
    }
}


app.get('/', (req: Request, res: Response) => {
    res.send('Best Practice server!')
})
app.get("/test", someData, async (req: Request, res: Response) => {
    res.send('post data send')
})

// global route error handler
app.all('*', (req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: "Route not found"
    })
})


// global error handler
type Err = string | number | undefined | null;
app.use((error: Err, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
})

export default app;