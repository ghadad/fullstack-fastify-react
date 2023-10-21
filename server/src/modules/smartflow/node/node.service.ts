// create NodeService class and export initiation of NodeService class

import { NodeSchemaType } from "./node.schemas";
import { Node } from "./node.model";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Container } from "typedi";
import { DataSource } from "typeorm";

class NodeService {
  private nodeRepository: Repository<Node>;
  private db: DataSource;
  constructor() {
    this.db = Container.get<DataSource>("connection");
    this.nodeRepository =
      Container.get<DataSource>("connection").getRepository(Node);
  }
  async createNode(node: NodeSchemaType): Promise<NodeSchemaType> {
    const newNode = await this.nodeRepository.create(node);
    return newNode;
  }
  async updateNode(id: string, node: NodeSchemaType): Promise<UpdateResult> {
    const updatedNode = await this.nodeRepository.update(id, node);
    return updatedNode;
  }
  async deleteNode(id: string): Promise<DeleteResult> {
    const deletedNode = await this.nodeRepository.delete(id);
    return deletedNode;
  }
  async getNode(id: number) {
    const node = await this.nodeRepository.findOne({ where: { id: id } });
    return node;
  }

  //demonstration of using raw query
  async getNodes() {
    const nodes = await this.db.query(`SELECT * FROM node`);
    return nodes;
  }
}

export const nodeService = new NodeService();
