import { writeFile, readFile } from 'node:fs/promises';
const target = process.argv[process.argv.length - 2];
const destination = process.argv[process.argv.length - 1];

try {
  const contents = await readFile(target);
  writeFile(destination, contents);
} catch (error) {
  console.log('Error:', error);
}
