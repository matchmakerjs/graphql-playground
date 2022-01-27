import { SimpleRouter } from '@matchmakerjs/matchmaker';
import { GraphQLontroller } from '../app/controllers/graphql.controller';
import { IndexController } from '../app/controllers/index.controller';

export default SimpleRouter.fromControllers([IndexController, GraphQLontroller]);
