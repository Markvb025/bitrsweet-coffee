# Deployment Guide for BitrSweet Coffee Shop

## Deploying to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your project pushed to GitHub

### Steps

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Switch to SQLite for deployment compatibility"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration from `vercel.json`

3. **Environment Variables** (if needed):
   - In Vercel dashboard, go to your project settings
   - Add any environment variables if required
   - For this project, no additional environment variables are needed

### What happens during deployment:
- ✅ Backend API runs on Vercel's serverless functions
- ✅ SQLite database works seamlessly in production
- ✅ Frontend is served as static files
- ✅ No external database dependencies required

### Testing your deployment:
- Your app will be available at `https://your-project-name.vercel.app`
- The menu should load without any errors
- All API endpoints will work correctly

## Alternative Deployment Options

### Netlify
- Similar process to Vercel
- Upload your project folder
- Configure build settings if needed

### Heroku
- Requires a `Procfile` for the backend
- Add `web: node backend/server.js` to Procfile
- Deploy using Heroku CLI or GitHub integration

## Troubleshooting

### If menu doesn't load:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Ensure backend is running correctly

### If deployment fails:
1. Check `vercel.json` configuration
2. Ensure all dependencies are in `package.json`
3. Verify file paths are correct
