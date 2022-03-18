import { Router, Request, Response } from "express";
import { ProjectService } from "../services/project/project.service";
import { Project } from "@prisma/client";

const router = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await ProjectService.getAllProjects();

        if (!projects) {
            res.status(404).send({ msg: 'No Projects Found!!' });
        }

        res.status(200).send(projects)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const project = await ProjectService.getSingleProject(id);
        if (!project) {
            res.status(404).send({ msg: 'No Projects Found!!' });
        }
        res.status(200).send(project)
    } catch (error) {
        res.status(500).send({ msg: error })

    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const project: Project = await ProjectService.addProject(req.body);
        res.status(201).send(project)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const project = await ProjectService.deleteProject(id)
        if (!project) {
            res.status(404).send({ msg: 'No Projects Found!!' });
        }
        res.status(203).send(project)
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error })

    }
});

router.put('/developer/:id', async (req: Request, res: Response) => {
    const developerId = req.body.developerId;
    const projectId = +req.params.id;
    try {
        const project = await ProjectService.addDeveloperToProject(projectId, developerId);
        res.status(201).send(project);
    } catch (error) {
        res.status(500).send({ msg: error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const projectId = +req.params.id;
    try {
        const updatedProject = await ProjectService.updateProject(projectId, req.body);
        res.status(201).send(updatedProject);
    } catch (error) {
        res.status(500).send({ msg: error });
    }
})


export const ProjectRouter = router;