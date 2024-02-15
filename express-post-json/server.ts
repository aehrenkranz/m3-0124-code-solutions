import express from 'express';
const app = express();

let nextId = 1;

let grades = {};
type Grade = {
  id: number;
  name: string;
  course: string;
  score: number;
};

app.use(express.json());
app.post('/api/grades', (req, res, next) => {
  grades[nextId]={id:nextId,...req.body}
  res.status(201).send(req.body);
  nextId++;
  next();
});

app.get('/api/grades', (req, res) => {
  res.json(grades);
});

app.listen(8080);
