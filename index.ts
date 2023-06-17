import { Link, User } from "./db";

const database = new Link();

//database.create("test", "https://yahoo.com");
const user = new User();
user.create();

const run = async () => {
  const list = await database.getList();
  list.map(item => console.log(item));
};

run();