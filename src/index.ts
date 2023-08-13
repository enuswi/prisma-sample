////import { Link, User } from "./db";
//import { Link } from "./db/link";
//
//const database = new Link();
//
////database.create("test", "https://yahoo.com");
////const user = new User();
////user.create();
//
//const link = new Link();
//link.create("test", "https://yahoo.com");
//
//const run = async () => {
//  const list = await database.getList();
//  list.map(item => console.log(item));
//};
//
//run();


import express from 'express';
const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.listen(3000, () => {
  console.log("Start on port 3000.");
});

import { Link } from "./db/link";
const database = new Link();

//一覧取得
app.get('/links', async (req: express.Request, res: express.Response) => {
  const list = await database.getList();

  res.send(JSON.stringify(list));
});

//詳細取得
app.get('/links/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const item = await database.find(Number(id));
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

  await database.create(description, url);

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

  await database.update(Number(id), description, url);

  res.send(JSON.stringify({}));
});

//削除
app.delete('/links/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  await database.delete(Number(id));

  res.send(JSON.stringify({}));
});