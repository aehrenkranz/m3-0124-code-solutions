import { read } from './read.js';

// Keep track of app load time so each log message can be timed.
// Log messages should all be approximately 1 second apart.
const startTime = Date.now();
const elapsed = (): string =>
  `${Math.round((Date.now() - startTime) / 1000)}s -`;

async function throwOnce(): Promise<void> {
  try {
    const result = await read('foo', false);
    console.log(elapsed(), 'throwOnce:', result);
  } catch (error) {
    console.log(elapsed(), 'throwOnce Error:', error);
  }
}

async function throwSeveral(): Promise<void> {
  try {
    const result = await read('foo1', false);
    console.log(elapsed(), 'throwSeveral1:', result);
    const result2 = await read('foo2', false);
    console.log(elapsed(), 'throwSeveral2:', result2);
    const result3 = await read('foo3', false);
    console.log(elapsed(), 'throwSeveral3:', result3);
  } catch (error) {
    console.log(elapsed(), 'throwSeveral Error:', error);
  }
}

async function throwChained(): Promise<void> {
  try {
    const result = await read('foo-chain', true);
    console.log(elapsed(), 'throwChained1:', result);
    try {
      const subResult1 = await read(result, false);
      console.log(elapsed(), 'throwChained2:', subResult1);
      try {
        const subResult2 = await read(subResult1, false);
        console.log(elapsed(), 'throwChained3:', subResult2);
      } catch (error) {
        console.log(elapsed(), 'throwChained Error:', error);
      }
    } catch (error) {
      console.log(elapsed(), 'throwChained Error:', error);
    }
  } catch (error) {
    console.log(elapsed(), 'throwChained Error:', error);
  }
}

await throwOnce();
await throwSeveral();
await throwChained();
