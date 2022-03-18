import { Developer, PrismaClient, Project, ProjectsOnUsers } from "@prisma/client";
import { mapSingleDeveloperValues } from "../../helpers/helpers";
import { MappedDeveloper } from './../../types/developer';
const prisma = new PrismaClient();


export const DeveloperService = {
    async getAllUsers(): Promise<Developer[]> {
        const developers = prisma.developer.findMany()
        return developers;
    },

    async getSingleDeveloper(id: number): Promise<MappedDeveloper> {
        const projects: Project[] = await this.getProjectsForSpecificDeveloper(id);
        const developer = await prisma.developer.findUnique({
            where: { id: id },
        });

        if (!developer) {
            return {} as MappedDeveloper;
        }

        const mappedDeveloper: MappedDeveloper = mapSingleDeveloperValues(developer, projects)
        return mappedDeveloper;
    },

    async addDeveloper(developer: Developer): Promise<Developer> {
        const createdDeveloper = await prisma.developer.create({
            data: {
                name: developer.name,
                position: developer.position,
                startWorking: new Date(developer.startWorking),
                experiance: developer.experiance
            }
        })
        return createdDeveloper;
    },

    async addProjectToDeveloper(devId: number, id: number): Promise<Developer> {
        const createdDeveloper = await prisma.developer.update({
            where: { id: devId },
            data: {
                projects: {
                    create: [{
                        project: {
                            connect: {
                                id: id
                            }
                        }
                    }]
                }
            }
        })
        return createdDeveloper;
    },

    async getProjectsForSpecificDeveloper(id: number): Promise<Project[]> {
        const projects = await prisma.project.findMany({
            where: {
                developers: {
                    some: {
                        developer: {
                            id: id
                        }
                    }
                }
            }
        });
        return projects
    },

    async updateDeveloper(id: number, developer: Developer): Promise<Developer> {
        const updatedDeveloper = await prisma.developer.update({
            where: { id: id },
            data: developer
        })
        return updatedDeveloper;
    },

    async deleteDeveloper(id: number): Promise<Developer> {
        const deletedDeveloper = await prisma.developer.delete({
            where: { id: id }
        })
        return deletedDeveloper
    },

    async deleteProjectFromDeveloper(projectId: number, developerId: number): Promise<ProjectsOnUsers> {
        const developer = await prisma.projectsOnUsers.delete({
            where: {
                developerId_projectId: {
                    projectId,
                    developerId
                }
            }
        });
        return developer;
    }
}