# Deploying to Netlify (Recommended Solution)

## Why Netlify Instead of Vercel

The project was experiencing build failures on Vercel due to memory constraints during the build process. Netlify provides better memory allocation for builds with complex animations and components.

## Deployment Steps

### 1. Prepare for Netlify Deployment

The project is already configured with `netlify.toml` file that includes:
- Increased memory allocation (8GB)
- Proper build commands
- Publish directory configuration

### 2. Deploy to Netlify

#### Option A: Drag and Drop
1. Build the project locally: `npm run build:netlify`
2. Go to https://app.netlify.com/drop
3. Drag the `build` folder to Netlify
4. Site will be deployed with a temporary URL

#### Option B: Git Integration (Recommended)
1. Go to https://app.netlify.com
2. Click "Add new site"
3. Choose "Connect to Git"
4. Select this repository (physical-ai-humanoid-robotics-textbook)
5. Netlify will automatically detect the settings from `netlify.toml`
6. Click "Deploy site"

#### Option C: Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy --dir=build --prod`

### 3. Build Configuration

The `netlify.toml` file includes:
- Memory allocation: 8GB (`--max-old-space-size=8192`)
- Build command: `npm run build:netlify`
- Publish directory: `build`
- Automatic Lighthouse reporting

### 4. Environment Variables

After deployment, you may need to set environment variables in Netlify:
- Go to Site Settings → Build & Deploy → Environment
- Add any required environment variables

### 5. Post-Deployment

Once deployed to Netlify:
- Your site will have a URL like `https://[your-site-name].netlify.app`
- Update the backend CORS settings to include this Netlify URL
- When backend is deployed, update the frontend to use the backend URL

## Advantages of Netlify for This Project

- Better memory allocation for builds with complex animations
- No build timeouts like Vercel
- Easy drag-and-drop deployment
- Automatic HTTPS
- Global CDN distribution
- Form handling and serverless functions support

## Backend Connection

After deploying frontend to Netlify:
1. Deploy backend to Render (instructions in BACKEND_RENDER_DEPLOYMENT.md)
2. Update frontend to use the backend URL
3. Both sites will be connected and fully functional