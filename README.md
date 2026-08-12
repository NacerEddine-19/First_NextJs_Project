# ESHOP - Full Stack E-Commerce Platform

This is a full-stack e-commerce application built with Next.js 13 and PHP/MySQL backend.

## �� 🛒 Overview

ESHOP is a complete e-commerce solution featuring:
- Product catalog with categories (Shoes, T-shirts, Bottles)
- User authentication and authorization (regular users & admins)
- Shopping cart functionality
- Order processing
- Admin dashboard for managing products, users, orders, and messages
- Responsive design

## �� 🏗��️ Tech Stack

### Frontend
- **Next.js 13** (App Router)
- **React 18**
- **CSS Modules** for styling
- **NextAuth** for authentication

### Backend
- **PHP 8.2** with PDO for database interactions
- **MySQL** database
- RESTful API endpoints for frontend communication

### Database
- MySQL schema with tables for users, products, cart, orders, and messages

## �� 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PHP (v8.0+)
- MySQL (v5.7+)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd First_NextJs_Project
```

2. **Install frontend dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Setup the database**
   - Import the SQL file: `database/shop_db2.sql` into your MySQL server
   - Update database connection parameters in PHP scripts if needed (host, username, password)

4. **Configure PHP backend**
   - Ensure your PHP server is running and accessible
   - The frontend expects PHP endpoints at `http://localhost/next/` (adjust as needed in fetch calls)

5. **Start the development servers**
   - **PHP Server** (for backend APIs):
     ```bash
     # From project root
     php -S localhost:8000 -t "php script"
     ```
   - **Next.js Development Server**:
     ```bash
     npm run dev
     # or
     yarn dev
     # or
     pnpm dev
     ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - PHP Backend: http://localhost:8000 (for direct API access if needed)

## �� 📁 Project Structure

```
First_NextJs_Project/
├── app/                    # Next.js 13 App Router
│   ├── (main)/             # Public frontend routes
│   │   ├── page.js         # Homepage
│   │   ├── products/       # Product listing
│   │   ├── cart/           # Shopping cart
│   │   ├── store/          # Store page
│   │   ├── [id]/           # Individual product page
│   │   └── ...             # Other public pages (about, contact, etc.)
│   ├── (admin)/            # Admin dashboard routes
│   │   ├── adminDashboard/ # Admin interface
│   │   └── ...             # Admin pages for products, users, orders, messages
│   ├── (login.signup)/     # Authentication routes
│   │   ├── login/          # Login page
│   │   └── signUp/         # Registration page
│   ├── api/                # Next.js API routes
│   │   └── auth/           # NextAuth configuration
│   ├── hooks/              # Custom React hooks
│   ├── layout.js           # Root layout
│   └── ...                 # Other components and assets
├── php script/             # PHP backend APIs
│   ├── get_prod.php        # Product retrieval (GET)
│   ├── postToCart.php      # Cart operations (GET, POST, DELETE)
│   ├── conSession.php      # Session management
│   └── admin_manager.php   # Admin functions
├── database/               # Database files
│   └── shop_db2.sql        # MySQL database schema and sample data
├── public/                 # Static assets
├── styles/                 # CSS styles
├── package.json            # Project dependencies and scripts
�└── ...                     # Configuration files
```

## �� 🔑 Key Features

### User Features
- Browse products by category
- View detailed product information
- Add/remove items from shopping cart
- Update cart quantities
- User registration and login
- Profile management
- Order history

### Admin Features
- Dashboard overview
- Product management (CRUD operations)
- User management
- Order management
- Message monitoring
- Inventory tracking

### Technical Features
- Responsive design for mobile/desktop
- Secure authentication with NextAuth
- RESTful API communication between frontend and backend
- Protected routes based on user roles
- Error handling and loading states
- Session persistence via localStorage

## �� 🛠��️ Available Scripts

In the `package.json` file, you can run:

- `npm run dev` - Starts the Next.js development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality

## �� 🗃��️ Database Schema

The `shop_db2.sql` file contains the following tables:

1. **users** - User accounts with roles (user/admin)
2. **products** - Product catalog with name, price, image, description, category
3. **cart** - Shopping cart items linked to users
4. **orders** - Completed orders with payment status
5. **message** - User messages or communications

Sample data is included for immediate testing.

## �� 🌐 API Endpoints

The PHP backend provides these endpoints:

- `GET http://localhost/next/get_prod.php` - Fetch products (with ?category= parameter)
- `GET http://localhost/next/postToCart.php` - Get user's cart (with ?id= parameter)
- `POST http://localhost/next/postToCart.php` - Add/update cart items
- `DELETE http://localhost/next/postToCart.php` - Remove cart items
- Additional endpoints in `conSession.php` and `admin_manager.php` for session and admin functions

## �� 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices (smartphones)
- Tablets
- Desktop computers

## �� 🔒 Security Features

- Password hashing in database
- Prepared statements to prevent SQL injection
- CORS headers for secure API communication
- Role-based access control (user vs admin)
- Session management

## �� 🤝 Contributing

This is a learning project, but contributions are welcome! Please feel free to submit pull requests or open issues.

## �� 📄 License

This project is open source and available for learning purposes.

## �� 🙏 Acknowledgments

- Built with Next.js 13
- Uses PHP for backend functionality
- MySQL for data storage
- Inspired by modern e-commerce platforms

---

**Note**: This project was created for educational purposes to demonstrate full-stack web development concepts. Adjust configurations as needed for your local environment.