import {HttpCall} from '@pedro.gilmora/http-call';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `<img src="src/assets/code.png" style="float: left; margin-right: 8px"/>
  <b>HTTP-Call Project</b>
`;

let caller = HttpCall.create({baseUrl: 'https://my-json-server.typicode.com'});

const
    paramRestProp = 'posts',
    $endpointBase = caller.typicode.demo[paramRestProp];

type Post = {id?: number, title: string};
type User = {id?: number, name: string};
type UserPost = Post & {user: User};

const user = {id:0, name: 'admin'} as User;

(async () =>{
  let post = await $endpointBase[1].get(undefined, {
    onSend({url}){
      app.innerHTML += `<hr/>
    <pre><b>GET:</b> <code>${url}</code></pre>
  `
    },
    transform(post: Post){
      return Object.assign(post, {user}) as UserPost;
    }
  });
  app.innerHTML += `
  <pre><b>Result:</b> <code>${JSON.stringify(post, null, 2)}</code></pre>
`;
  const newPost = {title: 'New title'};
  post = await $endpointBase.post(newPost, {
    onSend({url}){
      app.innerHTML += `<hr/>
  <pre><b>POST:</b> <code>${url}</code>

<b>Payload:</b> ${JSON.stringify(newPost, null, 2)}
</pre>
`
    },
    transform(post: Post){
      return Object.assign(post, {user}) as UserPost;
    }
  });
  app.innerHTML += `<pre><b>Result:</b><code>${JSON.stringify(post, null, 2)}</code></pre>
`;
})().then()
