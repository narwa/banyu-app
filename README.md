# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

docker build -build-arg NUXT_API_BASE_PATH="https://banyuapi.obahnow.com" --build-arg NUXT_PUBLIC_FIREBASE_API_KEY='AIzaSyDYHEyWwlhH7Zlaa-0gF62hATGLF1jmFe0'
--build-arg NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN='obahnow-528ec.firebaseapp.com'
--build-arg NUXT_PUBLIC_FIREBASE_PROJECT_ID='obahnow-528ec'
--build-arg NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET='obahnow-528ec.firebasestorage.app'
--build-arg NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID='1038049532307'
--build-arg NUXT_PUBLIC_FIREBASE_APP_ID='1:1038049532307:web:e2a20832111355e3633066' -t ${container_tag} .

docker build -t ${container_tag} . -build-arg NUXT_API_BASE_PATH="https://banyuapi.obahnow.com" --build-arg NUXT_PUBLIC_FIREBASE_API_KEY='AIzaSyDYHEyWwlhH7Zlaa-0gF62hATGLF1jmFe0' --build-arg NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN='obahnow-528ec.firebaseapp.com' --build-arg NUXT_PUBLIC_FIREBASE_PROJECT_ID='obahnow-528ec' --build-arg NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET='obahnow-528ec.firebasestorage.app' --build-arg NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID='1038049532307' --build-arg NUXT_PUBLIC_FIREBASE_APP_ID='1:1038049532307:web:e2a20832111355e3633066' -t ${container_tag} .

docker build -f Dockerfile -t banyu-cms-fe:nginx --build-arg NUXT_API_BASE_PATH="https://banyuapi.obahnow.com" .

sqp_3b198ca68ec2b58c6a0b08ef5da2e164c88c5af2
