import FlowService from "./flow.service";

import { Flow } from "./flow.model";
import { Node } from "../node/node.model";
import NodeProcessor from "../node/NodeProcessor";
export default class FlowProcessor {
  flowService: FlowService;
  flow: Flow | null;
  nodes: Node[];
  constructor(readonly id: number) {
    this.flowService = new FlowService();
  }

  async init() {
    this.flow = await this.flowService.getFlowById(this.id);
    if (this.flow == null) {
      throw new Error("Flow not found");
    }
    this.nodes = await this.flowService.getNodes(this.id);
  }

  getFlow() {
    return this.flow;
  }

  getNodes() {
    return this.nodes;
  }

  async execute() {
    console.log("execute flow : ", this.flow!.id);
    const promises = [];

    for (const node of this.nodes) {
      const nodeProcessor = new NodeProcessor(node);
      promises.push(nodeProcessor.execute());
    }

    return await Promise.all(promises);
  }
}
