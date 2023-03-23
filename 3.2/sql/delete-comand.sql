USE bookstore;

SELECT books.id FROM books
WHERE deletion < now();

DELETE FROM books
WHERE deletion < now();

DELETE FROM authors
WHERE id NOT IN (SELECT author_id FROM authors_books);