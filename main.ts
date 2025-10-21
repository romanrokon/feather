import getFeather from './src/index.ts';

const fetch = getFeather({
   baseUrl: 'https://jsonplaceholder.typicode.com',
});

async function main() {
   const { data, error } = await fetch('/posts/1');

   console.log('data', data);
   console.log('error', error);
}

if (import.meta.main) {
   main();
}
