import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoutes } from './modules/students/student.routes';
// parsers
app.use(express.json());
app.use(cors());

// routes here

// middle wares
const someData = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Yea habibi come to bd', req.hostname);
    next();
  } catch (error) {
    next(error);
  }
};

app.get('/test', someData, async (req: Request, res: Response) => {
  res.send('post data send practice');
});

// my routes
app.use('/api/v1', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Best Practice server!');
});

// global route error handler
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

// global error handler
type Err = string | number | undefined | null;
app.use((error: Err, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Server something went wrong',
    });
  }
  next();
});

export default app;
