import { DataSource, Repository } from "typeorm";
import { Flow } from "./flow.model";
import createOrGetConnection from "../../../db";
import { flowQueryCriteriaType, flowSchemaType } from "./flow.schema";
import { FlowToNode } from "./flowToNode.model";

class FlowService {
  constructor() {
    this.getReposirtoy()
      .then(() => {})
      .catch(() => {});
  }

  repository: Repository<Flow>;
  flowToNodeRepository: Repository<FlowToNode>;
  conn: DataSource;
  async getReposirtoy(): Promise<void> {
    this.conn = await createOrGetConnection();
    this.repository = this.conn.getRepository(Flow);
    this.flowToNodeRepository = this.conn.getRepository(FlowToNode);
  }

  async getFlows(criteria: flowQueryCriteriaType) {
    return await this.repository
      .createQueryBuilder("flow")
      .where("title like :term or name like :term or description like :term", {
        term: `%${criteria.term || ""}%`,
      })
      .orderBy(
        "CASE WHEN flow.updatedAt IS NULL THEN '2021-07-04T03:17:55' ELSE flow.updatedAt   END",
        "DESC"
      )
      .addOrderBy("flow.createdAt", "DESC")
      .getMany();
  }

  async getFlowById(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async create(flowObject: flowSchemaType) {
    const flow = new Flow(flowObject);
    await this.repository.insert(flow);
    return flow;
  }

  async update(id: number, flow: flowSchemaType) {
    flow.updatedAt = new Date();
    await this.repository.update({ id: id }, flow as any);
    return this.getFlowById(id);
  }

  async deleteFlow(id: number) {
    console.log("delete flow", id);
    const result = await this.repository.delete({ id: id });
    console.log("delete flow result", result);
    return { success: true, affected: result.affected };
  }

  async addNode(flowId: number, nodeId: number) {
    await this.flowToNodeRepository.insert({
      flow: { id: flowId },
      node: { id: nodeId },
    });
  }

  async removeNode(flowId: number, nodeId: number) {
    await this.flowToNodeRepository.delete({
      flow: { id: flowId },
      node: { id: nodeId },
    });
  }
}

export default new FlowService();
