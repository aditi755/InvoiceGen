# InvoiceGen - Invoice Management System

**InvoiceGen** is a full-featured **Invoice Management System** built with modern web technologies like **Next.js 14**, **TypeScript**, **PostgreSQL**, and **Shadcn UI**. This application enables users to create, track, and manage their invoices in various states such as **paid**, **void**, and **open**. It also integrates with **PhonePe** to provide seamless payment functionality, allowing users to monitor the status of each invoice after payment.

## Features

- **Invoice Tracking**: Track and manage invoices in multiple states (Paid, Void, Open, Uncollectible).
- **PhonePe Integration**: Allows users to securely pay invoices through PhonePe and monitor payment statuses.
- **Secure Authentication**: Uses **Clerk** for social login, user authentication, and route protection.
- **User-Friendly Dashboard**: Responsive dashboard built with **Shadcn UI** and **Tailwind CSS** for a smooth user experience.
- **Dynamic Routing**: Invoices are dynamically generated and accessible via unique routes.
- **Data Management**: Supports CRUD operations for invoices, along with customer details and organization management.

## Tech Stack

- **Next.js 15**: Modern React framework with server-side rendering and API routes.
- **TypeScript**: Strongly typed language to ensure robust code.
- **PostgreSQL**: Database for storing invoices, users, and organization details.
- **Drizzle ORM**: Lightweight and efficient ORM for database migrations and queries.
- **Shadcn UI**: UI components for building a responsive and user-friendly interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Clerk**: Authentication provider for social logins and multi-factor authentication.
- **PhonePe**: Payment gateway integration for handling invoice payments.

## Demo

![Screenshot (121)](https://github.com/user-attachments/assets/0efc5567-9296-49bd-bce1-9e6845771f6c)

![Screenshot (122)](https://github.com/user-attachments/assets/0355f230-6d03-488c-a492-d286a0cb5591)

![Screenshot (125)](https://github.com/user-attachments/assets/f9d06fc7-f4b2-4b18-a21e-8b4d890dae07)

![Screenshot (123)](https://github.com/user-attachments/assets/e5a1b185-3db6-4efd-8e10-2638797826a0)

![Screenshot (124)](https://github.com/user-attachments/assets/31ad2cf6-d907-41ce-b590-79126d6b2a7a)


## Setup Instructions

1. Clone the repository:
 ```
   git clone https://github.com/yourusername/invoicegen.git
 ```
3. Navigate into the project directory:
 ```
cd invoicegen
 ```
3. Install dependencies:
 ```
npm install
```
4. Set up environment variables:
Create a .env.local file in the root of your project.
Add the following environment variables:
```
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key
DATABASE_URL=your-postgresql-database-url
NEXT_PUBLIC_PHONEPE_API=your-phonepe-api-key (No need to add this since currently the payment setup is in UAT testing mode so project already contains the phonePe testing payment URL and merchant id)
```
5. Run database migrations using Drizzle ORM:
```
npm run migrate
```
6. Start the development server:
```
next dev
```

