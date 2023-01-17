CREATE TABLE users (
  id SERIAL,
  name varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE accounts (
  id SERIAL,
  userId SERIAL NOT NULL,
  balance float NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES Users ON DELETE CASCADE,
  CONSTRAINT no_negative_balance CHECK (balance >= 0)
);
