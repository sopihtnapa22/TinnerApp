import { Elysia, t } from "elysia";
import { example } from "./controllers/example.controller"
import { swaggerConfig } from "./configs/swagger.config";
import cors from "@elysiajs/cors";
import { tlsConfig } from "./configs/tls.config";
import { MongoDB } from "./configs/database.config";
import { jwtConfig } from "./configs/jwt.config";
import { AccountController } from "./controllers/account.controller";
import { UserController } from "./controllers/user.controller";
import { staticPlugin } from "@elysiajs/static";
import { PhotoController } from "./controllers/photo.controller";
import { LikeController } from "./controllers/like.controller";
import { ErrorController } from "./controllers/errorController";

MongoDB.connect()
const app = new Elysia()
  .use(cors())
  .use(jwtConfig)
  .use(swaggerConfig)
  //.use(example)
  .use(AccountController)
  .use(UserController)
  .use(LikeController)
  .use(ErrorController)
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })
  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))
  .use(PhotoController)

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)