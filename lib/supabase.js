import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema
export const databaseSchema = {
  products: {
    id: 'uuid',
    name: 'text',
    description: 'text',
    price: 'numeric',
    original_price: 'numeric',
    image: 'text',
    category: 'text',
    stock: 'integer',
    rating: 'numeric',
    reviews: 'integer',
    tags: 'text[]',
    created_at: 'timestamp with time zone',
    updated_at: 'timestamp with time zone'
  },
  orders: {
    id: 'uuid',
    customer_id: 'uuid',
    items: 'jsonb',
    subtotal: 'numeric',
    tax: 'numeric',
    shipping: 'numeric',
    total: 'numeric',
    status: 'text',
    payment_status: 'text',
    shipping_address: 'jsonb',
    created_at: 'timestamp with time zone',
    updated_at: 'timestamp with time zone'
  },
  customers: {
    id: 'uuid',
    email: 'text',
    first_name: 'text',
    last_name: 'text',
    phone: 'text',
    address: 'jsonb',
    total_spent: 'numeric',
    order_count: 'integer',
    created_at: 'timestamp with time zone',
    updated_at: 'timestamp with time zone'
  }
};

// Helper functions
export const dbHelpers = {
  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getProduct(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Orders
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createOrder(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateOrder(id, updates) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Customers
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getCustomerByEmail(email) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createCustomer(customer) {
    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateCustomer(id, updates) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};