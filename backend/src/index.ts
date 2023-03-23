import express from 'express';
import { example } from './routes/example';
 
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port = 3000;
const apiRoute = "/api/v1"
 
// middlewares
app.use(express.json())

// routes
app.use(`${apiRoute}/example`, example)

// Server setup
app.listen(port, () => {
    console.log(`REST API running on http://localhost:${port}/${apiRoute}`);
});
