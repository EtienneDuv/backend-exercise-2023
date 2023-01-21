CREATE TABLE users (
  id varchar(255),
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  createdAt date,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);
-- INSERT INTO users (id, username, "password", "createdAt") VALUES
-- ('9bc02c3c-d128-46dd-ac7a-6927f63fef8d', 'adminUser', '$2b$10$Pvfdlp96nBLaA0H6KxdDWuikUkY7yOxXngHTp6HjKaBndW7I8UKCC', NOW());
-- Password is: adminPassword


CREATE TABLE articles (
  id varchar(255),
  userId varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  perex varchar(255) NOT NULL,
  content text,
  createdAt date,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users ON DELETE CASCADE,
);

CREATE TABLE comments (
  id integer,
  userId varchar(255) NOT NULL,
  articleId varchar(255) NOT NULL,
  content varchar(255),
  createdAt date,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users ON DELETE CASCADE,
  FOREIGN KEY (articleId) REFERENCES articles ON DELETE CASCADE,
);
