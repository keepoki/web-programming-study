const { buildSchema } = require('graphql');

class Board {
  constructor(writer) {
    this.writer = writer;
  }

  /** 
   * @param {string} title
   * @param {string} content
   */
  write(title, content) {
    if (Board.id == null) {
      Board.id = 0;
      Board.boards = [];
    }

    Board.id++;
    Board.boards.push({ id: Board.id, title, content, ...this, });
    return true;
  }

  /**
   * @param {number} id 
   * @returns {{ id, writer, title, content }}
   */
  static getBoard(id) {
    if (Board.boards[id - 1]) {
      return Board.boards[id - 1];
    }
    return null;
  }
}

const schema = buildSchema(`
  input BoardInput {
    writer: String!
    title: String!
    content: String!
  }

  type Board {
    id: Int!
    writer: String
    title: String
    content: String
  }

  type Query {
    getBoard(id: Int!): Board
  }

  type Mutation {
    createBoard(input: BoardInput!): Boolean
  }
`);

const root = {
  getBoard({ id }) {
    return Board.getBoard(id);
  },
  createBoard({ input }) {
    const { writer, title, content } = input;
    const board = new Board(writer);
    return board.write(title, content);
  }
}

module.exports = { boardSchema: schema, boardRoot: root };