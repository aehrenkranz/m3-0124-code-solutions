import express from 'express';

import { errorMiddleware } from './error-middleware';
import pg from 'pg';
import { ClientError } from './client-error';
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false,
  },
});
const app = express();
app.use(express.json());
app.get('/api/grades', async (req, res, next) => {
  try {
    const query = `select * from "grades"`;
    const result = await db.query(query);
    const grades = result.rows;
    res.json(grades);
  } catch (err) {
    next(err);
  }
});

app.post('/api/grades', async (req, res, next) => {
  try {
    const content = req.body;
    if (
      Object.keys(content).length === 0 ||
      !content.name ||
      !content.score ||
      !content.course
    ) {
      throw new ClientError(400, 'Invalid grade format.');
    }
    if (content.score < 0 || content.score > 100) {
      throw new ClientError(400, 'Score must be between 0 and 100');
    }
    console.log(req.body);
    const query = `
    insert into "grades"("course","name","score")
    values ($1, $2, $3)
    returning *
    `;
    const values = [content.name, content.course, content.score];
    console.log(values);
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.put('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const gradeId = Number(req.params.gradeId);
    const content = req.body;
    if (Number.isNaN(gradeId) || !Number.isInteger(gradeId) || gradeId < 0) {
      throw new ClientError(400, 'Grade ID must be integer between 0 and 100');
    }
    if (
      Object.keys(content).length === 0 ||
      !content.name ||
      !content.score ||
      !content.course
    ) {
      throw new ClientError(400, 'Invalid grade format.');
    }
    const query = `
  update "grades"
  set "name"=$2,
  "course"=$3,
  "score"=$4
  where "gradeId"=$1
  returning *
  `;
    const values = [gradeId, content.name, content.course, content.score];
    const result = await db.query(query, values);
    if (!result.rows[0]) {
      throw new ClientError(404, 'Referenced Grade ID was not found.');
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const gradeId = Number(req.params.gradeId);
    if (Number.isNaN(gradeId) || !Number.isInteger(gradeId) || gradeId < 0) {
      throw new ClientError(400, 'Grade ID must be integer between 0 and 100');
    }
    const query = `
   delete from "grades"
   where "gradeId"=$1
   returning *
   `;
    const value = [gradeId];
    const result = await db.query(query, value);
    if (!result.rows[0]) {
      throw new ClientError(404, 'Referenced Grade ID was not found.');
    }
    res.status(204).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);
app.listen(8080);
