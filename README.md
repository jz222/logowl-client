![loggy header](https://github.com/jz222/loggy-client/blob/master/assets/header.png?raw=true)

<div align="center">
  <p>
    <b>LOGGY Client</b>
  </p>
  <p>
    <i>Monitor your services and track your errors in production.</i>
  </p>
  <br />
  <br />
</div>

This repository contains the client. Please find the backend and the NodeJS adapter in the respective repo.

🚀 [**LOGGY Service**](https://github.com/jz222/loggy)

📡 [**LOGGY NodeJS Adapter**](https://github.com/jz222/loggy-adapter-nodejs)

---

### Features

🔥 Separate events by services

🔥 Precise evolution

🔥 Extensive details with snippets and logs

🔥 Aggregated events with counts

🔥 User management

🔥 Highly scalable infrastructure

🔥 Easy to host yourself

### Insights

![services](https://github.com/jz222/loggy-client/blob/master/assets/services.png?raw=true)

![evolution](https://github.com/jz222/loggy-client/blob/master/assets/evolution.png?raw=true)

![stacktrace](https://github.com/jz222/loggy-client/blob/master/assets/stacktrace.png?raw=true)

## Local Development 🛠

Clone the repository and install dependencies with `npm i` or `yarn` and start the development server with `npm start` or `yarn start`. To create a bundled production build run `npm run build` or `yarn build`.

## Configuration ⚙️

By default, the client is expecting the backend to be available at `http://localhost:2800`. If you use a different port or host LOGGY yourself, you can set the address in `public/config.js` before you create a production build.

## Hosting 💻

If you want to host LOGGY yourself, but don't want to create your own production build, you can find the static files in the `dist/` folder. These files can be hosted like any other website, just make sure to update the backend URL in `dist/config.js`.
