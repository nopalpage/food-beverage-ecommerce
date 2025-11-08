# Food & Beverage E-commerce Website

A complete e-commerce website for food and beverage delivery with payment gateway integration, built with Next.js, Stripe, and Supabase.

## Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse food and beverage items with categories
- **Shopping Cart**: Add/remove items with quantity controls
- **Search & Filter**: Real-time search and category filtering
- **Product Details**: Detailed product information with images
- **Responsive Design**: Mobile-first responsive design

### 💳 Payment Integration
- **Stripe Payment**: Secure payment processing with Stripe
- **Multiple Payment Methods**: Credit/debit cards, digital wallets
- **Order Management**: Complete order lifecycle management
- **Tax Calculation**: Automatic tax calculation
- **Shipping Options**: Configurable shipping rates

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern editorial design with warm color palette
- **Smooth Animations**: Anime.js powered animations and transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Loading States**: Skeleton screens and loading indicators
- **Toast Notifications**: Success/error feedback messages

### 📊 Admin Dashboard
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **Customer Management**: Customer information and analytics
- **Sales Analytics**: Revenue and sales statistics
- **Real-time Updates**: Live inventory and order updates

### 🔧 Technical Features
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Authentication**: NextAuth.js for user management
- **Image Storage**: Cloudinary integration for product images
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized images and lazy loading

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Framer Motion**: Animation library

### Backend
- **Next.js API Routes**: Serverless functions
- **Supabase**: Backend-as-a-Service with PostgreSQL
- **Stripe**: Payment processing
- **NextAuth.js**: Authentication

### Libraries & Tools
- **Anime.js**: Animation library
- **ECharts.js**: Data visualization
- **Splide.js**: Carousel/slider component
- **React Icons**: Icon library
- **React Toastify**: Toast notifications

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Stripe account
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-beverage-ecommerce.git
   cd food-beverage-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Payment
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   
   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL schema in your Supabase SQL editor:
   ```sql
   -- Products table
   CREATE TABLE products (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     price NUMERIC(10,2) NOT NULL,
     original_price NUMERIC(10,2),
     image TEXT,
     category TEXT NOT NULL,
     stock INTEGER DEFAULT 0,
     rating NUMERIC(3,2) DEFAULT 0,
     reviews INTEGER DEFAULT 0,
     tags TEXT[],
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Orders table
   CREATE TABLE orders (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     customer_id UUID,
     items JSONB NOT NULL,
     subtotal NUMERIC(10,2) NOT NULL,
     tax NUMERIC(10,2) NOT NULL,
     shipping NUMERIC(10,2) NOT NULL,
     total NUMERIC(10,2) NOT NULL,
     status TEXT DEFAULT 'pending',
     payment_status TEXT DEFAULT 'pending',
     shipping_address JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Customers table
   CREATE TABLE customers (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     first_name TEXT,
     last_name TEXT,
     phone TEXT,
     address JSONB,
     total_spent NUMERIC(10,2) DEFAULT 0,
     order_count INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── components/          # React components
│   ├── Layout.js       # Main layout wrapper
│   ├── Header.js       # Navigation header
│   ├── HeroSection.js  # Landing hero section
│   ├── ProductCard.js  # Product display card
│   └── ...
├── pages/              # Next.js pages
│   ├── index.js        # Homepage
│   ├── products.js     # Product catalog
│   ├── cart.js         # Shopping cart
│   ├── checkout.js     # Checkout process
│   ├── admin.js        # Admin dashboard
│   └── api/            # API routes
├── lib/                # Utility libraries
│   ├── supabase.js     # Database connection
│   ├── stripe.js       # Payment gateway
│   └── utils.js        # Helper functions
├── styles/             # CSS and styling
│   └── globals.css     # Global styles
├── public/             # Static assets
└── README.md           # Documentation
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Connect your repository**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository

2. **Configure environment variables**
   - Add all environment variables from `.env.local`

3. **Deploy**
   - Click deploy and your site will be live!

### Deploy to Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment variables**
   - Add all variables from `.env.local`

3. **Deploy**
   - Push to GitHub and Netlify will auto-deploy

## Configuration

### Payment Gateway (Stripe)
1. Create a Stripe account
2. Get your API keys from Stripe Dashboard
3. Set up webhook endpoints for payment events
4. Configure payment methods in Stripe Dashboard

### Database (Supabase)
1. Create Supabase project
2. Set up database schema
3. Configure Row Level Security (RLS) policies
4. Set up storage buckets for images

### Authentication (Optional)
1. Configure NextAuth.js providers
2. Set up JWT secrets
3. Configure session management

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update color schemes in CSS variables
- Customize component styles in `styles/globals.css`

### Products
- Add your own product images
- Update product data in database
- Configure categories and tags

### Payment
- Add more payment methods
- Configure tax rates for different regions
- Set up shipping zones and rates

## API Endpoints

### Products API
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products` - Update product
- `DELETE /api/products` - Delete product

### Orders API
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders` - Update order status

### Payment API
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/webhook` - Handle Stripe webhooks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation and wiki
- Contact the development team

## Roadmap

### Upcoming Features
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Inventory management system
- [ ] Customer reviews and ratings
- [ ] Promotional campaigns
- [ ] Mobile app companion
- [ ] AI-powered recommendations
- [ ] Social media integration

---

Built with ❤️ using Next.js, Stripe, and Supabase