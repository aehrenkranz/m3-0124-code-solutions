import {readFile} from 'node:fs/promises'

async function readContents(){
  try{
    const result=await readFile('dijkstra.txt',{encoding:'utf8'})
    console.log(result)
  }
  catch(error){
    console.log('Error:',error)
  }
}
readContents()
