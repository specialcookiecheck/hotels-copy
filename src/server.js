import dotenv from "dotenv"
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import Handlebars from "handlebars";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import path from "path";

import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";

const adminUser = {
  firstName: "admin",
  lastName: "admin",
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  adminAccount: true,
};

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const swaggerOptions = {
  info: {
    title: "Hotels! API",
    version: "1.0"
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  console.log("server.js started")
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    // host: "localhost",
  });

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(jwt);
  await server.register({
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  );
  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORD,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  server.auth.default("session");
  
  db.init("firebase");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);

  const adminCheck = await db.userStore.getUserByEmail(process.env.ADMIN_EMAIL);
  if (adminCheck == null || adminCheck === undefined ) {
    console.log("no admin user in db, adding now");
    await db.userStore.addUser(adminUser);
    console.log(`admin user ${adminUser} added to database`);
  } else {
    console.log("admin user already present in db");
  }
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
