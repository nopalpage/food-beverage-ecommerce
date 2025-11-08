import { dbHelpers } from '../../lib/supabase';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        // Get all products
        const products = await dbHelpers.getProducts();
        res.status(200).json(products);
        break;

      case 'POST':
        // Create new product
        const newProduct = await dbHelpers.createProduct(req.body);
        res.status(201).json(newProduct);
        break;

      case 'PUT':
        // Update product
        const { id, ...updates } = req.body;
        const updatedProduct = await dbHelpers.updateProduct(id, updates);
        res.status(200).json(updatedProduct);
        break;

      case 'DELETE':
        // Delete product
        const { id: deleteId } = req.body;
        await dbHelpers.deleteProduct(deleteId);
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}