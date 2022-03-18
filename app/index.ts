import express from 'express';
import config from 'config';
import { DeveloperRouter } from './routes/developer.route';
import { ProjectRouter } from './routes/project.route';

const PORT = config.get('port') as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/project', ProjectRouter);
app.use('/developer', DeveloperRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`);
});