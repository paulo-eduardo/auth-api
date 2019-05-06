BEGIN TRANSACTION;

CREATE TABLE login
(
  id serial PRIMARY KEY,
  hash varchar(100) NOT NULL,
  usuario varchar(50) UNIQUE NOT NULL
);

COMMIT;
