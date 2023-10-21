// create Node schema using zod with infer type
import { buildJsonSchemas } from "fastify-zod";

import { z } from "zod";
const nodeCreateSchema = z.object({
  name: z.string(),
  flowId: z.number().optional(),
  description: z.string(),
  actionType: z.string(),
  action: z.string(),
  createdAt: z.coerce.date(),
});

export type nodeSchemaType = z.infer<typeof nodeCreateSchema>;

const nodeReplySchema = z.object({
  id: z.number(),
  ...nodeCreateSchema.shape,
});

const nodesReplySchema = z.array(nodeReplySchema);

export type NodesReplyType = z.infer<typeof nodesReplySchema>;

export type nodeReplySchema = z.infer<typeof nodeReplySchema>;

const nodeGetByIdSchema = z.object({
  id: z.coerce.number(),
});

export type nodeGetByIdType = z.infer<typeof nodeGetByIdSchema>;

export const { schemas: nodeSchemas, $ref } = buildJsonSchemas(
  {
    nodeGetByIdSchema,
    nodeCreateSchema,
    nodeReplySchema,
    nodesReplySchema,
  },
  { $id: "Node" }
);
