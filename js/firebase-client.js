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
    },

    // =============================================
    // Term Preview Caching (AI-generated examples)
    // =============================================

    /**
     * Get all cached term preview images
     */
    async getTermPreviews() {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            const response = await fetch(`${this.baseUrl}/term_previews`);

            if (!response.ok) {
                if (response.status === 404) {
                    return { success: true, data: {} }; // No previews yet
                }
                throw new Error(`Firebase error: ${response.status}`);
            }

            const result = await response.json();
            const previews = {};

            (result.documents || []).forEach(doc => {
                const term = doc.fields?.term?.stringValue;
                if (term) {
                    previews[term] = {
                        imageUrl: doc.fields?.image_url?.stringValue,
                        caption: doc.fields?.caption?.stringValue,
                        generatedAt: doc.fields?.generated_at?.timestampValue
                    };
                }
            });

            return { success: true, data: previews };

        } catch (error) {
            console.error('Firebase fetch previews error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Save a generated term preview to Firebase
     */
    async saveTermPreview(term, imageUrl, caption) {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            // Use term as document ID (sanitized)
            const docId = term.toLowerCase().replace(/[^a-z0-9]/g, '_');

            const docData = {
                fields: {
                    term: { stringValue: term },
                    image_url: { stringValue: imageUrl },
                    caption: { stringValue: caption },
                    generated_at: { timestampValue: new Date().toISOString() }
                }
            };

            const response = await fetch(`${this.baseUrl}/term_previews/${docId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(docData)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            console.log(`✅ Preview cached for: ${term}`);
            return { success: true };

        } catch (error) {
            console.error('Firebase save preview error:', error);
            return { success: false, error: error.message };
        }
    },

    // =============================================
    // Ring Collection (Save & Compare Multiple Rings)
    // =============================================

    /**
     * Save a ring to the collection
     */
    async saveToCollection(ring) {
        if (!this.isConfigured()) {
            console.warn('Firebase not configured');
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            const ringId = `ring_${Date.now()}`;
            const docData = {
                fields: {
                    id: { stringValue: ringId },
                    image_url: { stringValue: ring.imageUrl || '' },
                    prompt: { stringValue: ring.prompt || '' },
                    title: { stringValue: ring.title || '' },
                    type: { stringValue: ring.type || 'generated' },
                    designer_name: { stringValue: ring.designerName || 'Anonymous' },
                    is_the_one: { booleanValue: false },
                    created_at: { timestampValue: new Date().toISOString() }
                }
            };

            const response = await fetch(`${this.baseUrl}/ring_collection/${ringId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(docData)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            console.log('💍 Ring saved to collection!', ringId);
            return { success: true, id: ringId };

        } catch (error) {
            console.error('Firebase save to collection error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Get all rings in the collection
     */
    async getCollection() {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured', data: [] };
        }

        try {
            const response = await fetch(`${this.baseUrl}/ring_collection`);

            if (!response.ok) {
                if (response.status === 404) {
                    return { success: true, data: [] };
                }
                throw new Error(`Firebase error: ${response.status}`);
            }

            const result = await response.json();
            const rings = (result.documents || []).map(doc => ({
                id: doc.fields?.id?.stringValue,
                imageUrl: doc.fields?.image_url?.stringValue,
                prompt: doc.fields?.prompt?.stringValue,
                title: doc.fields?.title?.stringValue || '',
                type: doc.fields?.type?.stringValue,
                designerName: doc.fields?.designer_name?.stringValue || '',
                isTheOne: doc.fields?.is_the_one?.booleanValue || false,
                createdAt: doc.fields?.created_at?.timestampValue
            })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return { success: true, data: rings };

        } catch (error) {
            console.error('Firebase get collection error:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Remove a ring from the collection (moves to trash for recovery)
     */
    async removeFromCollection(ringId) {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            // First, get the ring data so we can move it to trash
            const collection = await this.getCollection();
            const ring = collection.data?.find(r => r.id === ringId);

            if (ring) {
                // Move to trash first
                await this.moveToTrash(ring);
            }

            // Then remove from collection
            const response = await fetch(`${this.baseUrl}/ring_collection/${ringId}`, {
                method: 'DELETE'
            });

            if (!response.ok && response.status !== 404) {
                throw new Error(`Firebase error: ${response.status}`);
            }

            console.log('🗑️ Ring moved to trash:', ringId);
            return { success: true };

        } catch (error) {
            console.error('Firebase remove error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Mark a ring as "The One" (clears previous selection)
     */
    async markAsTheOne(ringId) {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            // First, get all rings and clear any existing "The One"
            const collection = await this.getCollection();
            if (collection.success) {
                for (const ring of collection.data) {
                    if (ring.isTheOne && ring.id !== ringId) {
                        // Clear previous "The One"
                        await fetch(`${this.baseUrl}/ring_collection/${ring.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                fields: {
                                    id: { stringValue: ring.id },
                                    image_url: { stringValue: ring.imageUrl },
                                    prompt: { stringValue: ring.prompt },
                                    title: { stringValue: ring.title || '' },
                                    type: { stringValue: ring.type },
                                    is_the_one: { booleanValue: false },
                                    created_at: { timestampValue: ring.createdAt }
                                }
                            })
                        });
                    }
                }
            }

            // Now mark the selected ring as "The One"
            const targetRing = collection.data.find(r => r.id === ringId);
            if (!targetRing) {
                throw new Error('Ring not found');
            }

            const response = await fetch(`${this.baseUrl}/ring_collection/${ringId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fields: {
                        id: { stringValue: targetRing.id },
                        image_url: { stringValue: targetRing.imageUrl },
                        prompt: { stringValue: targetRing.prompt },
                        title: { stringValue: targetRing.title || '' },
                        type: { stringValue: targetRing.type },
                        is_the_one: { booleanValue: true },
                        created_at: { timestampValue: targetRing.createdAt }
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Firebase error: ${response.status}`);
            }

            console.log('💕 Marked as The One:', ringId);
            return { success: true };

        } catch (error) {
            console.error('Firebase mark as The One error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Unmark a ring as "The One"
     */
    async unmarkAsTheOne(ringId) {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            const collection = await this.getCollection();
            const targetRing = collection.data?.find(r => r.id === ringId);
            if (!targetRing) {
                throw new Error('Ring not found');
            }

            const response = await fetch(`${this.baseUrl}/ring_collection/${ringId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fields: {
                        id: { stringValue: targetRing.id },
                        image_url: { stringValue: targetRing.imageUrl },
                        prompt: { stringValue: targetRing.prompt },
                        title: { stringValue: targetRing.title || '' },
                        type: { stringValue: targetRing.type },
                        is_the_one: { booleanValue: false },
                        created_at: { timestampValue: targetRing.createdAt }
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Firebase error: ${response.status}`);
            }

            console.log('Unmarked as The One:', ringId);
            return { success: true };

        } catch (error) {
            console.error('Firebase unmark error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Get the ring marked as "The One"
     */
    async getTheOne() {
        const collection = await this.getCollection();
        if (collection.success) {
            const theOne = collection.data.find(r => r.isTheOne);
            if (theOne) {
                return { success: true, data: theOne };
            }
        }
        return { success: false, error: 'No ring marked as The One' };
    },

    // =============================================
    // TRASH / SOFT DELETE (Recovery Support)
    // =============================================

    /**
     * Move a ring to trash (soft delete)
     * @param {object} ring - The ring object to move to trash
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async moveToTrash(ring) {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            const trashId = ring.id || `ring_${Date.now()}`;
            const docData = {
                fields: {
                    id: { stringValue: trashId },
                    image_url: { stringValue: ring.imageUrl || '' },
                    prompt: { stringValue: ring.prompt || '' },
                    title: { stringValue: ring.title || '' },
                    type: { stringValue: ring.type || 'generated' },
                    designer_name: { stringValue: ring.designerName || 'Anonymous' },
                    is_the_one: { booleanValue: ring.isTheOne || false },
                    original_created_at: { timestampValue: ring.createdAt || new Date().toISOString() },
                    deleted_at: { timestampValue: new Date().toISOString() }
                }
            };

            const response = await fetch(`${this.baseUrl}/ring_trash/${trashId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(docData)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            console.log('🗑️ Ring moved to trash:', trashId);
            return { success: true, id: trashId };

        } catch (error) {
            console.error('Firebase move to trash error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Get all rings in trash
     * @returns {Promise<{success: boolean, data: array, error?: string}>}
     */
    async getTrash() {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured', data: [] };
        }

        try {
            const response = await fetch(`${this.baseUrl}/ring_trash`);

            if (!response.ok) {
                if (response.status === 404) {
                    return { success: true, data: [] };
                }
                throw new Error(`Firebase error: ${response.status}`);
            }

            const result = await response.json();
            const rings = (result.documents || []).map(doc => ({
                id: doc.fields?.id?.stringValue,
                imageUrl: doc.fields?.image_url?.stringValue,
                prompt: doc.fields?.prompt?.stringValue,
                title: doc.fields?.title?.stringValue || '',
                type: doc.fields?.type?.stringValue,
                designerName: doc.fields?.designer_name?.stringValue || '',
                isTheOne: doc.fields?.is_the_one?.booleanValue || false,
                createdAt: doc.fields?.original_created_at?.timestampValue,
                deletedAt: doc.fields?.deleted_at?.timestampValue
            })).sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));

            return { success: true, data: rings };

        } catch (error) {
            console.error('Firebase get trash error:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Restore a ring from trash back to collection
     * @param {string} ringId - The ID of the ring to restore
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async restoreFromTrash(ringId) {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            // First, get the ring from trash
            const trashResponse = await fetch(`${this.baseUrl}/ring_trash/${ringId}`);

            if (!trashResponse.ok) {
                throw new Error('Ring not found in trash');
            }

            const trashDoc = await trashResponse.json();

            // Restore to collection
            const ringData = {
                fields: {
                    id: { stringValue: trashDoc.fields?.id?.stringValue || ringId },
                    image_url: { stringValue: trashDoc.fields?.image_url?.stringValue || '' },
                    prompt: { stringValue: trashDoc.fields?.prompt?.stringValue || '' },
                    title: { stringValue: trashDoc.fields?.title?.stringValue || '' },
                    type: { stringValue: trashDoc.fields?.type?.stringValue || 'generated' },
                    designer_name: { stringValue: trashDoc.fields?.designer_name?.stringValue || 'Anonymous' },
                    is_the_one: { booleanValue: trashDoc.fields?.is_the_one?.booleanValue || false },
                    created_at: { timestampValue: trashDoc.fields?.original_created_at?.timestampValue || new Date().toISOString() }
                }
            };

            const restoreResponse = await fetch(`${this.baseUrl}/ring_collection/${ringId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ringData)
            });

            if (!restoreResponse.ok) {
                throw new Error(`Failed to restore: ${restoreResponse.status}`);
            }

            // Remove from trash
            await fetch(`${this.baseUrl}/ring_trash/${ringId}`, {
                method: 'DELETE'
            });

            console.log('♻️ Ring restored from trash:', ringId);
            return { success: true };

        } catch (error) {
            console.error('Firebase restore from trash error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Restore all rings from trash back to collection
     * @param {function} onProgress - Optional callback for progress updates
     * @returns {Promise<{success: boolean, restored: number, error?: string}>}
     */
    async restoreAllFromTrash(onProgress = null) {
        if (!this.isConfigured()) {
            return { success: false, restored: 0, error: 'Firebase not configured' };
        }

        try {
            const trash = await this.getTrash();
            if (!trash.success) {
                throw new Error(trash.error || 'Failed to fetch trash');
            }

            const rings = trash.data;
            if (rings.length === 0) {
                return { success: true, restored: 0 };
            }

            let restored = 0;
            const errors = [];

            for (const ring of rings) {
                try {
                    const result = await this.restoreFromTrash(ring.id);
                    if (result.success) {
                        restored++;
                        if (onProgress) {
                            onProgress(restored, rings.length);
                        }
                    } else {
                        errors.push(`Failed to restore ${ring.id}: ${result.error}`);
                    }
                } catch (err) {
                    errors.push(`Error restoring ${ring.id}: ${err.message}`);
                }
            }

            console.log(`♻️ Restored ${restored}/${rings.length} rings from trash`);

            return {
                success: restored > 0,
                restored,
                total: rings.length,
                errors: errors.length > 0 ? errors : undefined
            };

        } catch (error) {
            console.error('Firebase restore all error:', error);
            return { success: false, restored: 0, error: error.message };
        }
    },

    /**
     * Permanently delete a ring from trash
     * @param {string} ringId - The ID of the ring to permanently delete
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async permanentlyDelete(ringId) {
        if (!this.isConfigured()) {
            return { success: false, error: 'Firebase not configured' };
        }

        try {
            const response = await fetch(`${this.baseUrl}/ring_trash/${ringId}`, {
                method: 'DELETE'
            });

            if (!response.ok && response.status !== 404) {
                throw new Error(`Firebase error: ${response.status}`);
            }

            console.log('💀 Ring permanently deleted:', ringId);
            return { success: true };

        } catch (error) {
            console.error('Firebase permanent delete error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Empty the trash (permanently delete all)
     * @param {function} onProgress - Optional callback for progress updates
     * @returns {Promise<{success: boolean, deleted: number, error?: string}>}
     */
    async emptyTrash(onProgress = null) {
        if (!this.isConfigured()) {
            return { success: false, deleted: 0, error: 'Firebase not configured' };
        }

        try {
            const trash = await this.getTrash();
            if (!trash.success) {
                throw new Error(trash.error || 'Failed to fetch trash');
            }

            const rings = trash.data;
            if (rings.length === 0) {
                return { success: true, deleted: 0 };
            }

            let deleted = 0;
            const errors = [];

            for (const ring of rings) {
                try {
                    const result = await this.permanentlyDelete(ring.id);
                    if (result.success) {
                        deleted++;
                        if (onProgress) {
                            onProgress(deleted, rings.length);
                        }
                    } else {
                        errors.push(`Failed to delete ${ring.id}: ${result.error}`);
                    }
                } catch (err) {
                    errors.push(`Error deleting ${ring.id}: ${err.message}`);
                }
            }

            console.log(`💀 Permanently deleted ${deleted}/${rings.length} rings from trash`);

            return {
                success: deleted > 0,
                deleted,
                total: rings.length,
                errors: errors.length > 0 ? errors : undefined
            };

        } catch (error) {
            console.error('Firebase empty trash error:', error);
            return { success: false, deleted: 0, error: error.message };
        }
    }
};
