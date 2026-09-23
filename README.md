# Sangbe Foundation Website

Official website for **Sangbe Foundation**, a nonprofit organization supporting communities through awareness, disaster relief, community assistance, and humanitarian initiatives.

The platform provides a central digital presence for the Foundation's programs, activities, team, partnerships, volunteer opportunities, donation initiatives, and community support services.

## About Sangbe Foundation

Sangbe Foundation is a registered nonprofit organization established in **2019** and based in **Busumbala, West Coast Region, The Gambia**.

The Foundation works to strengthen communities and support vulnerable people through initiatives focused on:

- Drug abuse awareness and prevention
- Community assistance
- Disaster and flood relief
- Humanitarian support
- Youth and community engagement
- Partnerships and collaborative initiatives

**Stronger Communities. Brighter Futures.**

## Website Features

The website includes:

- **Home** — Introduction to the Foundation, its work, and impact
- **About** — Background, values, mission, and organizational story
- **Programs** — Overview of the Foundation's core areas of work
- **Drug Abuse Awareness** — Awareness and prevention initiatives
- **Disaster Relief** — Emergency and disaster-response activities
- **Community Assistance** — Support for individuals and communities
- **Events** — Foundation events and activities
- **Gallery** — Visual documentation of activities and community work
- **Our Team** — Leadership, management, representatives, and individual profiles
- **Partners** — Partnership and collaboration opportunities
- **Volunteer** — Volunteer registration and areas of interest
- **Request Help** — Assistance request form for individuals and communities
- **Donate** — Donation method and contribution workflow
- **Contact** — General inquiries and communication

## Technology Stack

The website is built with:

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Motion](https://motion.dev/) for interface animations

The project uses the **Next.js App Router** and includes server-side API routes for website forms and donation requests.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

Check your versions:

```bash
node --version
npm --version
```

### Clone the Repository

```bash
git clone https://github.com/Lanlokun/sangbe-foundation.git
cd sangbe-foundation
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

in your browser.

## Production Build

To create and verify a production build:

```bash
npm run build
```

To run the production server locally:

```bash
npm start
```

## Project Structure

```text
sangbe-foundation/
├── public/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── api/
│   │   ├── awareness/
│   │   ├── contact/
│   │   ├── disaster-relief/
│   │   ├── donate/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── partners/
│   │   ├── programs/
│   │   ├── request-help/
│   │   ├── team/
│   │   └── volunteer/
│   │
│   ├── components/
│   │   ├── about/
│   │   ├── donate/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── partners/
│   │   ├── request-help/
│   │   ├── team/
│   │   ├── ui/
│   │   └── volunteer/
│   │
│   ├── data/
│   ├── lib/
│   └── types/
│
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## API Routes

The project includes API endpoints for:

```text
/api/contact
/api/donations
/api/request-help
/api/volunteer
```

These endpoints currently provide server-side validation and processing foundations for the website forms.

Production integrations such as persistent database storage, transactional email, payment verification, rate limiting, and spam protection should be configured before enabling the relevant workflows in production.

## Environment Variables

Sensitive credentials must never be committed to the repository.

Local environment variables should be stored in:

```text
.env.local
```

Environment files and private keys are excluded through `.gitignore`.

When production integrations are introduced, an `.env.example` file should document required environment variable names without containing actual secrets.

## Team Profiles

Team information is centrally managed through:

```text
src/data/team.ts
```

Individual profiles are dynamically generated through:

```text
/team/[slug]
```

This allows team members to be added or updated without creating separate hard-coded pages for every profile.

## Contributing

For project contributors:

1. Pull the latest changes.
2. Create a dedicated branch for significant changes.
3. Make and test your changes locally.
4. Run the production build before committing.
5. Submit changes for review before merging into `main`.

Before committing:

```bash
npm run build
```

## Security

Do not commit:

- `.env` files
- API keys
- Payment credentials
- Database credentials
- Private certificates
- Private keys
- Production secrets

If a secret is accidentally committed, it should be considered compromised and rotated immediately.

## Status

The website is under active development.

Some integrations, content, team information, event data, gallery content, payment details, and backend services may continue to be updated as the platform moves toward production deployment.

## Organization

**Sangbe Foundation**  
Busumbala, West Coast Region  
The Gambia

**Stronger Communities. Brighter Futures.**

---

© Sangbe Foundation. All rights reserved.