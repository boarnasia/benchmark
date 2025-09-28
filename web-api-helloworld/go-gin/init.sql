CREATE TABLE IF NOT EXISTS hello (
    id INT PRIMARY KEY,
    message VARCHAR(255) NOT NULL
);

INSERT INTO hello (id, message) VALUES (1, 'Hello, World!') ON DUPLICATE KEY UPDATE message = VALUES(message);