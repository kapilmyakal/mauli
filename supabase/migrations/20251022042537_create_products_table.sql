/*
  # Create products table for Mauli Mart

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `price` (numeric) - Product price
      - `image_url` (text) - URL/path to product image
      - `description` (text, optional) - Product description
      - `stock` (integer) - Available stock quantity
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (all users can view products)

  3. Notes
    - Products are publicly viewable for e-commerce functionality
    - No authentication required for browsing products
    - Stock management can be added later for inventory tracking
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  description text DEFAULT '',
  stock integer DEFAULT 0 CHECK (stock >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);