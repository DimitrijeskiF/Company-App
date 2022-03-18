import { Project, PrismaClient, Developer } from "@prisma/client";
import { MappedProject } from "../../types/project";
import { mapSingleProjectValues } from "../../helpers/helpers";
const prisma = new PrismaClient();


export const ProjectService = {
    async getAllProjects(): Promise<Project[]> {
        const projects = prisma.project.findMany();
        return projects;
    },

    async getSingleProject(id: number): Promise<MappedProject> {
        const developers = await this.getDevelopersForSpecificProject(id);
        const project = await prisma.project.findUnique({
            where: { id: id }
        });

        if (!project) {
            return {} as MappedProject;
        }

        const mappedProject = mapSingleProjectValues(project, developers);
        return mappedProject;
    },

    async addProject(project: Project): Promise<Project> {
        const createdDeveloper = await prisma.project.create({
            data: {
                name: project.name,
                description: project.description,
                BETechnologies: project.BETechnologies,
                FETechnologies: project.FETechnologies,
                startTime: new Date(project.startTime),
                endTime: new Date(project.endTime),
            }
        })

        return createdDeveloper;
    },

    async addDeveloperToProject(projectId: number, id: number): Promise<Project> {
        const project = await prisma.project.update({
            where: { id: projectId },
            data: {
                developers: {
                    create: [{
                        developer: {
                            connect: {
                                id: id
                            }
                        }
                    }]
                }
            }
        })

        return project;
    },

    async getDevelopersForSpecificProject(id: number): Promise<Developer[]> {
        const developers = await prisma.developer.findMany({
            where: {
                projects: {
                    some: {
                        project: {
                            id: id
                        }
                    }
                }
            }
        });

        return developers;
    },

    async updateProject(id: number, project: Project): Promise<Project> {
        const updatedProject = prisma.project.update({
            where: {id: id},
            data: project
        })
        return updatedProject;
    },

    async deleteProject(id: number): Promise<Project> {
        const project = await prisma.project.delete({
            where: { id: id }
        });
        return project;
    },
}