# GQL And React BE And Frontend Starter Kit 1.0

By Wilfred Lopez

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

## Develope

- Backend `yarn run dev`

- Frontend: On a separte terminal run cd frontend `yarn start`

## Build

`yarn run build`

#### ENJOY!

```javascript
import app from "app";
app();
```
