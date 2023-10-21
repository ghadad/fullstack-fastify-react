// create schema example with infer type using zod 

import { z } from 'zod';
export const FlowSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
    });

export type FlowSchemaType = z.infer<typeof FlowSchema>;
