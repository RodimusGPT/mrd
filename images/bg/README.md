# Background Images Directory

Optional: Add background textures or images here if you want to customize the landing screen background.

## Current Design

The landing page currently uses a CSS gradient background:
```css
background: linear-gradient(135deg, var(--ivory) 0%, var(--blush) 100%);
```

## To Add Custom Background

1. **Add your image** to this directory (e.g., `romantic-texture.jpg`)

2. **Update CSS** in `css/styles.css`:

```css
#landingScreen {
    background: url('../images/bg/romantic-texture.jpg') center/cover;
    /* Or overlay gradient on image: */
    background:
        linear-gradient(135deg, rgba(255,254,247,0.9) 0%, rgba(248,232,232,0.9) 100%),
        url('../images/bg/romantic-texture.jpg') center/cover;
}
```

## Background Image Ideas

- Subtle textures (paper, fabric, marble)
- Soft bokeh lights
- Abstract rose gold patterns
- Elegant floral patterns (very subtle)
- Geometric patterns (minimal)

## Specifications

- **Format**: JPG or WebP (better compression)
- **Size**: 1920x1080px minimum (for desktop)
- **File Size**: Keep under 500KB (optimize!)
- **Style**: Subtle, won't distract from content
- **Colors**: Match rose gold/ivory theme

## Image Sources

Free textures and backgrounds:
- https://www.transparenttextures.com/
- https://unsplash.com/s/photos/texture
- https://www.pexels.com/search/subtle%20background/

Remember: Less is more. The current gradient is elegant and loads instantly!
