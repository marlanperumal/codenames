# Codenames Web Game

A modern web implementation of the popular word association board game Codenames, built with Next.js, TypeScript, and Supabase.

## Features

- Real-time multiplayer gameplay using Supabase Realtime
- Modern, responsive UI built with Tailwind CSS and Radix UI
- Server-side authentication and game state management
- Type-safe development with TypeScript
- Dark/light theme support

## Tech Stack

- **Frontend Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS and Shadcn UI
- **UI Components**: Radix UI
- **State Management**: React Hooks with use-immer
- **Form Handling**: React Hook Form with Zod validation
- **Backend & Real-time**: Supabase
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm package manager
- Supabase account and project
- Docker and Docker Compose (for local Supabase development)

### Local Supabase Setup

1. Install the Supabase CLI:
```bash
# Using npm
npm install -g supabase

# Or using Homebrew (macOS)
brew install supabase/tap/supabase
```

2. Start the local Supabase development environment:
```bash
supabase start
```

This will:
- Start a local Supabase instance using Docker
- Create a local database with the schema defined in `supabase/schemas/`
- Set up local API endpoints and authentication
- Generate local API credentials

3. Update your `.env.local` file to use local Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

4. To stop the local Supabase instance:
```bash
supabase stop
```

5. To reset the local database:
```bash
supabase db reset
```

6. To view the local Supabase dashboard:
```bash
supabase dashboard
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/marlanperumal/codenames.git
cd codenames
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Generate Supabase types:
```bash
pnpm supabase-gen-types
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared logic
- `/public` - Static assets
- `/utils` - Helper functions and type definitions
- `/supabase` - Supabase configuration and migrations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original Codenames board game by Vlaada Chvátil
- Next.js team for the amazing framework
- Supabase team for the real-time database solution
