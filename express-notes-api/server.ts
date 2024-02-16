import express from 'express';

import { writeFile, readFile } from 'node:fs/promises';

const app = express();
app.use(express.json());
type Note = {
  id: number;
  content: string;
};
type Data = {
  nextId: number;
  notes: Record<string, Note>;
};

async function readData(): Promise<Data> {
  const data = await readFile('./data.json');
  return JSON.parse(data.toString());
}

async function writeData(data: Data): Promise<void> {
  await writeFile('./data.json', JSON.stringify(data, null, 2));
}

app.get('/api/notes/', async (req, res, next) => {
  try {
    const entries = await readData();
    const arrayEntries: Note[] = [];
    for (const entry in entries.notes) {
      arrayEntries.push(entries.notes[entry]);
    }
    res.json(arrayEntries);
  } catch (err) {
    next(err);
  }
});

app.get('/api/notes/:id', async (req, res, next) => {
  try {
    const entries = await readData();
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'Error: ID must be a positive integer.' });
    }
    if (!entries.notes[id]) {
      res.status(400).json({ error: `Error: Cannot find note with ID ${id}.` });
    }
    res.json(entries.notes[id]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/notes', async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ error: 'Error: Content is a required field.' });
    }
    const data = await readData();
    const note = {
      id: data.nextId,
      content,
    };
    data.notes[note.id] = note;
    data.nextId++;
    await writeData(data);
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error has occurred.' });
    next(err);
  }
});

app.delete('/api/notes/:id', async (req, res, next) => {
  try {
    const entries = await readData();
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'Error: ID must be a positive integer.' });
    }
    if (!entries.notes[id]) {
      res.status(400).json({ error: `Error: Cannot find note with ID ${id}.` });
    }
    delete entries.notes[id];
    await writeData(entries);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error has occurred.' });
    next(err);
  }
});

app.put('/api/notes/:id', async (req, res) => {
  try {
    const { content } = req.body;
    const entries = await readData();
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'Error: ID must be a positive integer.' });
    }
    if (!content) {
      res.status(400).json({ error: 'Error: Content is a required field.' });
    }
    if (!entries.notes[id]) {
      res.status(404).json({ error: `Error: Cannot find note with ID ${id}.` });
    }
    const note = {
      id,
      content,
    };
    entries.notes[id] = note;
    await writeData(entries);
    res.status(200).json(entries.notes[id]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error has occurred.' });
  }
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
