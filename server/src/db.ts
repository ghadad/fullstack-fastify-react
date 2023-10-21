import { DataSource } from "typeorm";
import { User } from "./modules/user/user.model";
import { Node } from "./modules/smartflow/node/node.model";
import { Flow } from "./modules/smartflow/flow/flow.model";

import { Container } from "typedi";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "yesdb",
  port: 5432,
  entities: [User, Node, Flow],
  synchronize: true, // on production set to false
});

let connection: DataSource;

const createOrGetConnection = async () => {
  if (!connection) {
    connection = await AppDataSource.initialize();
    Container.set("connection", connection);
  }
  return connection;
};

export default createOrGetConnection;
