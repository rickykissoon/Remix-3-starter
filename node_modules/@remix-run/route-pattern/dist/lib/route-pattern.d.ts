import type { HrefBuilderArgs } from './href.ts';
import type { Join } from './join.ts';
import type { Params } from './params.ts';
export interface RoutePatternOptions {
    /**
     * Whether to ignore case when matching URL pathnames.
     */
    ignoreCase?: boolean;
}
/**
 * A pattern for matching URLs.
 */
export declare class RoutePattern<T extends string = string> {
    #private;
    /**
     * The source string that was used to create this pattern.
     */
    readonly source: T;
    /**
     * Whether to ignore case when matching URL pathnames.
     */
    readonly ignoreCase: boolean;
    constructor(source: T | RoutePattern<T>, options?: RoutePatternOptions);
    /**
     * Generate a href (URL) for this pattern.
     *
     * @param params The parameters to use in the href.
     * @param searchParams The search parameters to use in the href.
     * @returns The href
     */
    href(...args: HrefBuilderArgs<T>): string;
    /**
     * Join this pattern with another pattern. This is useful when building a pattern
     * relative to a base pattern.
     *
     * Note: The returned pattern will use the same options as this pattern.
     *
     * @param input The pattern to join with
     * @returns The joined pattern
     */
    join<P extends string>(input: P | RoutePattern<P>): RoutePattern<Join<T, P>>;
    /**
     * Match a URL against this pattern.
     *
     * @param url The URL to match
     * @returns The parameters if the URL matches this pattern, `null` otherwise
     */
    match(url: URL | string): RouteMatch<T> | null;
    /**
     * Test if a URL matches this pattern.
     *
     * @param url The URL to test
     * @returns `true` if the URL matches this pattern, `false` otherwise
     */
    test(url: URL | string): boolean;
    toString(): T;
}
export interface RouteMatch<T extends string> {
    /**
     * The parameters that were extracted from the URL protocol, hostname, and/or pathname.
     */
    readonly params: Params<T>;
    /**
     * The URL that was matched.
     */
    readonly url: URL;
}
//# sourceMappingURL=route-pattern.d.ts.map