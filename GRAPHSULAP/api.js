const express = require("express");
const{graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");

const app=express();
const schema=buildSchema(`
    type Query{
        message: String
    }
`);
const root={
    message: () => 
        {
            return "Hello Students! welcome to GraphQL API";
}
};
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/graphql");
});
