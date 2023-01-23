FROM node:16  AS build

# Build TS project ========================
WORKDIR /app

COPY . .

RUN ls -a
RUN npm ci
RUN npm run build

# Prod image ==============================
FROM node:16 

WORKDIR /app

COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

# If env is prod, we can't use apollo server sandbox
ENV NODE_ENV=preprod
ENV POSTGRES_LOGGING=false

EXPOSE 3000

CMD npm run start;
