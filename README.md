# Nxt Watch - Complete Solution

## Setup Instructions

1. Copy all files from this solution into your project's `src/` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the app:
   ```
   npm start
   ```

## Key Implementation Details

### Test Case Requirements Met:

**Login Route:**
- HTML `<form>` element
- `<label htmlFor="username">USERNAME</label>` with text input
- `<label htmlFor="password">PASSWORD</label>` with password input  
- `<label htmlFor="showPassword">Show Password</label>` with checkbox
- Submit button with type="submit" and text "Login", color #ffffff
- Error message displayed as paragraph on API failure
- Redirects authenticated users to "/"

**Protected Routes:**
- All protected routes redirect unauthenticated users to "/login"
- Authenticated users redirected from "/login" to "/"

**Theme Toggle:**
- Button with `data-testid="theme"` in Header
- Theme persists across route navigation
- Dark theme background colors: home #181818, others #0f0f0f
- Light theme: #f9f9f9

**Home Route:**
- `data-testid="home"` container with correct background colors
- Banner with `data-testid="banner"` and background image
- `alt="nxt watch logo"` in banner
- "Buy Nxt Watch Premium" text in banner
- "GET IT NOW" button in banner
- Close button with `data-testid="close"`
- Search input with `type="search"`
- Search button with `data-testid="searchButton"`
- Loader with `data-testid="loader"` wrapper
- `alt="video thumbnail"` on video thumbnails
- `alt="channel logo"` on channel logos
- No videos view: `alt="no videos"`, "No Search results found" heading, "Try different key words or remove search filter", Retry button
- Failure view: `alt="failure view"`, "Oops! Something Went Wrong" heading, "We are having some trouble" text, Retry button

**Sidebar:**
- NavLinks using Link component: Home, Trending, Gaming, Saved videos
- "CONTACT US" text
- `alt="facebook logo"`, `alt="twitter logo"`, `alt="linked in logo"` 
- "Enjoy! Now to see your channels and recommendations!" text

**Gaming Route:**
- `data-testid="gaming"` with correct bg colors
- Videos with `alt="video thumbnail"`
- title and view_count displayed

**Trending Route:**
- `data-testid="trending"` with correct bg colors

**Video Item Details Route:**
- `data-testid="videoItemDetails"`
- ReactPlayer for video playback
- Like, Dislike, Save buttons
- Active color: #2563eb, Inactive: #64748b
- Save toggles to "Saved" when active
- `alt="channel logo"` for channel image

**Saved Videos Route:**
- `data-testid="savedVideos"`
- No saved videos: `alt="no saved videos"`, "No saved videos found" heading, "You can save your videos while watching them"
- List with "Saved Videos" banner title

**Not Found Route:**
- `alt="not found"` image
- "Page Not Found" heading
- "we are sorry, the page you requested could not be found." text

## File Structure
```
src/
  App.js                          # Main app with routes + Context Provider
  App.css
  index.js
  index.css
  components/
    NxtWatchContext/index.js      # React Context for theme + saved videos
    ProtectedRoute/index.js       # Route guard
    Login/index.js                # Login page
    Header/index.js               # Top navigation bar
    Sidebar/index.js              # Side navigation
    Home/index.js                 # Home page with search
    Trending/index.js             # Trending videos
    Gaming/index.js               # Gaming videos
    VideoItemDetails/index.js     # Video player page
    SavedVideos/index.js          # Saved videos list
    NotFound/index.js             # 404 page
```
# NxtWatch_new
