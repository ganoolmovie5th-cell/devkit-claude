import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Docker Compose for Beginners: From docker run to docker-compose.yml | DevKit Blog',
  description: 'Learn how to convert docker run commands to docker-compose.yml files. Step-by-step guide with real examples for web developers.',
  alternates: { canonical: '/blog/docker-compose-beginners-guide/' },
  keywords: 'docker compose tutorial, docker run to compose, docker compose beginners, docker compose guide',
}

export default function DockerComposeBlogPost() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Docker Compose for Beginners: From docker run to docker-compose.yml</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>August 19, 2026</time>
          <span>7 min read</span>
        </div>
      </header>

      <p>If you have ever run a <code>docker run</code> command with 10 flags and forgotten what half of them do the next day, Docker Compose is your solution. This guide walks you through converting messy run commands into clean, version-controlled YAML files.</p>

      <h2>Why Docker Compose?</h2>
      <p>A typical development setup might need a web server, a database, a cache layer, and a background worker. Running each as a separate <code>docker run</code> command means:</p>
      <ul>
        <li>Remembering port mappings for every service</li>
        <li>Manually creating networks so containers can talk</li>
        <li>Retyping volume mounts every time</li>
        <li>No version control for your infrastructure</li>
      </ul>
      <p>Docker Compose solves all of this with a single <code>docker-compose.yml</code> file. One command — <code>docker compose up</code> — brings your entire stack online.</p>

      <h2>Anatomy of a docker-compose.yml</h2>
      <pre><code>{`version: "3.8"

services:
  web:
    image: node:18-alpine
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
    environment:
      - NODE_ENV=development
    depends_on:
      - db

  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}</code></pre>

      <h2>Converting docker run to Compose</h2>
      <p>Here is a real-world example. This <code>docker run</code> command:</p>
      <pre><code>{`docker run -d \\
  --name myapp \\
  -p 3000:3000 \\
  -v ./data:/app/data \\
  -e DATABASE_URL=postgres://localhost/db \\
  --restart always \\
  node:18-alpine npm start`}</code></pre>

      <p>Becomes this in docker-compose.yml:</p>
      <pre><code>{`services:
  myapp:
    image: node:18-alpine
    container_name: myapp
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - DATABASE_URL=postgres://localhost/db
    restart: always
    command: npm start`}</code></pre>

      <p>The mapping is straightforward:</p>
      <ul>
        <li><code>-p</code> becomes <code>ports:</code></li>
        <li><code>-v</code> becomes <code>volumes:</code></li>
        <li><code>-e</code> becomes <code>environment:</code></li>
        <li><code>--name</code> becomes <code>container_name:</code></li>
        <li><code>--restart</code> becomes <code>restart:</code></li>
        <li>The trailing command becomes <code>command:</code></li>
      </ul>

      <h2>Common Patterns</h2>

      <h3>Multi-service with networking</h3>
      <p>Services in the same Compose file can reach each other by service name. No need to manually create networks or use container IPs.</p>
      <pre><code>{`services:
  api:
    image: myapi:latest
    environment:
      - REDIS_URL=redis://cache:6379
  cache:
    image: redis:7-alpine`}</code></pre>
      <p>The <code>api</code> service connects to Redis using <code>cache</code> as the hostname — Docker Compose DNS handles it automatically.</p>

      <h3>Environment files</h3>
      <p>Instead of listing 20 environment variables inline, use an env file:</p>
      <pre><code>{`services:
  api:
    image: myapi:latest
    env_file:
      - .env.local`}</code></pre>

      <h3>Health checks</h3>
      <pre><code>{`services:
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5`}</code></pre>

      <h2>Essential Commands</h2>
      <ul>
        <li><code>docker compose up -d</code> — start all services in background</li>
        <li><code>docker compose down</code> — stop and remove containers</li>
        <li><code>docker compose logs -f web</code> — follow logs for one service</li>
        <li><code>docker compose exec web sh</code> — shell into a running container</li>
        <li><code>docker compose build</code> — rebuild images</li>
        <li><code>docker compose ps</code> — list running services</li>
      </ul>

      <h2>Tips</h2>
      <ol>
        <li><strong>Always pin image versions</strong> — use <code>postgres:15</code> not <code>postgres:latest</code></li>
        <li><strong>Use named volumes</strong> for database data — anonymous volumes get deleted on <code>down</code></li>
        <li><strong>Add <code>.dockerignore</code></strong> — keep node_modules and .git out of build context</li>
        <li><strong>Use <code>depends_on</code></strong> for startup ordering — but note it does not wait for readiness, only container start</li>
      </ol>

      <h2>Automate the conversion</h2>
      <p>Do not want to translate flags manually? Use our <Link href="/tools/docker-run-to-compose">Docker Run to Compose</Link> tool — paste any docker run command and get a ready-to-use docker-compose.yml instantly.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/docker-run-to-compose" className="text-sm text-blue-600 hover:underline">Docker Run to Compose</Link>
          <Link href="/tools/nginx-config-generator" className="text-sm text-blue-600 hover:underline">Nginx Config Generator</Link>
          <Link href="/tools/env-to-json" className="text-sm text-blue-600 hover:underline">.env to JSON</Link>
        </div>
      </div>
    </article>
  )
}
