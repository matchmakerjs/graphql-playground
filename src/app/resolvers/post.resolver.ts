import { DIContainer } from '@matchmakerjs/di';
import { EntityManager } from 'typeorm';
import { Query, Resolver, Ctx, Arg, Int, Mutation } from 'type-graphql';
import { Post as PostEntity } from '../data/entities/post.entity';

@Resolver()
export class PostResolver {
    @Query(() => PostEntity, { nullable: true })
    post(@Arg('id', () => Int) id: number, @Ctx() context: { container: DIContainer }): Promise<PostEntity> {
        return context.container.getInstance(EntityManager).findOne(PostEntity, id);
    }

    @Mutation(() => PostEntity)
    createPost(
        @Arg('title', () => String) title: string,
        @Ctx() context: { container: DIContainer },
    ): Promise<PostEntity> {
        const entityManager = context.container.getInstance(EntityManager);
        const post = entityManager.create(PostEntity, { title });
        return entityManager.save(post);
    }
}
