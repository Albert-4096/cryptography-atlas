# 🔐 Cryptography Atlas

Cryptography Atlas is a small web app for exploring and visualizing cryptography concepts in a clear, approachable way.
It’s built with **React + Vite** and can be run either locally with Node, or fully containerized via **Docker**.

---

## 🚀 Features

* 📚 Structured layout for cryptography topics
* ⚡ Fast, modern front-end (Vite + React)
* 🐳 One-command Docker deployment
* 🌐 Ready to host on your own VPS / server

> This project is front-end only. If you add any API keys or secrets, be aware that they will be visible in the browser bundle unless you introduce a backend/proxy.

---

## 🔧 Tech Stack

* [Vite](https://vitejs.dev/)
* [React](https://react.dev/)
* Docker + docker-compose (for deployment)

---

## 🧑‍💻 Local Development (without Docker)

### 1. Clone the repository

```bash
git clone https://github.com/Albert-4096/cryptography-atlas.git
cd cryptography-atlas
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

By default, Vite runs on [http://localhost:5173](http://localhost:5173).

---

## 🐳 Running with Docker

You can run Cryptography Atlas fully containerized using the provided `Dockerfile` and `docker-compose.yml`.

### Option A: Docker (manual)

Build the image:

```bash
docker build -t cryptography-atlas .
```

Run the container:

```bash
docker run -d \
  --name cryptography-atlas \
  -p 8080:80 \
  cryptography-atlas
```

Now open:

> [http://localhost:8080](http://localhost:8183)

---

### Option B: Docker Compose (recommended)

`docker-compose.yml` is already configured to:

* Build the app from the local `Dockerfile`
* Serve it via nginx
* Expose it on port **8183**

From the project root:

```bash
docker compose up -d --build
```

Then visit:

> [http://localhost:8183](http://localhost:8183)

To stop everything:

```bash
docker compose down
```

---

## 🌍 Deploying on a Server (VPS / Home Server)

1. **SSH into your server**

   ```bash
   ssh user@your-server
   ```

2. **Clone the repo**

   ```bash
   git clone git@github.com:Albert-4096/cryptography-atlas.git
   cd cryptography-atlas
   ```

3. **Start the app**

   ```bash
   docker compose up -d --build
   ```

4. (Optional) Put it behind a reverse proxy (Caddy, Nginx, Traefik, etc.) and point your domain (e.g. `crypto.example.com`) to the server.
   The proxy should forward HTTP traffic to `http://localhost:8183`.

---

## 🔁 Updating the App

On your server:

```bash
cd /path/to/cryptography-atlas

# Pull latest changes
git pull

# Rebuild and restart the container
docker compose up -d --build
```
---

## 🤝 Contributions

Feel free to fork the repo, open issues, or submit pull requests with:

* New cryptography topics
* UI/UX improvements
* Bug fixes or refactors

---

Enjoy exploring cryptography! 🔐✨
