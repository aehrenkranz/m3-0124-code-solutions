import express from 'express';

express();
const app = express().use((req, res) => {
  console.log(req.method);
  res.send('test');
});

app.listen(8080, () => {
  console.log(app.listen());
});
