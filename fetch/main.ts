async function fetchPokemon() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/61');
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    const polywhirl = await res.json();
    console.log(polywhirl);
  } catch (err) {
    console.error('fetch failed!', err);
  }
}

fetchPokemon();
