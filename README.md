# E-Commerce Frontend

A modern and responsive **E-Commerce frontend** built with React and TypeScript.

The application provides a complete shopping experience, including product browsing, product details, cart management, checkout, payments, orders, user account management, and an administrative interface.

## Overview

The E-Commerce frontend communicates with the backend through REST APIs and provides interfaces for both customers and administrators.

## Features

- Secure user authentication & authorization (Sign Up, Login, Logout, Email Verification, Password Reset)
- Product browsing, search, filtering, and product details
- Product variants, images, reviews, and ratings
- Shopping cart and smooth checkout process
- Coupon and discount functionality
- Secure payment processing via Razorpay
- Order placement, order history, order details, and order cancellation
- User profile and address management
- Admin panel for managing products, categories, variants, orders, coupons, and reviews
- Responsive design for mobile, tablet, and desktop users
- Light and dark theme support

## Technology Stack

- **Language:** TypeScript
- **Framework:** React
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Server State:** TanStack React Query
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **API Communication:** REST API
- **Deployment:** Vercel

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ma3llim/ecommerce-frontend.git
    cd ecommerce-frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    ```bash
    cp .env.example .env
    ```

    On Windows:

    ```powershell
    Copy-Item .env.example .env
    ```

    Copy the `.env.example` file and update the `.env` file with the required values for your environment.

4. **Start the Development Server**

    ```bash
    npm run dev
    ```

5. **Access the Application**

    The frontend will be available at:

    ```text
    http://localhost:5173
    ```

## Deployment

The frontend is deployed independently using Vercel.

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Vercel
    │
    ▼
E-Commerce Frontend
    │
    │ HTTPS / REST API
    ▼
E-Commerce Backend
```

The backend is deployed separately on AWS EC2.

## License

This project is provided for educational and portfolio purposes.

See the [LICENSE](LICENSE) file in the repository for the applicable license terms.

## Acknowledgements

1. **React:** Flexible and component-based frontend development.
2. **TypeScript:** Type-safe and maintainable application development.
3. **Vite:** Fast and modern frontend development and build tooling.
4. **Redux Toolkit:** Efficient client-side state management.
5. **TanStack React Query:** Server-state management, caching, and data synchronization.
6. **Tailwind CSS:** Utility-first styling and responsive UI development.
7. **shadcn/ui:** Reusable and accessible UI components.
8. **Vercel:** Frontend deployment and hosting.
9. **Razorpay:** Secure and seamless payment integration.
