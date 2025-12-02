// Configuration for the Ring Designer App
const CONFIG = {
    // =============================================
    // BACKEND API URL (Render.com)
    // This is where the secure backend runs - API key is stored there
    // =============================================
    API_URL: 'https://ring-designer-api.onrender.com',

    // =============================================
    // FIREBASE Configuration (Cloud Database - Optional)
    // Get this from: console.firebase.google.com → Project Settings
    // =============================================
    FIREBASE: {
        projectId: 'ring-b6de2',
    },

    // Example prompts for inspiration - Engagement Ring focused
    EXAMPLE_PROMPTS: [
        'Round brilliant solitaire on a thin platinum band with a hidden halo of tiny diamonds underneath the center stone',
        'Oval diamond with a delicate pavé halo, rose gold split-shank band encrusted with small diamonds',
        'Cushion cut center diamond in a vintage art-deco setting, white gold with milgrain edges and sapphire accents'
    ],

    // Engagement Ring Terminology Guide for users
    RING_GUIDE: {
        diamondShapes: [
            { name: 'Round Brilliant', desc: 'The classic choice - maximum sparkle and fire' },
            { name: 'Princess', desc: 'Modern square shape with brilliant sparkle' },
            { name: 'Cushion', desc: 'Soft square with rounded corners, romantic feel' },
            { name: 'Oval', desc: 'Elongated and elegant, makes fingers look longer' },
            { name: 'Pear', desc: 'Teardrop shape, unique and feminine' },
            { name: 'Emerald', desc: 'Rectangular with step cuts, sophisticated glamour' },
            { name: 'Marquise', desc: 'Boat-shaped, maximizes carat appearance' },
            { name: 'Radiant', desc: 'Rectangular with brilliant facets, lots of fire' },
            { name: 'Asscher', desc: 'Square step-cut, vintage Art Deco style' }
        ],
        settings: [
            { name: 'Solitaire', desc: 'Single diamond, timeless and elegant' },
            { name: 'Halo', desc: 'Center stone surrounded by smaller diamonds' },
            { name: 'Three-Stone', desc: 'Past, present, future represented' },
            { name: 'Pavé', desc: 'Band encrusted with tiny diamonds' },
            { name: 'Channel-Set', desc: 'Diamonds set flush within the band' },
            { name: 'Bezel', desc: 'Metal rim surrounds the diamond securely' },
            { name: 'Cathedral', desc: 'Arches rise to hold the center stone' }
        ],
        metals: [
            { name: 'Platinum', desc: 'Most durable, naturally white, hypoallergenic' },
            { name: 'White Gold', desc: 'Classic bright white, rhodium plated' },
            { name: 'Yellow Gold', desc: 'Traditional warm gold tone' },
            { name: 'Rose Gold', desc: 'Romantic pink hue, very trendy' }
        ],
        accents: [
            { name: 'Hidden Halo', desc: 'Diamonds under the center stone, surprise sparkle' },
            { name: 'Side Stones', desc: 'Additional diamonds flanking the center' },
            { name: 'Split Shank', desc: 'Band divides as it meets the center stone' },
            { name: 'Milgrain', desc: 'Tiny beaded metal detail, vintage look' },
            { name: 'Filigree', desc: 'Delicate metalwork patterns' }
        ]
    },

    // Example images for each ring term - shown when user taps terminology chips
    // Each term maps to an example image with caption
    TERM_EXAMPLES: {
        // Diamond Shapes
        'Round Brilliant': {
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
            caption: 'Round Brilliant - The classic choice with maximum sparkle'
        },
        'Princess': {
            image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
            caption: 'Princess Cut - Modern square shape with brilliant fire'
        },
        'Cushion': {
            image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
            caption: 'Cushion Cut - Soft rounded corners, romantic feel'
        },
        'Oval': {
            image: 'https://images.unsplash.com/photo-1586104237516-5765e76a6fc0?w=600&q=80',
            caption: 'Oval - Elongated elegance, flatters the finger'
        },
        'Pear': {
            image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
            caption: 'Pear - Unique teardrop shape, feminine and distinctive'
        },
        'Emerald': {
            image: 'https://images.unsplash.com/photo-1591209627710-d2427a94c82e?w=600&q=80',
            caption: 'Emerald Cut - Step-cut sophistication, Art Deco glamour'
        },
        'Marquise': {
            image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&q=80',
            caption: 'Marquise - Boat-shaped, maximizes carat appearance'
        },
        'Radiant': {
            image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
            caption: 'Radiant Cut - Rectangular brilliance with lots of fire'
        },
        'Asscher': {
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
            caption: 'Asscher - Square step-cut, vintage Art Deco icon'
        },

        // Settings
        'Solitaire': {
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
            caption: 'Solitaire - Single diamond, timeless elegance'
        },
        'Halo': {
            image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
            caption: 'Halo - Center stone surrounded by sparkling diamonds'
        },
        'Three-Stone': {
            image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&q=80',
            caption: 'Three-Stone - Past, present, and future'
        },
        'Pavé': {
            image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
            caption: 'Pavé - Band encrusted with tiny diamonds'
        },
        'Channel-Set': {
            image: 'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&q=80',
            caption: 'Channel-Set - Diamonds set flush within the band'
        },
        'Bezel': {
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
            caption: 'Bezel - Metal rim securely surrounds the diamond'
        },
        'Cathedral': {
            image: 'https://images.unsplash.com/photo-1586104237516-5765e76a6fc0?w=600&q=80',
            caption: 'Cathedral - Elegant arches rise to hold the center stone'
        },

        // Metals
        'Platinum': {
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
            caption: 'Platinum - Most durable, naturally white'
        },
        'White Gold': {
            image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
            caption: 'White Gold - Classic bright white finish'
        },
        'Yellow Gold': {
            image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&q=80',
            caption: 'Yellow Gold - Traditional warm golden tone'
        },
        'Rose Gold': {
            image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
            caption: 'Rose Gold - Romantic pink hue, very trendy'
        },

        // Accents
        'Hidden Halo': {
            image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
            caption: 'Hidden Halo - Surprise sparkle under the stone'
        },
        'Side Stones': {
            image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&q=80',
            caption: 'Side Stones - Diamonds flanking the center'
        },
        'Split Shank': {
            image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
            caption: 'Split Shank - Band divides at the center stone'
        },
        'Milgrain': {
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
            caption: 'Milgrain - Tiny beaded detail, vintage charm'
        },
        'Filigree': {
            image: 'https://images.unsplash.com/photo-1591209627710-d2427a94c82e?w=600&q=80',
            caption: 'Filigree - Delicate metalwork patterns'
        }
    },

    // Default placeholder image
    DEFAULT_PREVIEW: {
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
        caption: 'Tap any term to see an example'
    },

    // LocalStorage keys
    STORAGE_KEYS: {
        SELECTED_DESIGN: 'maria_ring_design',
        DESIGN_TIMESTAMP: 'maria_ring_timestamp',
        DESIGN_TYPE: 'maria_ring_type', // 'gallery' or 'custom'
    }
};
