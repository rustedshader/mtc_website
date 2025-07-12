# Microsoft Technical Community Website

## 🌟 Overview

Microsoft Technical Community was established in February 2018 with the vision of "Innovating, Inventing and Improvising" to educate fellow computer science enthusiasts about various aspects of the technical world. This website serves as the digital hub for the community, providing information about events, team members, and facilitating user registration and management.

## ✨ Features

- **Modern Design**: Beautiful, responsive UI built with Tailwind CSS and custom components
- **Event Management**: Display and manage technical events, workshops, and sessions
- **User Authentication**: Secure authentication system with NextAuth.js
- **Admin Dashboard**: Administrative interface for content and user management
- **User Profiles**: Personal dashboards for registered members
- **Contact System**: Contact form and inquiry management
- **Gallery**: Showcase of events and activities
- **Team Section**: Display of current team members
- **Blog/Events**: MDX-powered content management for events and articles
- **Payment Integration**: Support for event payments and registrations
- **Dark/Light Mode**: Theme switching capability

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Database (via Supabase)
- **NextAuth.js** - Authentication solution

### Database & Services
- **Supabase** - Backend-as-a-Service (PostgreSQL + Auth)
- **Prisma** - Database ORM and migrations

### Content Management
- **MDX** - Markdown with JSX for rich content
- **Gray Matter** - Front matter parsing
- **Next MDX Remote** - Remote MDX compilation

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin dashboard routes
│   ├── (auth)/            # Authentication pages
│   ├── (site)/            # Public site pages
│   ├── (user)/            # User dashboard routes
│   └── api/               # API routes
├── components/            # React components
│   └── ui/               # UI component library
├── config/               # Configuration files
├── events/               # MDX event files
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Bun (recommended)
- Supabase Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rustedshader/mtc_website.git
   cd mtc_website
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"
   DIRECT_URL="your_direct_postgresql_connection_string"
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
   
   # NextAuth
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database** (No need if using already configured Supabase)
   ```bash
   bunx prisma generate
   bunx prisma db push
   ```

5. **Run the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **Post** - Events and blog posts
- **User** - User accounts and profiles
- **Payment** - Payment records for events
- **Admin** - Administrative users

## 🔐 Authentication

Authentication is handled by NextAuth.js with support for:
- Email/password authentication
- Session management
- Role-based access control (Admin/User)
- Protected routes

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes and orientations

## 🚀 Deployment

The application can be deployed on various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Ask in Github Issues

## 🙏 Acknowledgments

- Microsoft Technical Community team
- UPES University

---

**Built with ❤️ by the MTC Techinical Team**