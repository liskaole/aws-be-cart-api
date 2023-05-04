CREATE EXTENSION if not exists "uuid-ossp";

create type status_cart_type as enum('OPEN', 'ORDERED');

create table if not exists carts (
	id uuid primary key default uuid_generate_v4(),
    user_id uuid not null,
    created_at date not null,
    updated_at date not null,
    status status_cart_type
);

create table if not exists cart_items (
	cart_id uuid REFERENCES carts(id),
    product_id uuid,
    count integer
)