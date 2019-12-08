import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { Response } from "express";
import { buildSchema } from "type-graphql";
// import { Request, Response } from "express";
import { createConnection } from "typeorm";
// import session from "express-session";
import { userLoader } from "./dataloaders/dataloaders";
import { DATABASE_NAME, MONGO_URL } from "./env";
import { MyContext } from "./interfaces/myContext";
import path from "path";
import { authMiddleware } from "./midleware/authMiddleware";
import { customAuthChecker } from "./midleware/customAuthChecker";
import FilesResolver from "./resolvers/fileUpload/fileUploadResolver";
import UserResolver from "./resolvers/user/userResolver";

// import { ACCESS_TOKEN } from "./constants";
// import { redis } from "./redis";
// import connectRedis from "connect-redis";

// const RedisStore = connectRedis(session);

const allowedOrigins = ["http://localhost:3000", "http://localhost:5500"]; //Add other allowed origins here

const app = async () => {
  const app: express.Application = express();

  const corsOptions: CorsOptions = {
    origin: allowedOrigins,

    credentials: true // <-- REQUIRED backend setting
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  const dbName = DATABASE_NAME || "testDB";

  await createConnection({
    name: "default",
    type: "mongodb",
    port: 27017,
    url: `${MONGO_URL}/${dbName}`,
    database: dbName,
    synchronize: true,
    logging: true,
    useNewUrlParser: true,
    entities: [`${__dirname}/entity/**/*.*`],
    migrations: [`${__dirname}/migration/**/*.*`],
    subscribers: [`${__dirname}/subscriber/**/*.*`],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    },
    validateOptions: {
      useUnifiedTopology: true
    }
  }).then(() => console.log("Connected to database"));

  app.use(authMiddleware);

  const schema = await buildSchema({
    resolvers: [UserResolver, FilesResolver],
    // resolvers: [__dirname + "/resolvers/**/*.ts"],
    authChecker: customAuthChecker
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: MyContext) => ({
      req,
      res,
      session: req.session,
      userLoader: userLoader()
    }),
    introspection: true,
    playground: true //anable in production for tests
  });

  server.applyMiddleware({ app, cors: false, bodyParserConfig: false }); // app is from an existing express app

  //  FONTEND-CLIENT CODE ****************************
  //serving static files from  frontend
  app.use(
    "/static",
    express.static(path.join(__dirname, "..", "frontend", "build", "static"))
  );

  //serving frontend folder
  app.use("/", express.static(path.join(__dirname, "..", "frontend", "build")));

  app.get("*", (_, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
  });

  //************************ */

  const port = process.env.PORT || 5500;

  app.listen({ port }, () =>
    console.log(`Ready at http://localhost:${port}/graphql`)
  );
};

export default app;
