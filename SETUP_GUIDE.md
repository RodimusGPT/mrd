# 🚀 Quick Setup Guide for Maria's Ring Designer

## Pre-Deployment Checklist

### Step 1: Get fal.ai API Key (5 minutes)

- [ ] Go to https://fal.ai/
- [ ] Sign up for free account
- [ ] Navigate to Dashboard → API Keys
- [ ] Create new API key
- [ ] Copy the key (starts with `fal-...`)

### Step 2: Configure the Website (2 minutes)

- [ ] Open `config.js`
- [ ] Find line: `apiKey: 'YOUR_FAL_API_KEY_HERE'`
- [ ] Replace with your actual API key: `apiKey: 'fal-...'`
- [ ] Save the file

### Step 3: Test Locally (5 minutes)

**Option A: Using Python**
```bash
python3 -m http.server 8000
```

**Option B: Using Node.js**
```bash
npx http-server
```

**Option C: Just open the file**
- Double-click `index.html`
- (Note: Some features like API calls may not work without a server)

**Test Checklist:**
- [ ] Landing page loads with Maria's name
- [ ] Can navigate to Browse/Design screens
- [ ] Gallery shows 10 rings (with fallback images)
- [ ] Can type in text area (character counter works)
- [ ] Try generating a ring with AI
- [ ] Preview screen works
- [ ] Confirmation saves design

### Step 4: Deploy to GitHub Pages (10 minutes)

#### Option A: GitHub Website (No Command Line)

1. **Create Repository**
   - [ ] Go to https://github.com/new
   - [ ] Name it something like `marias-ring` or `proposal-2024`
   - [ ] Select "Private" (keep it secret!)
   - [ ] Don't initialize with README (we have our own)
   - [ ] Click "Create repository"

2. **Upload Files**
   - [ ] Click "uploading an existing file"
   - [ ] Drag ALL project files into the upload area
   - [ ] Add commit message: "💍 Initial commit"
   - [ ] Click "Commit changes"

3. **Enable GitHub Pages**
   - [ ] Go to repository Settings (gear icon)
   - [ ] Click "Pages" in left sidebar
   - [ ] Under "Source", select "main" branch
   - [ ] Click "Save"
   - [ ] Wait 2-3 minutes for deployment

4. **Get Your URL**
   - [ ] Look for the green success message
   - [ ] Copy your URL: `https://[username].github.io/[repo-name]`
   - [ ] Visit the URL to verify it works

#### Option B: Command Line (Git)

```bash
# Initialize git
git init
git add .
git commit -m "💍 Initial commit - Maria's Ring Designer"

# Create GitHub repo (private)
gh repo create marias-ring --private --source=. --remote=origin --push

# Enable GitHub Pages
# Go to GitHub website → Settings → Pages → Enable
```

### Step 5: Create QR Code (5 minutes)

1. **Generate QR Code**
   - [ ] Go to https://www.qr-code-generator.com/
   - [ ] Paste your GitHub Pages URL
   - [ ] Choose "High Resolution"
   - [ ] Download PNG

2. **Customize QR Code** (Optional)
   - [ ] Add a romantic frame or border
   - [ ] Change colors to match rose gold theme
   - [ ] Add text: "Scan to design your forever ring 💍"

3. **Print and Prepare**
   - [ ] Print on quality cardstock or photo paper
   - [ ] Consider laminating for durability
   - [ ] Cut to fit inside ring box
   - [ ] Test scanning with your phone

### Step 6: Final Testing (10 minutes)

**Mobile Testing:**
- [ ] Scan QR code with your phone
- [ ] Landing page loads correctly
- [ ] Text is readable (not too small)
- [ ] Buttons are easy to tap
- [ ] Gallery scrolls smoothly
- [ ] Text area works on mobile keyboard
- [ ] AI generation works (try one test)
- [ ] Images load properly

**Cross-Browser Testing:**
- [ ] Test in Safari (iOS)
- [ ] Test in Chrome (Android)
- [ ] Test in different orientations

**Network Testing:**
- [ ] Test on WiFi
- [ ] Test on cellular data (slower connection)

### Step 7: Prepare for Proposal Day

**One Day Before:**
- [ ] Verify website is still live
- [ ] Check fal.ai account has credits
- [ ] Test QR code one final time
- [ ] Print backup QR code (just in case)

**Proposal Day:**
- [ ] Ensure phone has good signal/WiFi
- [ ] QR code is in ring box
- [ ] Have backup: write URL on small card
- [ ] Take a deep breath 😊

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| API key error | Double-check key in `config.js`, verify it starts with `fal-` |
| Images not loading | Normal! Fallback URLs (Unsplash) will work automatically |
| QR not scanning | Ensure good lighting, try different QR app, or manually type URL |
| AI not generating | Check fal.ai credits, verify internet connection, check console |
| Page not deploying | Wait 5 minutes, check GitHub Actions tab, verify Pages is enabled |
| Design not saving | Check browser allows localStorage (not in private/incognito mode) |

## Emergency Backup Plan

If website has issues on proposal day:

**Plan B: Direct URL**
- Have the URL written on a small card
- Let Maria type it directly in browser

**Plan C: Pre-Generated Designs**
- Generate 3-4 rings with AI beforehand
- Screenshot them
- Have them ready to show

**Plan D: Traditional Approach**
- Show physical ring design catalogs
- Use the app later for final customization

## After She Says Yes! 💍

- [ ] Retrieve her design from localStorage (press 'A' key on the site)
- [ ] Screenshot the generated ring
- [ ] Save the design description
- [ ] Share with jeweler
- [ ] Keep the repository as a memory!

---

## Need Help?

**Configuration Issues:**
- Check `config.js` for typos
- Verify API key format

**Deployment Issues:**
- GitHub Pages docs: https://docs.github.com/en/pages
- Status: https://www.githubstatus.com/

**AI Generation Issues:**
- fal.ai docs: https://fal.ai/docs
- fal.ai status: https://status.fal.ai/

---

**You've got this! Maria is going to love it! 💖**
