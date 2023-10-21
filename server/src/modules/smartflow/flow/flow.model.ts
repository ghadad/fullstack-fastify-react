import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Flow {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column({ length: 50, unique: true })
  title: string;

  //create createAt and updateAt columns which is Date type from typeorm
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;
}
