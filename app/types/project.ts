import { Developer } from '@prisma/client';
export interface MappedProject {
    id: number;
    name: string;
    description: string;
    BETechnologies: string;
    FETechnologies: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    developers: Developer[];
}