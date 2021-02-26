import  { app }  from './app';

const port = 3333;

app.listen({ port }, () =>
  console.info('Server online :', `http://localhost:${port}/`),
);