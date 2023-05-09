CREATE EXTENSION if not exists "uuid-ossp";

create table users (
	id uuid unique not NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR ( 50 ) unique not null,
    email VARCHAR ( 255 ) unique,
	password VARCHAR ( 50 ) not null
);

INSERT INTO users (name, email, password) VALUES
	('user1', 'user1@test.com', '123'),
    ('user2', 'user2@test.com', '123'),
    ('user3', 'user3@test.com', '123'),
    ('user4', null, '123');

create table products (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR ( 255 ),
    description VARCHAR ( 255 ),
	price numeric
);

INSERT INTO products(title, description, price) VALUES
	('Pillow Pink', 'Pillow Voluptate soluta excepturi iure praesentium.', 138),
    ('Pillow Cyan', 'Pillow Provident dolore illo consequuntur.', 388),
    ('Pillow Salmon', 'Pillow Error deserunt necessitatibus consequatur incidunt occaecati.', 277)
;


create type status_cart_type as enum('OPEN', 'ORDERED');

create table if not exists carts (
	id uuid primary key default uuid_generate_v4(),
    user_id uuid not null REFERENCES users(id),
    created_at date not null,
    updated_at date not null,
    status status_cart_type,
	items uuid[]
);

create table if not exists cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	cart_id uuid REFERENCES carts(id),
    product_id uuid,
    count integer
);


CREATE TYPE order_status_enum AS ENUM ('CREATED', 'SHIPPED', 'DELIVERED');

create table orders (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id uuid not null references carts(id),
    user_id uuid not null references users(id),
    payment VARCHAR ( 255 ),
    delivery VARCHAR ( 255 ),
    comments VARCHAR ( 255 ),
    status order_status_enum,
	total numeric CONSTRAINT positive_price CHECK (total > 0)
);