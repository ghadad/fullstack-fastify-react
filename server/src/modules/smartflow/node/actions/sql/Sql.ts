import BaseAction from "../../BaseAction";
import { sqlSchemaType } from "./schemas";
import { DataSource } from "typeorm";
class Sql extends BaseAction<sqlSchemaType> {
  constructor(private data: sqlSchemaType, public db: DataSource) {
    super("sql", data);
  }

  async invoke(params: any): Promise<any> {
    return await this.db.query(this.data.sql, params);
  }
}

export default Sql;
