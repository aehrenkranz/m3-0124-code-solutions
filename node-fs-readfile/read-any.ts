import { readFile } from 'node:fs/promises';

async function getFileContents(){
const path = process.argv[process.argv.length - 1];
   try {
     const result = await readFile(path, { encoding: 'utf8' });
     console.log(result);
   } catch (error) {
     console.log('Error:', error);
   }
}
getFileContents()
