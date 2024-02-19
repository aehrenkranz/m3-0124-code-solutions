import express from 'express';
type Grade = {
  id: number;
  name: string;
  course: string;
  score: number;
};

const grades: Record<number, Grade> = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95,
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100,
  },
  273: {
    id: 273,
    name: 'Håkon Wium Lie',
    course: 'CSS',
    score: 92,
  },
};
const app = express();
app.get('/api/grades', (req, res) => {
  const arr = [];
  for (const entry in grades) {
    arr.push(grades[entry]);
  }
  res.json(arr);
});
app.delete('/api/grades/:id', (req, res) => {
  const id = Number(req.params.id);
  if (grades?.[id]) {
    delete grades[id];
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
app.listen(8080);
