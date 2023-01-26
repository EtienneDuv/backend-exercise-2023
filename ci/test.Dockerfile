FROM node:16
# Build TS project ========================
WORKDIR /app

COPY . .

RUN npm i

CMD npm run test;
