// Firebase Client for Ring Designer
// Simple cloud persistence - just works!

const FirebaseClient = {
    /**
     * Get Firebase config from central config
     */
    get config() {
        return CONFIG.FIREBASE || {};
    },

    /**
     * Check if Firebase is configured
     */
    isConfigured() {
        return this.config.projectId && this.config.projectId !== 'YOUR_PROJECT_ID';
    },

    /**
     * Get Firestore REST API base URL
     */
    get baseUrl() {
        return `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/documents`;
    },

    /**
     * Save Maria's ring design to Firebase
     */
    async saveDesign(design) {
        if (!this.isConfigured()) {
            console.warn('Firebase not configured - using localStorage only');
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            const docData = {
                fields: {
                    design_type: { stringValue: design.type },
                    title: { stringValue: design.title || 'Custom Design' },
                    description: { stringValue: design.description || '' },
                    image_url: { stringValue: design.imageUrl || '' },
                    ai_prompt: { stringValue: design.prompt || '' },
                    created_at: { timestampValue: new Date().toISOString() }
                }
            };

            const response = await fetch(`${this.baseUrl}/ring_designs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(docData)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            const result = await response.json();
            console.log('✅ Design saved to Firebase!', result.name);

            return { success: true, id: result.name };

        } catch (error) {
            console.error('Firebase save error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Get all saved designs
     */
    async getDesigns() {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            const response = await fetch(`${this.baseUrl}/ring_designs`);

            if (!response.ok) {
                throw new Error(`Firebase error: ${response.status}`);
            }

            const result = await response.json();
            const designs = (result.documents || []).map(doc => ({
                id: doc.name,
                design_type: doc.fields?.design_type?.stringValue,
                title: doc.fields?.title?.stringValue,
                description: doc.fields?.description?.stringValue,
                image_url: doc.fields?.image_url?.stringValue,
                ai_prompt: doc.fields?.ai_prompt?.stringValue,
                created_at: doc.fields?.created_at?.timestampValue
            }));

            return { success: true, data: designs };

        } catch (error) {
            console.error('Firebase fetch error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Get the most recent design
     */
    async getLatestDesign() {
        const result = await this.getDesigns();
        if (result.success && result.data.length > 0) {
            // Sort by created_at descending
            const sorted = result.data.sort((a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
            );
            return { success: true, data: sorted[0] };
        }
        return { success: false, error: 'No designs found' };
    }
};
