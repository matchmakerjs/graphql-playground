import { DIContainerModule } from '@matchmakerjs/di';
import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './app/resolvers/hello.resolver';
import { PostResolver } from './app/resolvers/post.resolver';

export async function createGraphQLModule() {
    const schema = await buildSchema({
        resolvers: [HelloResolver, PostResolver],
    });
    return {
        providers: [
            {
                provide: GraphQLSchema,
                with: () => schema,
            },
        ],
        isHealthy: () => Promise.resolve(true),
    } as DIContainerModule;
}
