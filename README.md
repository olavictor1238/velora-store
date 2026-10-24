# Velora Store

A premium, luxury-inspired storefront built with Next.js and a Stripe-ready checkout flow.

## Features
- Responsive storefront with hero section and curated product grid
- Search, category filters, and sorting controls
- Interactive shopping cart and checkout modal
- Real Stripe-ready API route for checkout
- Demo-safe fallback when Stripe keys are not configured
- Luxury branding and premium visual design

## Stack
- Next.js
- React
- TypeScript
- Stripe

## Screenshots

### Luxury storefront hero
![Velora storefront hero](https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80)

### Product showcase
![Velora product grid](https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80)

### Premium cart and checkout experience
![Velora cart experience](https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80)

## Local setup

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Stripe setup

Create a `.env.local` file and add your Stripe secret key:

```bash
STRIPE_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

When Stripe is configured, the checkout route creates a real Stripe Checkout Session. If no key is set, the app runs in demo mode and completes checkout locally for testing.

## Project goals

This project is designed to be a strong recruiter or stakeholder demo for a modern commerce storefront with production-minded architecture and a polished user experience.
