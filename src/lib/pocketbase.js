import PocketBase from 'pocketbase';

console.log("PB_URL", import.meta.env.VITE_PB_URL)
const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export default pb;
