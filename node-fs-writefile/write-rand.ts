import { writeFile } from 'node:fs/promises';

const newData = Math.random().toString();

try {
  await writeFile('random.txt', newData + '\n');
} catch (error) {
  console.log('Error:', error);
}
