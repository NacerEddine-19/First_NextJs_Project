-- Insert dummy users
INSERT INTO users (name, email, password, user_type) VALUES
('Nacer', 'nacer@gmail.com', MD5('123'), 'user'),
('Oussama', 'oussama@gmail.com', MD5('123'), 'user'),
('Admin User', 'admin@admin.com', MD5('123'), 'admin');

-- Insert dummy products
INSERT INTO products (name, price, image, description, categorie) VALUES
('Shoe 1', 190.99, 'Shoe1.jpg', 'Black leather shoe with laces', 'Shoe'),
('Shoe 2', 290.99, 'Shoe2.jpg', 'Brown leather shoe with buckles', 'Shoe'),
('Shoe 3', 390.99, 'Shoe3.jpg', 'White sneaker with reflective details', 'Shoe'),
('Shoe 4', 490.99, 'Shoe4.jpg', 'Blue suede shoe with studs', 'Shoe'),
('Shoe 5', 590.99, 'Shoe5.jpg', 'Red suede shoe with stacked heels', 'Shoe'),
('Shoe 6', 690.99, 'Shoe6.jpg', 'Black leather boots with zip up detail', 'Shoe'),
('Shoe 7', 790.99, 'Shoe7.jpg', 'White leather ankle boots with laces', 'Shoe'),
('Shoe 8', 890.99, 'Shoe8.jpg', 'Gray suede slip on with a sleek design', 'Shoe'),
('Tshirt 1', 190.99, 'Tshirt1.jpg', 'White t-shirt with a simple design', 'Tshirt'),
('Tshirt 2', 290.99, 'Tshirt2.jpg', 'Black t-shirt with a leopard print', 'Tshirt'),
('Tshirt 3', 390.99, 'Tshirt3.jpg', 'Red t-shirt with a bold design', 'Tshirt'),
('Tshirt 4', 490.99, 'Tshirt4.jpg', 'Green t-shirt with a hibiscus print', 'Tshirt'),
('Tshirt 5', 590.99, 'Tshirt5.jpg', 'Beige t-shirt with a relaxed design', 'Tshirt'),
('Tshirt 6', 690.99, 'Tshirt6.jpg', 'Navy blue t-shirt with a striped pattern', 'Tshirt'),
('Tshirt 7', 790.99, 'Tshirt7.jpg', 'Gray t-shirt with a sports logo', 'Tshirt'),
('Tshirt 8', 890.99, 'Tshirt8.jpg', 'Purple t-shirt with a funky design', 'Tshirt'),
('Tshirt 9', 990.99, 'Tshirt9.jpg', 'Yellow t-shirt with a colorful design', 'Tshirt'),
('Tshirt 10', 109.99, 'Tshirt10.jpg', 'Orange t-shirt with a retro design', 'Tshirt'),
('Tshirt 11', 119.99, 'Tshirt11.jpg', 'Pink t-shirt with a floral print', 'Tshirt'),
('Tshirt 12', 129.99, 'Tshirt12.jpg', 'Grey t-shirt with a minimalist design', 'Tshirt'),
('Tshirt 13', 139.99, 'Tshirt13.jpg', 'Maroon t-shirt with a bold design', 'Tshirt'),
('Tshirt 14', 149.99, 'Tshirt14.jpg', 'Teal t-shirt with a leopard print', 'Tshirt'),
('Tshirt 15', 159.99, 'Tshirt15.jpg', 'Cyan t-shirt with a beachy design', 'Tshirt'),
('Bottle 1', 159.99, 'Bottle1.jpg', 'Clear plastic bottle with a cap', 'Bottle'),
('Bottle 2', 159.99, 'Bottle2.jpg', 'Glass bottle with a brown label', 'Bottle'),
('Bottle 3', 159.99, 'Bottle3.jpg', 'Aluminum bottle with a silver label', 'Bottle'),
('Bottle 4', 159.99, 'Bottle4.jpg', 'Plastic bottle with a white label', 'Bottle')
;


-- Insert dummy orders
INSERT INTO orders (user_id, total_price, payment_status) VALUES
(1, 590.98, 'completed'),
(2, 290.99, 'pending'),
(1, 190.99, 'completed');

-- Insert dummy messages
INSERT INTO message (user_id, message) VALUES
(1, 'This is a message from John Doe.'),
(2, 'This is a message from Jane Smith.');

-- Insert dummy cart items
INSERT INTO cart (user_id, name, image, price, quantity) VALUES
(1, 'Product 1', 'Shoe1.jpg', 19.99, 2),
(1, 'Product 2', 'Shoe2.jpg', 29.99, 1),
(2, 'Product 3', 'Shoe3.jpg', 39.99, 3),
(2, 'Product 4', 'Shoe4.jpg', 49.99, 2);
