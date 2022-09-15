ARG APP_ENV=development

# ----- BASE ------
FROM node:18-slim as stage-base

RUN apt-get update
RUN apt-get install -y openssl

ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app

# ----- DEVELOPMENT ------
FROM stage-base AS stage-development
COPY . .
RUN yarn install --pure-lockfile --non-interactive

# ----- BUILD ------
FROM stage-development AS stage-build
RUN yarn prisma:generate
RUN yarn build

# ----- PRODUCTION ------
FROM stage-base AS stage-production

COPY --from=stage-build /usr/src/app/dist ./dist
COPY --from=stage-build /usr/src/app/yarn.lock ./yarn.lock

RUN npm install --location=global prisma@4.3.1

COPY package.json ./
COPY prisma ./prisma/

RUN yarn install --production
RUN prisma generate

# ----- MAIN ------
FROM stage-${APP_ENV}
CMD ["yarn", "start:migrate:prod"]