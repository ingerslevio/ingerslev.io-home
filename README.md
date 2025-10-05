# Emil Ingerslev - Races

A personal races page built with Astro, showcasing past and upcoming running races with bilingual support (English/Danish) and media content.

## Features

- **Race Management**: Display past and upcoming races with detailed information
- **Bilingual Support**: Full English and Danish language support with dynamic switching
- **Media Integration**: Support for photos and videos in race content
- **Project Links**: Past races can include links to related projects
- **Responsive Design**: Modern, mobile-friendly UI with clean styling
- **Race Categories**: Support for different race types (marathon, trail, ultra, etc.)
- **Results Display**: Show race results including time, position, and pace

## Project Structure

```
src/
├── components/
│   ├── RaceCard.astro      # Individual race card component
│   └── LanguageSwitcher.astro # Language switching component
├── data/
│   └── races.ts           # Race data and utility functions
├── layouts/
│   └── Layout.astro       # Main layout component
├── pages/
│   ├── index.astro       # Redirects to races page
│   └── races.astro       # Main races page
└── types/
    └── race.ts           # TypeScript type definitions
```

## Race Data Structure

Each race includes:

- Bilingual name and description
- Date and location
- Category and distance
- Status (upcoming/completed)
- Results (for completed races)
- Media (photos and videos)
- Project URL (for completed races)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding New Races

To add new races, edit `src/data/races.ts` and add new race objects following the `Race` interface defined in `src/types/race.ts`.

## Customization

- **Styling**: Modify CSS in component files or create a global stylesheet
- **Languages**: Add new languages by extending the `Language` type and updating translations
- **Race Categories**: Add new categories by extending the race category union type
- **Media**: Replace example URLs with actual media URLs or implement a media management system

## Deployment

This project can be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

The build output will be in the `dist/` directory after running `npm run build`.
