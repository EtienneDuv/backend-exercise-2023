CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID,
  "username" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP,
  UNIQUE ("username"),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "articles" (
  "id" UUID,
  "authorId" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "title" VARCHAR(255) NOT NULL,
  "perex" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP,
  "deletedAt" TIMESTAMP,
  UNIQUE ("title"),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "comments" (
  "id" SERIAL,
  "articleId" UUID NOT NULL REFERENCES "articles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "authorId" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "childComments" (
  "parentId" SERIAL NOT NULL REFERENCES "comments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "childId" SERIAL NOT NULL REFERENCES "comments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "commentVotes" (
  "commentId" SERIAL NOT NULL REFERENCES "comments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "ip" VARCHAR(16),
  "value" SMALLINT
);
