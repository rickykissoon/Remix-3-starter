import type { Matcher, MatchResult } from './matcher.ts';
import { RoutePattern } from './route-pattern.ts';
export interface TrieMatcherOptions {
    /**
     * The maximum number of traversal states to explore during matching.
     *
     * This prevents excessive computation in cases with high branching (e.g., many optionals or wildcards).
     * Increase for more complex routes if you encounter truncated results.
     *
     * Default is 10_000.
     */
    maxTraversalStates?: number;
    /**
     * The maximum depth of nested optionals to explore in traversal.
     *
     * Limits branching in patterns like /api(/v1(/v2(/v3))) to prevent exponential state growth.
     * Adjust higher for apps with deeply nested optionals; default 5 covers most cases without performance hit.
     *
     * Default is 5.
     */
    maxOptionalDepth?: number;
}
/**
 * A trie-based matcher optimized for large route sets with repeated matching.
 *
 * **Use TrieMatcher when:**
 * - You have 100+ route patterns
 * - Patterns are registered once and matched repeatedly (e.g., web server routing)
 * - Match performance matters more than build time
 * - You need exhaustive matching via `matchAll()`
 */
export declare class TrieMatcher<T = any> implements Matcher<T> {
    #private;
    constructor(options?: TrieMatcherOptions);
    /**
     * Add a pattern to the trie
     */
    add(pattern: string | RoutePattern, node: T): void;
    /**
     * Find the best match for a URL
     */
    match(url: string | URL): MatchResult<T> | null;
    /**
     * Find all matches for a URL
     */
    matchAll(url: string | URL): Generator<MatchResult<T>>;
    /**
     * Number of patterns in the trie
     */
    get size(): number;
}
//# sourceMappingURL=trie-matcher.d.ts.map