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

    // Classic Engagement Ring Gallery - Popular Diamond Styles
    // Using verified engagement ring images from Unsplash
    CURATED_RINGS: [
        {
            id: 1,
            title: 'Round Brilliant Solitaire',
            description: 'The timeless classic - a stunning round brilliant diamond on a sleek platinum band. Maximum sparkle, eternal elegance.',
            style: 'Solitaire',
            diamond: 'Round Brilliant',
            metal: 'Platinum',
            fallbackUrl: 'https://images.unsplash.com/photo-1586104237516-5765e76a6fc0?w=500&q=80'
        },
        {
            id: 2,
            title: 'Oval Halo',
            description: 'An elegant oval center diamond embraced by a dazzling halo of micro-pavé diamonds. Elongates the finger beautifully.',
            style: 'Halo',
            diamond: 'Oval',
            metal: 'White Gold',
            fallbackUrl: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=500&q=80'
        },
        {
            id: 3,
            title: 'Cushion Cut Romance',
            description: 'Soft, romantic cushion cut diamond in a cathedral setting with delicate pavé band. Vintage charm meets modern brilliance.',
            style: 'Cathedral Pavé',
            diamond: 'Cushion',
            metal: 'Rose Gold',
            fallbackUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&q=80'
        },
        {
            id: 4,
            title: 'Three-Stone Legacy',
            description: 'Past, present, and future symbolized by three brilliant diamonds. A meaningful choice with spectacular presence.',
            style: 'Three-Stone',
            diamond: 'Round Brilliant',
            metal: 'Platinum',
            fallbackUrl: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&q=80'
        },
        {
            id: 5,
            title: 'Princess Cut Modern',
            description: 'Bold princess cut diamond in a sleek channel-set band. Contemporary geometry with dazzling fire.',
            style: 'Channel-Set',
            diamond: 'Princess',
            metal: 'White Gold',
            fallbackUrl: 'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=500&q=80'
        },
        {
            id: 6,
            title: 'Pear Drop Elegance',
            description: 'Unique pear-shaped diamond with hidden halo and split shank. Feminine, distinctive, unforgettable.',
            style: 'Hidden Halo',
            diamond: 'Pear',
            metal: 'Rose Gold',
            fallbackUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&q=80'
        },
        {
            id: 7,
            title: 'Emerald Art Deco',
            description: 'Sophisticated emerald cut with step-cut facets in a geometric Art Deco setting with baguette side stones.',
            style: 'Art Deco',
            diamond: 'Emerald',
            metal: 'Platinum',
            fallbackUrl: 'https://images.unsplash.com/photo-1591209627710-d2427a94c82e?w=500&q=80'
        },
        {
            id: 8,
            title: 'Marquise Vintage',
            description: 'Dramatic marquise diamond with ornate milgrain details and filigree. Old-world glamour for the romantic soul.',
            style: 'Vintage Milgrain',
            diamond: 'Marquise',
            metal: 'Yellow Gold',
            fallbackUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80'
        },
        {
            id: 9,
            title: 'Radiant Sparkle',
            description: 'Show-stopping radiant cut combines the elegance of emerald with the fire of brilliant. Double halo for maximum impact.',
            style: 'Double Halo',
            diamond: 'Radiant',
            metal: 'White Gold',
            fallbackUrl: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=500&q=80'
        },
        {
            id: 10,
            title: 'Asscher Gatsby',
            description: 'The Art Deco icon - distinctive Asscher cut with mesmerizing step facets. Bezel-set for a clean, modern look.',
            style: 'Bezel',
            diamond: 'Asscher',
            metal: 'Platinum',
            fallbackUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80'
        }
    ],

    // LocalStorage keys
    STORAGE_KEYS: {
        SELECTED_DESIGN: 'maria_ring_design',
        DESIGN_TIMESTAMP: 'maria_ring_timestamp',
        DESIGN_TYPE: 'maria_ring_type', // 'gallery' or 'custom'
    }
};
