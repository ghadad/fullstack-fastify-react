// create Node schema using zod with infer type
import { buildJsonSchemas } from "fastify-zod";

import { z } from "zod";
const nodeCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  actionType: z.string(),
  action: z.string(),
  createdAt: z.coerce.date(),
});

export type NodeSchemaType = z.infer<typeof nodeCreateSchema>;

const nodeReplySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  actionType: z.string(),
  action: z.string(),
  createdAt: z.coerce.date(),
});

const nodeGetByIdSchema = z.object({
  id: z.coerce.number(),
});

export type nodeGetByIdType = z.infer<typeof nodeGetByIdSchema>;

const nodesReplySchema = z.array(nodeReplySchema);
export type NodesReplyType = z.infer<typeof nodesReplySchema>;
export const { schemas: nodeSchemas, $ref } = buildJsonSchemas(
  {
    nodeGetByIdSchema,
    nodeCreateSchema,
    nodeReplySchema,
    nodesReplySchema,
  },
  { $id: "Node" }
);
