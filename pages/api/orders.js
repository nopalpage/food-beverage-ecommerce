import { dbHelpers } from '../../lib/supabase';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        // Get all orders
        const orders = await dbHelpers.getOrders();
        res.status(200).json(orders);
        break;

      case 'POST':
        // Create new order
        const newOrder = await dbHelpers.createOrder(req.body);
        res.status(201).json(newOrder);
        break;

      case 'PUT':
        // Update order
        const { id, ...updates } = req.body;
        const updatedOrder = await dbHelpers.updateOrder(id, updates);
        res.status(200).json(updatedOrder);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}