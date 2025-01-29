import 'dotenv/config';
import express from 'express';
import cors    from 'cors';
import router  from './routes/index.js';

const app      = express();
const { PORT } = process.env;

app.use(cors({
	// origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
app.use(express.json());
app.use('/v1', router)

app.listen(PORT, () => console.log(`backend runs on http://localhost:${PORT}`));
