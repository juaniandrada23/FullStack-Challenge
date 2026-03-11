INSERT INTO orders (id, customer_name, item, quantity, status, created_at, updated_at) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Juan Perez', 'Laptop Dell XPS 15', 1, 'pending', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Maria Garcia', 'Monitor LG 27"', 2, 'completed', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Carlos Lopez', 'Teclado Mecanico', 3, 'pending', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'Ana Martinez', 'Mouse Inalambrico', 5, 'cancelled', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),
  ('e5f6a7b8-c9d0-1234-efab-345678901234', 'Roberto Sanchez', 'Auriculares Bluetooth', 2, 'completed', NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;
