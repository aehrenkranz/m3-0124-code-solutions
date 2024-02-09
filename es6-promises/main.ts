import { takeAChance } from './take-a-chance.js';
takeAChance('alex')
  .then((v) => {
    console.log(v);
  })
  .catch((v) => {
    console.log(v);
  });
