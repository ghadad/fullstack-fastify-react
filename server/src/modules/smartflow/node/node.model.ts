import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//
@Entity()
export class Node {
  constructor(nodeObject: any) {
    Object.assign(this, nodeObject);
  }

  @PrimaryGeneratedColumn()
  id: number;

  // foreign key for flow
  @Column({
    type: "bigint",
    name: "flowId",
    unsigned: true,
    foreignKeyConstraintName: "fk_node_flow_id",
    default: 0,
  })
  flowId: number;

  @Column({ length: 50 })
  name: string;

  @Column("text")
  description: string;

  @Column("int", { unsigned: true, default: 0 })
  position: number;

  @Column({ type: "char", length: 10 })
  actionType: string;

  @Column("text")
  action: string;

  @Column("date", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("date", { nullable: true })
  updatedAt: Date;
}
