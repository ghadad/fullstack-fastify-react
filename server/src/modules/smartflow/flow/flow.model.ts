import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { flowSchemaType } from "./flow.schema";
import { FlowToNode } from "./flowToNode.model";

@Entity()
export class Flow {
  constructor(flowObject: flowSchemaType) {
    Object.assign(this, flowObject);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => FlowToNode, (flowToNode) => flowToNode.flow)
  flowToNodes: FlowToNode[];

  @Column({ length: 50 })
  title: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ length: 300, nullable: true })
  tags: string;

  @Column({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "updfaetdAt",
    type: "timestamp",
    nullable: true,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
