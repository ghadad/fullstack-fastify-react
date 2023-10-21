import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { flowSchemaType } from "./flow.schema";

@Entity()
export class Flow {
  constructor(flowObject: flowSchemaType) {
    Object.assign(this, flowObject);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ length: 300, nullable: true })
  tags: string;

  //create createAt and updateAt columns which is Date type from typeorm
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  updatedAt: Date;
}
