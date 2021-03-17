import postsResolvers from './post'; 
import usersResolvers from './user';

export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  }
}
