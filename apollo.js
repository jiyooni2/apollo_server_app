import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem("token");
  isLoggedInVar(false);
  tokenVar(null);
};

const httpLink = createHttpLink({
  uri: "https://angry-dingo-73.loca.lt/graphql",
});

//setContext : to add token into the header, context setter
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: offsetLimitPagination(),
          // {
          //   keyArgs: false,
          //   merge(existing = [], incoming = []) {
          //     return [...existing, ...incoming];
          //   },
          // },
        },
      },
    },
  }),
});

export default client;
