import { read } from './read.js';

// Keep track of app load time so each log message can be timed.
// Log messages should all be approximately 1 second apart.
const startTime = Date.now();
const elapsed = (): string =>
  `${Math.round((Date.now() - startTime) / 1000)}s -`;

async function throwOnce(): Promise<void> {
  const result = await read('foo', true);
  console.log(elapsed(), 'throwOnce:', result);

}

async function throwSeveral(): Promise<void> {
  const result = await read('foo1', false);
  console.log(elapsed(), 'throwSeveral1:', result);
  const result2 = await read('foo2', false);
  console.log(elapsed(), 'throwSeveral2:', result2);
  const result3 = await read('foo3', false);
  console.log(elapsed(), 'throwSeveral3:', result3);
}

async function throwChained(): Promise<void> {
  const result = await read('foo-chain', true);
  console.log(elapsed(), 'throwChained1:', result);

  const subResult1 = await read(result, false);
  console.log(elapsed(), 'throwChained2:', subResult1);

  const subResult2 = await read(subResult1, false);
  console.log(elapsed(), 'throwChained3:', subResult2);
}

async function throwAll():Promise<void> {
  try {
    await throwOnce();
    await throwSeveral();
    await throwChained();
  } catch (error) {
    console.log(elapsed(), 'throwAll Error:', error);
  }
}
throwAll();
