const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/Schema/Index");
const graphqlResolver = require("./graphql/Resolver/Index");
const isAuth = require("./middleware/isAuth");
const cors = require("cors");

mongoose.connect("mongodb://localhost/Graphql", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection;
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors());

app.use(express.json());
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
