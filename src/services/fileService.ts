import {resolve} from 'path';
import {readdirSync, readFileSync} from 'fs';

/**
 *
 * @param {string} path - path from root folder
 * @return {string[]} array of paths to files in given path
 */
export const getFilePaths = (path: string): string[] => {
    const cleanPath = resolve(__dirname, '../../', path);
    const folderElements = readdirSync(cleanPath, {withFileTypes: true});

    const files = folderElements.map(el => {
        const res = resolve(cleanPath, el.name);
        return el.isDirectory() ? getFilePaths(res) : res;
    });

    return Array.prototype.concat(...files);
};

/**
 * @return {string} All `types.gql` files in api folder concatenated
 */
export function getGraphqlTypeDefString (): string {
    // Dynamic path because once built, the path is different than folder structure
    return getFilePaths(resolve(__dirname, '..', 'api'))
        .filter(path => path.endsWith('types.gql'))
        .map(path => readFileSync(path).toString('utf-8'))
        .join('\n\n');
}