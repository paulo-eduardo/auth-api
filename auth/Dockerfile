FROM node:11 as common
WORKDIR /auth
COPY package.json ./
RUN npm install
COPY . .

### STAGE 2: Dev ###
FROM node:11 as dev
COPY --from=common /auth /auth
WORKDIR /auth
CMD ["npm", "run", "dev"]

### STAGE 2: Deploy ###
FROM node:11 as deploy
COPY --from=common /auth /auth
WORKDIR /auth
CMD ["npm", "start"]
