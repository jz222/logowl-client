![loggy header](https://github.com/jz222/loggy-client/blob/master/assets/header.png?raw=true)

<div align="center">
  <p>
    <h3>LOGGY Client</h2>
  </p>
  <p>
    <i>Monitor your services and track your errors in production. 🚀📈</i>
  </p>
</div>

---

**Related:**

🚀 [**LOGGY Service**](https://github.com/jz222/loggy)

📡 [**LOGGY NodeJS Adapter**](https://github.com/jz222/loggy-adapter-nodejs)

<br />

### Features

🔥 **Flexible**

- Group events by services
- Easy-to-use adapter
- Custom adapters for any platform and language
- Customizable
- Can be self-hosted

🔥 **Extensive Event Details**

- Platform information
- Detailed evolution
- Stacktrace
- Code Snippets
- Logs
- Metrics
- Individual badges
- Adapter information

🔥 **Aggregated events**

- Live updates
- Same events are aggregated
- Event count
- Evolution preview

🔥 **User management**

- Invite and remove users from your organization

🔥 **Highly scalable infrastructure**

- Containerized backend
- Simple to deploy and scale

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
