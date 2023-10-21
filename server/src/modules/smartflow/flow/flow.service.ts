import { DataSource, Repository } from "typeorm";
import { Flow } from "./flow.model";
import createOrGetConnection from "../../../db";
import { flowSchemaType } from "./flow.schema";

class FlowService {
  constructor() {
    this.getReposirtoy()
      .then(() => {})
      .catch(() => {});
  }

  repository: Repository<Flow>;
  conn: DataSource;
  async getReposirtoy(): Promise<void> {
    this.conn = await createOrGetConnection();
    this.repository = this.conn.getRepository(Flow);
  }

  async getAll() {
    return await this.repository.find();
  }

  async getFlowById(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async create(flowObject: flowSchemaType) {
    const flow = new Flow(flowObject);
    await this.repository.insert(flow);
    return flow;
  }

  async updateFlow(id: number, flow: flowSchemaType) {
    await this.repository.update({ id: id }, flow);
    return this.getFlowById(id);
  }

  async deleteFlow(id: number) {
    console.log("delete flow", id);
    const result = await this.repository.delete({ id: id });
    console.log("delete flow result", result);
    return { success: true, affected: result.affected };
  }
}

export default new FlowService();
