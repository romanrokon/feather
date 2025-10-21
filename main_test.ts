import { assertEquals } from '@std/assert';
import getFeather from './src/index.ts';

const fetch = getFeather({
   baseUrl: 'https://jsonplaceholder.typicode.com',
});

const post = {
   userId: 1,
   id: 1,
   title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
   body:
      'quia et suscipit\n' +
      'suscipit recusandae consequuntur expedita et cum\n' +
      'reprehenderit molestiae ut ut quas totam\n' +
      'nostrum rerum est autem sunt rem eveniet architecto',
};

Deno.test(async function fetchPost() {
   const { data, error } = await fetch<typeof post>('/posts/1');

   assertEquals(data, post);
   assertEquals(error, undefined);
});
