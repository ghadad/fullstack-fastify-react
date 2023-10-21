// create the flow route
import { FastifyPluginAsync } from "fastify";
import { flowSchemas, $ref } from "./flow.schema";
import type * as flowTypes from "./flow.schema";
import flowService from "./flow.service";
const routes: FastifyPluginAsync = async (server, opts): Promise<void> => {
  for (const schema of [...flowSchemas]) {
    server.addSchema(schema);
  }

  server.get<{ Params: flowTypes.flowGetByIdType }>(
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
      const result = await flowService.getFlowById(request.params.id);
      if (result) {
        return result;
      } else {
        reply.code(404).send({ message: "Flow not found" });
      }
    }
  );

  server.post<{ Body: flowTypes.flowSchemaType }>(
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
      const result = await flowService.create(request.body);
      return result;
    }
  );

  server.delete<{ Params: flowTypes.flowGetByIdType }>(
    "/:id",
    {
      config: { auth: false },
      schema: {
        description: "Delete Flow",
        tags: ["flow"],
        summary: "Delete Flow",
        params: $ref("flowGetByIdSchema"),
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              affected: { type: "number" },
            },
          },
        },
      },
    },
    async function (request, _reply) {
      return await flowService.deleteFlow(request.params.id);
    }
  );

  server.put<{
    Body: flowTypes.flowSchemaType;
    Params: flowTypes.flowGetByIdType;
  }>(
    "/:id",
    {
      config: { auth: false },
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
      const flow = await flowService.updateFlow(
        request.params.id,
        request.body
      );
      return flow;
    }
  );
};

export default routes;
