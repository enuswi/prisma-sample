## これは何？

- prismaを利用したサンプルコード
- 本来、postgreを使いたいけど、面倒なので一旦、SQLiteを使ってます
- また、SQLiteの.dbファイルは一旦、コミットしてます。

## 起動まで

```
$ npm run build

$ docker build ./ --tag prisma-sample:v1.0.0

$ docker run -p 8080:3000 prisma-sample

$ curl localhost:8080/links
```

## TODO

- [] 起動時のwarning解消

```
prisma:warn Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-1.1.x".
Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, you may also try to replace your base image with `node:lts-slim`, which already ships with OpenSSL installed.
prisma:warn Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-1.1.x".
Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, you may also try to replace your base image with `node:lts-slim`, which already ships with OpenSSL installed.
```