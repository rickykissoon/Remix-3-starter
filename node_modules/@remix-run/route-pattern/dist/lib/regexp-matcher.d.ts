import type { Matcher, MatchResult } from './matcher.ts';
import { RoutePattern } from './route-pattern.ts';
/**
 * A simple array-based matcher that compiles route patterns to regular expressions.
 *
 * **Use RegExpMatcher when:**
 * - You have a single or handful of patterns
 * - Build time is critical (cold boot scenarios)
 * - Pattern set changes frequently (cheap to rebuild)
 * - Memory footprint needs to be minimal
 */
export declare class RegExpMatcher<T = any> implements Matcher<T> {
    #private;
    add<P extends string>(pattern: P | RoutePattern<P>, data: T): void;
    match(url: string | URL): MatchResult<T> | null;
    matchAll(url: string | URL): Generator<MatchResult<T>>;
    get size(): number;
}
//# sourceMappingURL=regexp-matcher.d.ts.map