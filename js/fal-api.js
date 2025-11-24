// fal.ai API Integration for nano-banana-pro (Imagen 3)
const FalAPI = {
    /**
     * Generate a ring image using fal.ai's nano-banana-pro model
     * @param {string} description - User's ring description
     * @returns {Promise<object>} - Generated image data
     */
    async generateRingImage(description) {
        const apiKey = CONFIG.FAL_API.apiKey;

        // Validate API key
        if (!apiKey || apiKey === 'YOUR_FAL_API_KEY_HERE') {
            throw new Error('Please configure your fal.ai API key in config.js');
        }

        // Build the full prompt with prefix and suffix
        const fullPrompt = `${CONFIG.FAL_API.promptPrefix}${description}${CONFIG.FAL_API.promptSuffix}`;

        console.log('Generating ring with prompt:', fullPrompt);

        try {
            const response = await fetch(CONFIG.FAL_API.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Key ${apiKey}`
                },
                body: JSON.stringify({
                    prompt: fullPrompt,
                    image_size: CONFIG.FAL_API.imageSize,
                    num_inference_steps: CONFIG.FAL_API.numInferenceSteps,
                    guidance_scale: CONFIG.FAL_API.guidanceScale,
                    num_images: 1,
                    enable_safety_checker: true
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API request failed: ${response.status}`);
            }

            const result = await response.json();
            console.log('Generation successful:', result);

            // fal.ai nano-banana-pro returns images in the 'images' array
            if (result.images && result.images.length > 0) {
                return {
                    success: true,
                    imageUrl: result.images[0].url,
                    prompt: fullPrompt,
                    description: description
                };
            } else {
                throw new Error('No image generated');
            }

        } catch (error) {
            console.error('Ring generation error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    /**
     * Retry image generation with the same description
     * @param {string} description - Ring description
     * @returns {Promise<object>} - Generated image data
     */
    async retryGeneration(description) {
        console.log('Retrying generation...');
        return this.generateRingImage(description);
    },

    /**
     * Validate user description before generation
     * @param {string} description - User's ring description
     * @returns {object} - Validation result
     */
    validateDescription(description) {
        const trimmed = description.trim();

        if (!trimmed) {
            return {
                valid: false,
                message: 'Please describe your dream ring'
            };
        }

        if (trimmed.length < 10) {
            return {
                valid: false,
                message: 'Please provide more details (at least 10 characters)'
            };
        }

        if (trimmed.length > 500) {
            return {
                valid: false,
                message: 'Description is too long (max 500 characters)'
            };
        }

        return {
            valid: true,
            message: 'Description is valid'
        };
    }
};
