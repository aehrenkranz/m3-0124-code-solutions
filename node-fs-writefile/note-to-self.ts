import { writeFile } from 'node:fs/promises';

const userInput = process.argv[process.argv.length - 1];
try {
  await writeFile('note.txt', userInput + '\n');
} catch (error) {
  console.log('Error:', error);
}
