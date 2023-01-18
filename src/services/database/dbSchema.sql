CREATE TABLE users (
  id varchar(255),
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  createdAt date,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

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
