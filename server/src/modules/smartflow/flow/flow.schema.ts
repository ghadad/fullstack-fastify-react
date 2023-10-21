// create Node schema using zod with infer type
import { buildJsonSchemas } from "fastify-zod";

import { z } from "zod";
const flowCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  actionType: z.string(),
  action: z.string(),
  createdAt: z.coerce.date(),
});

export type FlowSchemaType = z.infer<typeof flowCreateSchema>;

const flowGetByIdSchema = z.object({
  id: z.coerce.number(),
});

export type flowGetByIdType = z.infer<typeof flowGetByIdSchema>;

const flowReplySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  actionType: z.string(),
  action: z.string(),
  createdAt: z.coerce.date(),
});

const flowsReplySchema = z.array(flowReplySchema);
export type flowsReplySchema = z.infer<typeof flowsReplySchema>;
export const { schemas: flowSchemas, $ref } = buildJsonSchemas(
  {
    flowGetByIdSchema,
    flowCreateSchema,
    flowsReplySchema,
    flowReplySchema,
  },
  { $id: "Flow" }
);
