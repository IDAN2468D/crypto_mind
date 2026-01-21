/**
 * Safe Gemini API Caller (Rate Limited + Cached)
 * Implements a strict sequential queue with 4s delay between requests.
 */

// Cache Storage (In-Memory)
const responseCache = new Map<string, any>();

// Queue tail pointer
let requestQueue: Promise<any> = Promise.resolve();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Wraps an API call to Gemini with detailed rate limiting and caching.
 * @param key Unique key for caching (e.g., prompt + history hash). Pass a random string to bypass cache.
 * @param apiCallFn The actual async function calling Gemini.
 * @returns The result of the API call.
 */
export async function safeGeminiCall<T>(key: string, apiCallFn: () => Promise<T>): Promise<T> {
    // 1. Check Cache
    if (responseCache.has(key)) {
        const cached = responseCache.get(key);
        // Simple expiry check (optional, user didn't request logic but good to have)
        // User's snippet didn't have expiry, but previous context did.
        // We'll stick to simple "if exists" to match user snippet exactly.
        console.log(`[Gemini Cache] Hit for key: ${key}`);
        return cached;
    }

    // 2. Queueing
    // We append this request to the end of the current queue chain
    const task = requestQueue.then(async () => {
        try {
            // Execute the API call
            const result = await apiCallFn();

            // Cache the result
            responseCache.set(key, result);

            // Wait 4 seconds to protect the Rate Limit for the *next* request
            await delay(4000);

            return result;
        } catch (error) {
            console.error("Error in Gemini call inside queue:", error);
            // Even on error, we wait 4s to avoid hammering retries
            await delay(4000);
            throw error;
        }
    });

    // Update the queue pointer so the next request waits for this one
    // We catch errors here so the main queue chain doesn't break on a single failure
    requestQueue = task.catch(() => { });

    return task;
}

// Clean up cache periodically or exports for manual clear if needed
export const clearGeminiCache = () => responseCache.clear();
