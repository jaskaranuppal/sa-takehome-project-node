# Simple Checkout Example with Stripe - Stripe Press
This project is an e-commerce application that a customer can use to purchase a book online. This application is developed with Node.js, Express, and Handlebars. The primary objective is to integrate Stripe elements and APIs for handling one time payments.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Application Architecture](#application-architecture)
- [Solution Architecture and Approach](#solution-architecture-and-approach)
- [Documentation References](#documentation-references)
- [Challenges Faced](#challenges-faced)
- [Future Enhancements](#future-enhancements)

## Features

- Users can browse books and select one to purchase.
- Checkout process is handled using Stripe Elements.
- Payments are processed through Stripe, and a confirmation page displays the total amount charged and payment intent ID.

## Technologies Used

- Node.js
- Express.js
- Handlebars (templating engine)
- Stripe API
- dotenv (for environment variables)

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- A Stripe account (with API keys)

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/mattmitchell6/sa-takehome-project-node.git
   cd sa-takehome-project-node
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables: rename the `sample.env` to `.env` file in the root directory and add your Stripe API keys:
   ```env
   STRIPE_SECRET_KEY=pk_test_xxxxxxxxx
   STRIPE_PUBLIC_KEY=sk_test_xxxxxxxxx
   ```
4. Start the application:
   ```sh
   npm start
   ```
   The server will start on `http://localhost:3000/`

## Application Architecture

- `server.js`: The main entry point handling routing and Stripe integration.
- `views/`: Contains Handlebars templates for rendering pages.
- `public/`: Static assets like CSS and JavaScript.
- Uses `express-handlebars` to dynamically render pages.
- Visit [here](https://lucid.app/lucidchart/b5c53e81-6c3c-4c46-8647-9fa2af261010/edit?viewport_loc=-1096%2C-559%2C2097%2C1138%2C0_0&invitationId=inv_af01c1da-832c-4d23-ab9a-459bfb841886) for the sequence diagram

## Solution Architecture and Approach

1. Users visit the homepage (index) and select a book to purchase.
2. When the user clicks "Pay," a request is sent to `/checkout`.
3. The server creates a Stripe Payment Intent via Stripe API and renders the checkout page with a Stripe Payment Element.
4. Users enter their payment details and complete the purchase by hitting Pay button. 
5. A payment confirmation page displays the total amount charged and payment intent ID.

The goal is to use the provided boilerplate code to integrate Stripe APIs effectively. Since Stripe Elements is used on both the client and server sides, the strategy is to set the pricing on the server to prevent malicious users from tampering with the API call and submitting incorrect pricing. The server sends back the correct item price, and a call is made to create a payment intent. The client secret from this intent is then used to render the payment element on the client side. This payment element manages client-side payment validation and securely sends the credit card details to Stripe’s backend. The “Pay $23” button, for example, triggers the confirm payment API to finalize the transaction. Once a success status is received, the payment intent ID is returned and shown to the customer.
[Sequence Diagram for reference](https://lucid.app/lucidchart/b5c53e81-6c3c-4c46-8647-9fa2af261010/edit?viewport_loc=-1096%2C-559%2C2097%2C1138%2C0_0&invitationId=inv_af01c1da-832c-4d23-ab9a-459bfb841886)


## Documentation References

1. [Stripe Payment Intent API](https://docs.stripe.com/api/payment_intents))
2. [Stripe Accept Payment Sample](https://github.com/stripe-samples/accept-a-payment))
3. [Stripe Elements Examples](https://github.com/stripe/elements-examples)
4. [Stripe Payment Element Doc](https://docs.stripe.com/payments/payment-element)
5. [Handlebars Documentation](https://handlebarsjs.com/)
6. [Bootstrap Documentation](https://getbootstrap.com/docs)


## Challenges Faced

- Handling Stripe's asynchronous API responses.
- Familiarizing with Node.js & Express
- Setting up Handlebars templates to pass data.
- Handling amounts in cents to dollars in API call

## Future Enhancements

- **User Management**: Allow users to create accounts, save payment methods and track order history.
- **Database Integration**: Inventory management and storing transactions in a database.
- **Shipping & Taxes Integration**: Add functionality to calculate taxes and shipping costs in the checkout.
- **Webhooks Integration**: Use Stripe Webhooks to handle various payment events.
- **External Integrations**: Integrating with 3rd party services such as emails for Order Status updates, Shipping & Tracking integrations with carriers.
