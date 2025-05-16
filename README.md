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
