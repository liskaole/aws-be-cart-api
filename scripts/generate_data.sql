WITH cart_ids AS (
	INSERT INTO carts(user_id, created_at, updated_at, status) 
	values 
	('25af69d5-3dcc-4414-b023-1e8b3a4e9b99', NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100), NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100 + 100), 'OPEN'),
	('25af69d5-3dcc-4414-b023-1e8b3a4e9b99', NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100), NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100 + 200), 'ORDERED'), 
	('25af69d5-3dcc-4414-b023-1e8b3a4e9b99', NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100), NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100 + 300), 'OPEN'),
	('30a2f8ed-6620-4a39-ab1b-cb5c74c461f5', NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100), NOW() - '1 day'::INTERVAL * (RANDOM()::int * 100 + 400), 'ORDERED')
	RETURNING id AS cart_id
)

INSERT INTO cart_items ( cart_id, product_id, count )
	select 
		cart_id, 
		uuid((array['57428da3-5aad-4553-ade4-aca28fc600c4', '6f2032ce-38ba-4ad1-9ca4-5a811b37eda1', '84f547bc-f080-47e2-be27-e3e3ff2f85fd'])[floor(random() * 3 + 1)]), 
		floor(RANDOM() * 10)::int
	from cart_ids