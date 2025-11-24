# Ring Images Directory

Add your curated ring images here.

## Image Guidelines

### File Naming
Match the names in `config.js` under `CURATED_RINGS`:
- `classic-solitaire.jpg`
- `halo-diamond.jpg`
- `vintage-romance.jpg`
- `three-stone.jpg`
- `rose-gold-accent.jpg`
- `pear-shaped.jpg`
- `cushion-cut.jpg`
- `oval-elegance.jpg`
- `emerald-cut.jpg`
- `modern-minimalist.jpg`

### Image Specifications
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 800x800px to 1200x1200px
- **Aspect Ratio**: Square (1:1) or slightly portrait
- **Background**: White or clean background preferred
- **Quality**: High resolution for crisp display

### Where to Find Ring Images

1. **Stock Photo Sites** (Free)
   - Unsplash: https://unsplash.com/s/photos/engagement-ring
   - Pexels: https://www.pexels.com/search/engagement%20ring/
   - Pixabay: https://pixabay.com/images/search/engagement-ring/

2. **Jewelry Store Websites**
   - Many allow downloading product images for personal use
   - Blue Nile, James Allen, Brilliant Earth

3. **AI-Generated Images**
   - Use fal.ai to generate your own ring images
   - Midjourney or DALL-E for custom designs

### Notes

- The website uses fallback URLs from Unsplash if local images aren't found
- So the site will work even without adding images here
- Adding custom images gives you more control over the curated selection
- Optimize images before uploading (use tools like TinyPNG)

### Image Optimization

To reduce file size without losing quality:
```bash
# Using ImageMagick
mogrify -resize 1000x1000 -quality 85 *.jpg

# Or use online tools
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
```
