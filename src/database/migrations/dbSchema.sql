CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID, 
  "username" VARCHAR(255) NOT NULL, 
  "password" VARCHAR(255) NOT NULL, 
  "createdAt" TIMESTAMP WITH TIME ZONE, 
  UNIQUE ("username"), 
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "articles" (
  "id" UUID, 
  "authorId" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
  "title" VARCHAR(255) NOT NULL, 
  "perex" VARCHAR(255) NOT NULL, 
  "content" TEXT NOT NULL, 
  "createdAt" TIMESTAMP WITH TIME ZONE, 
  "updatedAt" TIMESTAMP WITH TIME ZONE, 
  "deletedAt" TIMESTAMP WITH TIME ZONE, 
  UNIQUE ("title"), 
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "comments" (
  "id" SERIAL, 
  "articleId" UUID NOT NULL REFERENCES "articles" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
  "authorId" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
  "content" TEXT NOT NULL, 
  "createdAt" TIMESTAMP WITH TIME ZONE, 
  PRIMARY KEY ("id")
);
