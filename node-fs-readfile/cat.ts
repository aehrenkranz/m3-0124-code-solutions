import { readFile } from 'node:fs/promises';

async function getFileContents() {
  const files = process.argv.slice(2);
  const promises=  files.map(async (value)=>{
    try {
      const result = await readFile(value, { encoding: 'utf8' });
      return result
    } catch (error) {
      console.log('Error:', error);
    }
  })
 const result=(await Promise.all(promises)).join("\n")
 console.log(result)
}
getFileContents();
