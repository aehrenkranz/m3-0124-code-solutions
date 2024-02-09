import { writeFile, readFile } from 'node:fs/promises';
type Data = {
  nextId: number;
  notes: Record<string, string>;
};
const desiredFunction = process.argv[2];

const desiredEntry = process.argv[4];
const notesEntered = process.argv[3];

if (desiredFunction === 'read') {
  const entries = await read();
  for (const entryNumber in entries.notes) {
    console.log(`${entryNumber}: ${entries.notes[entryNumber]}`);
  }
}
if (desiredFunction === 'create') {
  create(notesEntered);
}
if (desiredFunction === 'update') {
  update(desiredEntry, notesEntered);
}

async function read(): Promise<Data> {
  let results;
  try {
    const resultsJSON = await readFile('data.json', 'utf-8');
    results = JSON.parse(resultsJSON);
  } catch (error) {
    console.log(error);
  }
  return results;
}

async function create(notes: string): Promise<void> {
  let results;
  try {
    const data = await read();
    data.notes[data.nextId] = notes;
    data.nextId++;
    const newData = JSON.stringify(data, null, 2);
    results = await writeFile('data.json', newData);
  } catch (error) {
    console.log(error);
  }
  return results;
}

async function update(entry: string, notes: string): Promise<void> {
  let results;
  try {
    const data = await read();
    if (data.notes[entry]) {
      data.notes[entry] = notes;
      const newData = JSON.stringify(data, null, 2);
      results = await writeFile('data.json', newData);
    } else {
      throw new Error('Entry does not exist');
    }
  } catch (error) {
    console.log(error);
  }
  return results;
}
