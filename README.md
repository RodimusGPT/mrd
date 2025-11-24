# 💍 Maria's Ring Designer

A beautiful, romantic proposal website where Maria can design her dream engagement ring using AI or browse curated designs.

## ✨ Features

- **Romantic Landing Experience**: Personalized welcome with Maria's name
- **Two Design Paths**:
  - Browse Gallery: 10 curated, timeless ring designs
  - AI Designer: Describe a custom ring and generate it with Google's Imagen 3 (via fal.ai)
- **Mobile-First Design**: Optimized for QR code access on phones
- **Elegant UI**: Rose gold and ivory color palette with smooth animations
- **Design Persistence**: Saves Maria's choice in browser storage

## 🚀 Quick Start

### Prerequisites

1. **fal.ai API Key**: Sign up at [fal.ai](https://fal.ai/) and get your API key
2. **Ring Images**: Optional - add your own ring images to `images/rings/` directory

### Setup Instructions

1. **Configure API Key**

   Edit `config.js` and replace the placeholder:
   ```javascript
   apiKey: 'YOUR_FAL_API_KEY_HERE'  // Replace with your actual fal.ai API key
   ```

2. **Add Ring Images** (Optional)

   The gallery uses fallback URLs from Unsplash by default. To use custom images:
   - Add your ring images to `images/rings/` directory
   - Name them according to the config (e.g., `classic-solitaire.jpg`)
   - Supported formats: JPG, PNG, WebP
   - Recommended size: 800x800px to 1200x1200px

3. **Test Locally**

   Open `index.html` in a web browser:
   ```bash
   # Using Python's built-in server
   python3 -m http.server 8000

   # Or using Node's http-server
   npx http-server
   ```

   Then navigate to `http://localhost:8000`

## 📦 Deployment to GitHub Pages

### Method 1: GitHub UI (Easiest)

1. **Create Repository**
   - Go to GitHub and create a new repository (e.g., `marias-ring`)
   - Make it private to keep it secret until the proposal!

2. **Upload Files**
   - Click "Add file" → "Upload files"
   - Drag and drop all project files
   - Commit the changes

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://[username].github.io/[repository-name]`

### Method 2: Git Command Line

```bash
# Initialize git repository
git init
git add .
git commit -m "💍 Initial commit - Maria's Ring Designer"

# Create GitHub repository (use GitHub CLI or web interface)
gh repo create marias-ring --private --source=. --remote=origin --push

# Or connect to existing repository
git remote add origin https://github.com/[username]/[repository-name].git
git branch -M main
git push -u origin main

# Enable GitHub Pages
gh repo edit --enable-pages --pages-branch main
```

### Verify Deployment

1. Wait 2-3 minutes for deployment
2. Visit your GitHub Pages URL
3. Test on your phone by entering the URL
4. Verify all screens work correctly

## 📱 Creating the QR Code

1. **Get Your URL**
   - GitHub Pages URL: `https://[username].github.io/[repository-name]`
   - Or use a custom domain if configured

2. **Generate QR Code**
   - Use [QR Code Generator](https://www.qr-code-generator.com/)
   - Or use [QRCode Monkey](https://www.qrcode-monkey.com/)
   - Paste your GitHub Pages URL
   - Download high-resolution PNG

3. **Prepare for Ring Box**
   - Print on quality paper/cardstock
   - Consider laminating for durability
   - Size to fit inside ring box
   - Add romantic message below QR code:
     ```
     Scan to design your forever ring
     💍
     ```

## 🎨 Customization

### Change Color Scheme

Edit CSS variables in `css/styles.css`:

```css
:root {
    --rose-gold: #D4AF7A;  /* Primary accent color */
    --ivory: #FFFEF7;      /* Background */
    --charcoal: #2C2C2C;   /* Text color */
    --blush: #F8E8E8;      /* Secondary accent */
}
```

### Update Ring Gallery

Edit `CONFIG.CURATED_RINGS` in `config.js`:

```javascript
{
    id: 11,
    title: 'Your Custom Ring Name',
    description: 'Description of the ring style',
    imageUrl: 'images/rings/your-image.jpg',
    fallbackUrl: 'https://fallback-url.com/image.jpg'
}
```

### Modify AI Prompts

Edit prompt engineering in `config.js`:

```javascript
FAL_API: {
    promptPrefix: 'A beautiful engagement ring: ',
    promptSuffix: ', professional jewelry photography, white background, high detail, 4K, studio lighting',
}
```

### Change Text/Copy

All text is in `index.html` - search and replace to customize:
- Landing page message
- Screen titles
- Button text
- Thank you message

## 🔧 Technical Details

### Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **AI Model**: Google Imagen 3 (nano-banana-pro) via fal.ai
- **Hosting**: GitHub Pages (static site)
- **Storage**: Browser localStorage for design persistence

### File Structure

```
/
├── index.html          # Main HTML (single-page app)
├── config.js           # Configuration and data
├── css/
│   └── styles.css      # All styling and design system
├── js/
│   ├── main.js         # App logic and navigation
│   └── fal-api.js      # fal.ai API integration
├── images/
│   ├── rings/          # Ring gallery images (optional)
│   └── bg/             # Background images (optional)
└── README.md           # This file
```

### Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Safari (iOS and macOS)
- ✅ Firefox
- ✅ Mobile browsers

## 🎯 User Flow

1. Maria scans QR code from ring box
2. Landing page appears with her name
3. Two options: Browse designs or AI designer
4. **Browse Path**: Select from curated gallery
5. **Design Path**: Describe dream ring → AI generates image
6. Preview selected/generated design
7. Confirm choice
8. Romantic thank you message + design saved

## 🔒 Privacy & Security

- **API Key**: Stored client-side (only Maria will access the site)
- **Data Storage**: Design saved locally in browser (localStorage)
- **Private Repository**: Keep GitHub repo private until after proposal
- **No Backend**: No server = no data collection

## 💡 Tips for Success

1. **Test Thoroughly**: Try all paths before the proposal
2. **Test on Mobile**: QR codes open on phones - test on actual device
3. **Check API Limits**: Monitor fal.ai usage/credits
4. **Backup Plan**: Screenshot generated designs as backup
5. **Network**: Ensure good internet connection for AI generation
6. **Timing**: Deploy 1-2 days before proposal to ensure stability

## 📸 Retrieving Maria's Design

After Maria uses the site, her design is saved to browser localStorage. To retrieve it:

### Option 1: Browser Developer Tools

1. Open the site where Maria made her choice
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to "Application" tab → "Local Storage"
4. Look for keys: `maria_ring_design`, `maria_ring_type`
5. Copy the JSON data

### Option 2: Add Admin Panel (Optional)

Add this to `index.html` before closing `</body>`:

```html
<!-- Secret Admin Panel (press 'A' key to view saved design) -->
<script>
document.addEventListener('keydown', (e) => {
    if (e.key === 'A' || e.key === 'a') {
        const saved = localStorage.getItem('maria_ring_design');
        if (saved) {
            console.log('Saved Design:', JSON.parse(saved));
            alert('Check browser console for design details');
        } else {
            alert('No design saved yet');
        }
    }
});
</script>
```

Press 'A' key to view saved design in console.

## 🆘 Troubleshooting

### Issue: AI Generation Not Working

**Solutions:**
- Verify API key is correct in `config.js`
- Check fal.ai account credits/limits
- Check browser console for error messages
- Ensure stable internet connection

### Issue: Images Not Loading

**Solutions:**
- Check image paths in `config.js`
- Verify images exist in `images/rings/` directory
- Fallback URLs (Unsplash) should work by default
- Check browser console for 404 errors

### Issue: QR Code Not Working

**Solutions:**
- Verify GitHub Pages is enabled and deployed
- Wait 2-3 minutes after enabling Pages
- Test URL directly in browser first
- Ensure QR code contains correct URL

### Issue: Design Not Saving

**Solutions:**
- Check if browser allows localStorage (private/incognito mode may block)
- Try different browser
- Check browser console for errors

## 📞 Support

For technical issues:
1. Check browser console (F12 → Console tab)
2. Verify all configuration in `config.js`
3. Test in different browser
4. Check fal.ai API status

## 💖 After the Proposal

Don't forget to:
1. Retrieve Maria's design from localStorage
2. Screenshot or save the generated image
3. Share the design with jeweler
4. Keep the repository as a beautiful memory!

---

**Good luck with your proposal! 💍✨**

Made with love for Maria
