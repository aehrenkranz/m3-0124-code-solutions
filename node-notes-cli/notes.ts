import { writeFile, readFile } from 'node:fs/promises';
type Data = {
  nextId: number;
  notes: Record<string, string>;
};
const desiredFunction = process.argv[2];

if (desiredFunction === 'read') {
  const entries = await read();
  for (const entryNumber in entries.notes) {
    console.log(`${entryNumber}: ${entries.notes[entryNumber]}`);
  }
}
if (desiredFunction === 'create') {
  create();
}
if (desiredFunction === 'update') {
  update();
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

async function create(): Promise<void> {
  let results;
  try {
    const data = await read();
    data.notes[data.nextId] = process.argv[3];
    data.nextId++;
    const newData = JSON.stringify(data, null, 2);
    results = await writeFile('data.json', newData);
  } catch (error) {
    console.log(error);
  }
  return results;
}

async function update(): Promise<void> {
  let results;
  try {
    const data = await read();
    if (data.notes[process.argv[3]]) {
      data.notes[process.argv[3]] = process.argv[4];
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
