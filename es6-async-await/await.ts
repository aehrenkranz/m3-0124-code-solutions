import { read } from './read.js';

// Keep track of app load time so each log message can be timed.
// Log messages should all be approximately 1 second apart.
const startTime = Date.now();
const elapsed = (): string =>
  `${Math.round((Date.now() - startTime) / 1000)}s -`;

async function readOnce(): Promise<void> {
  const result = await read('foo/bar.html');
  console.log(elapsed(), 'readOnce:', result);
}

async function readSeveral(): Promise<void> {
  const result1 = await read('foo1/bar.html');
  console.log(elapsed(), 'readSeveral1:', result1);

  const result2 = await read('foo2/bar.html');
  console.log(elapsed(), 'readSeveral2:', result2);

  const result3 = await read('foo3/bar.html');
  console.log(elapsed(), 'readSeveral3:', result3);
}

async function readChained(): Promise<void> {
  const result = await read('foo-chain/bar.html');
  console.log(elapsed(), 'readChained1:', result);
  const subResult1 = await read(result);
  console.log(elapsed(), 'readChained2:', subResult1);
  const subResult2 = await read(subResult1);
  console.log(elapsed(), 'readChained3:', subResult2);
}

await readOnce();
await readSeveral();
await readChained();
