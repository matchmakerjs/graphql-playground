import { Inject, InjectionToken, LazyDIContainer } from '@matchmakerjs/di';
import { ErrorResponse, Get, HandlerContext, Post, RequestBody, RestController } from '@matchmakerjs/matchmaker';
import { AnonymousUserAllowed } from '@matchmakerjs/matchmaker-security';
import * as fs from 'fs';
import { ExecutionResult, graphql, GraphQLSchema } from 'graphql';
import { IncomingMessage, ServerResponse } from 'http';

@AnonymousUserAllowed()
@RestController()
export class GraphQLontroller {
    constructor(
        private graphQLSchema: GraphQLSchema,
        @Inject(InjectionToken.container) private container: LazyDIContainer,
    ) {}

    @Get('/graphql')
    graphqlPlayground(context: HandlerContext<IncomingMessage, ServerResponse>): Promise<void> {
        return new Promise<void>((res, rej) => {
            try {
                const resourcePath = process.env.GRAPHQL_PLAYGROUND_PATH || './graphql-playground.html';
                fs.stat(resourcePath, (err) => {
                    if (!err) {
                        const response = context.response;
                        response.writeHead(200, {
                            'content-type': 'text/html',
                        });
                        response.once('close', res);
                        response.once('error', rej);
                        fs.createReadStream(resourcePath).pipe(response);
                        return;
                    }
                    if (err.code === 'ENOENT') {
                        return rej(new ErrorResponse(404, { message: 'GraphQL playground not available' }));
                    }
                    rej(new ErrorResponse(500, { message: 'Unable to fetch GraphQL playground' }));
                });
            } catch (error) {
                rej(error);
            }
        });
    }

    @Post('graphql')
    async graphql(@RequestBody() request: { query: string }): Promise<ExecutionResult> {
        return graphql(this.graphQLSchema, request.query, null, {
            container: this.container,
        });
    }
}
