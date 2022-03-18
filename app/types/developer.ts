import { Project } from '@prisma/client';

export interface MappedDeveloper {
    id:number;
    name: string;
    position: string;
    experiance: string;
    startWorking: Date;
    projects: Project[];
    ceratedAt: Date;
    updatedAt: Date;
}