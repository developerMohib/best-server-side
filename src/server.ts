import app from "./app"
const port = 3000;

async function bootstrap() {
    app.listen(port, () => {
        console.log("database connect is not yet!")
        console.log(`Example app listening on port ${port}`)
    })
}
bootstrap()