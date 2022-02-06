import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client';

const { REACT_APP_BACKEND_URL } = process.env;

const httpLink = createHttpLink({ uri: REACT_APP_BACKEND_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('jwtToken')}` || null
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([ authMiddleware, httpLink ]),
  cache: new InMemoryCache()
});

const Apollo = ( 
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
)

export default Apollo;