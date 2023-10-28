import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { Flow } from "./flow.model";
import { Node } from "../node/node.model";
@Entity()
export class FlowToNode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flow, (flow) => flow.flowToNodes)
  @JoinColumn({ name: "flowId", referencedColumnName: "id" })
  flow: Flow;

  @ManyToOne(() => Node, (node) => node.flowToNodes)
  @JoinColumn({ name: "nodeId", referencedColumnName: "id" })
  node: Node;

  @Column({ nullable: true })
  position: number;

  @Column({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "updatedAt",
    type: "timestamp",
    nullable: true,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
