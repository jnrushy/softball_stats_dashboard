# SDYS Softball Stats Dashboard

A comprehensive dashboard for tracking and analyzing softball team statistics, built with React, TypeScript, and modern web technologies.

## Features

- **Team Overview**: Key statistics and performance metrics
- **Player Roster**: Individual player cards with detailed stats
- **Statistics Breakdown**: Charts and visualizations of team data
- **Advanced Analytics**: Sabermetric calculations (WAR, OPS, wOBA)
- **CSV Upload**: Easy data import from spreadsheet files
- **Mobile Responsive**: Optimized for iOS and Android devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Charts**: Recharts
- **Data Processing**: PapaParse for CSV handling

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

## Deployment

### Option 1: Netlify (Recommended)

1. **Drag & Drop Method**:
   - Run `npm run build`
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area
   - Set custom domain to `softball.jasonrush.info`

2. **Git Integration**:
   - Push code to GitHub
   - Connect repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add custom domain

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow prompts to deploy
4. Add custom domain in Vercel dashboard

### Option 3: Traditional Web Hosting

1. Run `npm run build`
2. Upload contents of `dist` folder to your web server
3. Configure server to serve `index.html` for all routes
4. Point `softball.jasonrush.info` to your server

## Data Format

The dashboard accepts four CSV files:
- **Offense**: Batting statistics
- **Pitching**: Pitching statistics  
- **Defense**: Fielding statistics
- **Catching**: Catcher-specific statistics

## Custom Domain Setup

To use `softball.jasonrush.info`:

1. **DNS Configuration**:
   - Add CNAME record: `softball.jasonrush.info` → `your-deployment-url`
   - Or A record pointing to your server IP

2. **SSL Certificate**:
   - Most platforms (Netlify, Vercel) provide automatic SSL
   - For traditional hosting, install SSL certificate

## Performance

- Optimized bundle size with code splitting
- Responsive design for all devices
- Fast loading with modern build tools
- CDN distribution for global performance

## Support

For issues or questions, please refer to the project documentation or contact the development team.
