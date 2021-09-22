CREATE TABLE containers ( guid char(36));

CREATE TABLE elements(
       container char(36),
       guid char(36),
       hash TEXT,
       title TEXT,
       body TEXT,
       parent char(36),
       children char(36)[]
);
