import dotenv from "dotenv";
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/rootResolver.js';

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //Express Request
  context: ({ req }) => ({ req })
});

const { PORT, MONGO_URI } = process.env

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( async () => {
  const { url } = await server.listen( PORT );
  console.log('MongoDB connected');
  console.log(`Server running at ${url}`);
}).catch(err => console.error(err));
