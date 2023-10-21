// create fastify routes for Node module
import { nodeSchemas, $ref } from "./node.schemas";
import type * as nodeTypes from "./node.schemas";
import { FastifyPluginAsync } from "fastify";
const routes: FastifyPluginAsync = async (server, opts): Promise<void> => {
  for (const schema of [...nodeSchemas]) {
    server.addSchema(schema);
  }

  server.get(
    "/:id",
    {
      schema: {
        description: "Get Node",
        tags: ["node"],
        summary: "Get Node",
        params: $ref("nodeGetByIdSchema"),
        response: {
          200: $ref("nodeReplySchema"),
        },
      },
      config: { auth: false },
    },
    async function (request, reply) {
      return {
        id: 1,
        name: "test",
        description: "test",
        actionType: "test",
        action: "test",
        createdAt: new Date(),
      };
    }
  );

  server.post<{ Body: nodeTypes.NodeSchemaType }>(
    "/",
    {
      schema: {
        description: "Create Node",
        tags: ["node"],
        summary: "Create Node",
        body: $ref("nodeCreateSchema"),
        response: {
          200: $ref("nodeReplySchema"),
        },
      },
      config: { auth: false },
    },
    async function (request, reply) {
      //  const node = await nodeService.createNode(request.body);
      return {};
    }
  );

  server.delete(
    "/:id",
    {
      schema: {
        description: "Delete Node",
        tags: ["node"],
        summary: "Delete Node",
        params: $ref("nodeGetByIdSchema"),
      },
    },
    async function (request, reply) {
      //  const node = await nodeService.deleteNode(request.params.id);
      return {};
    }
  );

  server.put(
    "/:id",
    {
      schema: {
        description: "Update Node",
        tags: ["node"],
        summary: "Update Node",
        params: $ref("nodeGetByIdSchema"),
        body: $ref("nodeCreateSchema"),
        response: {
          200: $ref("nodeReplySchema"),
        },
      },
    },
    async function (request, reply) {
      //  const node = await nodeService.updateNode(request.params.id, request.body);
      return {};
    }
  );
};

export default routes;
