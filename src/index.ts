import express from 'express';
const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
  console.log("Start on port 3000.");
});

import { Link } from "./db/link";
import { User } from "./db/user";

const link = new Link();
const user = new User();


//一覧取得
app.get('/links', async (req: express.Request, res: express.Response) => {
  const list = await link.getList();

  res.send(JSON.stringify(list));
});

//詳細取得
app.get('/links/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const item = await link.find(Number(id));
  if (!item) {
    res.status(404).send(JSON.stringify({ error: 'not found.' }));
    return;
  }

  res.send(JSON.stringify(item));
});

//登録
app.post('/links', async (req: express.Request, res: express.Response) => {
  const { description, url } = req.body;
  if (!description || !url) {
    res.status(400).send(JSON.stringify({ error: 'description or url is empty.' }));
    return;
  }

  await link.create(description, url);

  res.send(JSON.stringify({}));
});

//更新
app.put('/links/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { description, url } = req.body;
  if (!description || !url) {
    res.status(400).send(JSON.stringify({ error: 'description or url is empty.' }));
    return;
  }

  await link.update(Number(id), description, url);

  res.send(JSON.stringify({}));
});

//削除
app.delete('/links/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  await link.delete(Number(id));

  res.send(JSON.stringify({}));
});

//登録
app.post('/users', async (req: express.Request, res: express.Response) => {
  const { name, email, post, profile } = req.body;
  if (!email || !post) {
    res.status(400).send(JSON.stringify({ error: 'email or post is empty.' }));
    return;
  }

  await user.create({
    email,
    post: { title: post.title },
    name,
    profile: { bio: profile?.bio }
  });

  res.send(JSON.stringify({}));
});

//一覧取得
app.get('/users', async (req: express.Request, res: express.Response) => {
  const list = await user.getList();

  res.send(JSON.stringify(list));
});