
import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema   : 'http://localhost:3000',
    generates: {
        'src/generated/types.ts': {
            plugins: ['typescript', 'typescript-resolvers']
        },
        'doc/graphql.schema.json': {
            plugins: ['introspection']
        }
    }
};

export default config;
