// create the flow route
import { FastifyPluginAsync } from "fastify";
import { flowSchemas, $ref } from "./flow.schema";
const routes: FastifyPluginAsync = async (server, opts): Promise<void> => {
  for (const schema of [...flowSchemas]) {
    server.addSchema(schema);
  }

  server.get(
    "/:id",
    {
      schema: {
        description: "Get Flow",
        tags: ["flow"],
        summary: "Get Flow",
        params: $ref("flowGetByIdSchema"),
        response: {
          200: $ref("flowReplySchema"),
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

  server.post(
    "/",
    {
      schema: {
        description: "Create Flow",
        tags: ["flow"],
        summary: "Create Flow",
        body: $ref("flowCreateSchema"),
        response: {
          200: $ref("flowReplySchema"),
        },
      },
    },
    async function (request, reply) {
      //  const flow = await flowService.createFlow(request.body);
      return {};
    }
  );

  server.delete(
    "/:id",
    {
      schema: {
        description: "Delete Flow",
        tags: ["flow"],
        summary: "Delete Flow",
        params: $ref("flowGetByIdSchema"),
        response: {
          200: $ref("flowReplySchema"),
        },
      },
    },
    async function (request, reply) {
      //  const flow = await flowService.deleteFlow(request.params.id);
      return {};
    }
  );

  server.put(
    "/:id",
    {
      schema: {
        description: "Update Flow",
        tags: ["flow"],
        summary: "Update Flow",
        params: $ref("flowGetByIdSchema"),
        body: $ref("flowCreateSchema"),
        response: {
          200: $ref("flowReplySchema"),
        },
      },
    },
    async function (request, reply) {
      //  const flow = await flowService.updateFlow(request.params.id, request.body);
      return {};
    }
  );
};

export default routes;
