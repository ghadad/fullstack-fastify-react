import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//
@Entity()
export class Node {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  // foreign key for flow
  @Column({
    type: "int",
    name: "flowId",
    unsigned: true,
    foreignKeyConstraintName: "fk_flowId",
    default: 0,
  })
  flowId: number;

  @Column({ length: 50 })
  name: string;

  @Column("text")
  description: string;

  @Column("text")
  actionType: string;

  @Column("text")
  action: string;

  @Column("date", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("date", { nullable: true })
  updatedAt: Date;
}
