import postsResolvers from './post'; 
import usersResolvers from './user';
import commentResolvers from './comment';

export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Post: {
    ...postsResolvers.Post,
  }
}
