import NodeService from "./node.service";
import * as most from "most";

import { Node } from "./node.model";
import { DataSource } from "typeorm";
import Container from "typedi";

export default class NodeProcessor {
  nodeSrvice: NodeService;
  node: Node | null;
  id: number;
  function: Function;
  db: DataSource;
  constructor(node: Node | number) {
    if (typeof node === "number") {
      this.id = node;
    } else {
      this.node = node;
    }
    this.nodeSrvice = new NodeService();
    this.db = Container.get("connection");

    this.function = new Function(
      "db",
      "config",
      `console.log(config);
      return  async (a,b) =>  await  db.query('select * from user')`
    )(this.db, { name: "test" });
  }

  async init() {
    if (this.node) {
      return;
    }
    if (this.id) {
      this.node = await this.nodeSrvice.get(this.id);
    }
    if (this.node == null) {
      throw new Error("Node not found");
    }
  }

  getNode() {
    return this.node;
  }

  async execute(): Promise<any> {
    const db = Container.get<DataSource>("connection");
    console.log(await db.query("select * from user"));

    console.log(db.driver.database);
    console.log("function", await this.function(1, 2));
    console.log("   execute node # ", this.node!.type, this.node!.id);
    console.log("--------------------------------------------");
    interface User {
      id: number;
      name: string;
      dep_id: number;
      address?: string;
      managerEmail?: string;
      processTime?: Date;
    }

    // 1. Fetch users

    const users: User[] = Array.from({ length: 1000000 }, (v, k) => ({
      id: k,
      name: "Adam",
      dep_id: 1,
    }));

    const stream = most.from(users);
    const returnValue: { status: string; data: any; station: number } = {
      status: "ok",
      data: [],
      station: this.node!.id,
    };

    for (let i = 0; i < users.length; i += 10000) {
      console.log("i", this.node!.id, i);
      await stream
        .slice(i, i + 100)
        .map(async (user) => {
          //     console.log("map 1", user);
          await new Promise((resolve) => setTimeout(resolve, 3));
          return await { ...user, managerEmail: "adam@gmail.com" };
        })
        .awaitPromises()
        .map(async (user) => {
          //     console.log("map 1", user);
          await new Promise((resolve) => setTimeout(resolve, 3));
          return await { ...user, managerEmail: "adam@gmail.com" };
        })
        .awaitPromises()
        .map(async (user) => {
          //     console.log("map 1", user);
          await new Promise((resolve) => setTimeout(resolve, 3));
          return await { ...user, managerEmail: "adam@gmail.com" };
        })
        .awaitPromises()
        .reduce((acc, item) => {
          acc.push(item);
          return acc;
        }, returnValue.data);
    }
    console.log("returnValue", returnValue["data"][0]);

    return true;
  }
}
