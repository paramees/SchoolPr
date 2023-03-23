USE bookstore;

CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  author VARCHAR(255)
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  year INTEGER,
  pages INTEGER,
  description VARCHAR(255),
  visiters INTEGER DEFAULT 0,
  wanted INTEGER DEFAULT 0,
  deletion DATETIME
);

CREATE TABLE authors_books (
  author_id INTEGER,
  book_id INTEGER,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors (author)
SELECT DISTINCT author FROM basic_table;

INSERT INTO books (id, name, year, pages, description, visiters, wanted)
SELECT DISTINCT id, name, year, pages, description, visiters, wanted FROM basic_table;

INSERT INTO authors_books (author_id, book_id)
SELECT a.id, b.id
FROM basic_table bt
JOIN authors a ON bt.author = a.author
JOIN books b ON bt.id = b.id;

ALTER TABLE `bookstore`.`authors_books` 
DROP FOREIGN KEY `authors_books_ibfk_1`,
DROP FOREIGN KEY `authors_books_ibfk_2`;
ALTER TABLE `bookstore`.`authors_books` 
ADD CONSTRAINT `authors_books_ibfk_1`
  FOREIGN KEY (`author_id`)
  REFERENCES `bookstore`.`authors` (`id`)
  ON DELETE CASCADE,
ADD CONSTRAINT `authors_books_ibfk_2`
  FOREIGN KEY (`book_id`)
  REFERENCES `bookstore`.`books` (`id`)
  ON DELETE CASCADE;