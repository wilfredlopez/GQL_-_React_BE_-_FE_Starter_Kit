# GQL And React BE And Frontend Starter Kit 1.0

By Wilfred Lopez @2019

## Setup

.env.development file should be created and include the enviroment variables for Development.

#### EXAMPLE:

```yaml
DATABASE_NAME=<YOUR DATABASE NAME IN MONGO DB>
JWT_SECRET=<YOUR JWT SECRET>
FRONTEND_URL=http://localhost:3000
MONGO_URL=mongodb+srv://<YOUR USERNAME>:<YOUR PASSWORD>@cluster0-ef6nu.mongodb.net
CLOUDINARY_CLOUD_NAME=<YOUR CLOUD NAME>
CLOUDINARY_API_KEY=<YOUR CLOUDINARY API KEY>
CLOUDINARY_API_SECRET=<YOUR CLOUDINARY API SECRET>
```

ormconfig.json file can be created but in this project im creating it manually in the app.ts

Install `yarn install`

Note:
Express Session and Redis can be activated by removing the comments in the code. any other database can be use by changing the typeorm config.

## Develope

- Backend `yarn run dev`

- Frontend: On a separte terminal run cd frontend `yarn start`

## Build

- Backend `yarn run build`
- Frontend via rootdir `yarn run build-client`

#### ENJOY!

```javascript
import app from "app";
app();
```
