const express = require('express');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');

const { boardSchema, boardRoot } = require('./board');

const schema = buildSchema(`
  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const root = {
  hello() {
    return "Hello, world!";
  },
  rollDice({ numDice, numSides }) {
    const output = [];
    for (let i = 0; i < numDice; ++i) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
}

const app = express();
const port = 4243;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('graphQL example');
})

app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true,}));

app.use('/board', graphqlHTTP({ schema: boardSchema, rootValue: boardRoot, graphiql: true, }));

// 클라이언트의 입장에서 GraphQL mutation 호출하기 위한 테스트
app.post('/write', async (req, res) => {
  try {
    const { writer, title, content } = req.body;
    /* 
      mutation CreateBoard($input: BoardInput!)
      오퍼레이션 네임 쿼리(쿼리용 함수)를 작성할 때 스키마에 type Mutation에
      정의 된 매개변수와 일치시켜야 한다. 느낌표를 빠트리거나 하면 안된다.
     */
    const query = `mutation CreateBoard($input: BoardInput!) {
      createBoard(input: $input)
    }`;

    const reqBody = JSON.stringify({
      query,
      variables: {
        input: {
          writer,
          title,
          content,
        }
      }
    });

    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4243/board',
      headers: {
        'Content-Type': 'application/json',
      },
      data: reqBody,
    });

    console.log(response.data); // { data: { createBoard: true } }
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
})

app.listen(port, () => {
  console.log('listening on port ' + port);
});