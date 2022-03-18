import { Developer, Project } from '@prisma/client';
import { MappedDeveloper } from './../types/developer';
import { MappedProject } from './../types/project';

export const mapSingleDeveloperValues = (developer: Developer, projects: Project[]) => {
    const mappedDeveloper: MappedDeveloper = {
        id: developer.id,
        name: developer.name,
        experiance: developer.experiance,
        position: developer.position,
        startWorking: developer.startWorking,
        projects: projects,
        ceratedAt: developer.createdAt,
        updatedAt: developer.updatedAt
    }

    return mappedDeveloper;
}

export const mapSingleProjectValues = (project: Project, developers: Developer[]) => {
    const mappedProject: MappedProject = {
        id: project.id,
        name: project.name,
        FETechnologies: project.FETechnologies,
        BETechnologies: project.BETechnologies,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        startTime: project.startTime,
        endTime: project.endTime,
        developers: developers
    }

    return mappedProject;
}
