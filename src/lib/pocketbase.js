import PocketBase from 'pocketbase';

console.log(import.meta.env.VITE_PB_URL)
const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export default pb;
