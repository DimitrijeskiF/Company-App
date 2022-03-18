import { Router, Request, Response } from "express";
import { DeveloperService } from "../services/developer/developer.service";
import { Developer } from '@prisma/client';
import { MappedDeveloper } from './../types/developer';

const router = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
    try {
        const developers: Developer[] = await DeveloperService.getAllUsers();
        if (!developers) {
            res.status(404).send({ msg: 'No Developers Found!' });
        }
        res.status(201).send(developers);
    } catch (error) {
        res.status(500).send({ msg: error });
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const developer: MappedDeveloper | null = await DeveloperService.getSingleDeveloper(id);
        if (!developer) {
            res.status(404).send({ msg: 'No Developers Found!' });
        }
        res.status(201).send(developer);
    } catch (error) {
        res.status(500).send({ msg: error });

    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const developer: Developer = await DeveloperService.addDeveloper(req.body);
        res.status(201).send(developer);
    } catch (error) {
        res.status(500).send({ msg: error });

    }
})

router.put('/project/:id', async (req: Request, res: Response) => {
    const projectId = req.body.projectId;
    const developerId = +req.params.id
    try {
        const developer = await DeveloperService.addProjectToDeveloper(developerId, projectId)
        res.status(201).send(developer);
    } catch (error) {
        res.status(500).send({ msg: error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const developerId = +req.params.id;
    try {
        const developer = await DeveloperService.updateDeveloper(developerId, req.body);
        console.log(developer);

        res.status(201).send(developer);
    } catch (error) {
        res.status(500).send({ msg: error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const developerId = +req.params.id;
    try {
        const developer = await DeveloperService.deleteDeveloper(developerId);
        res.status(200).send(developer)
    } catch (error) {
        res.status(500).send({ msg: error });
    }
})

router.delete('/:developerId/project/:projectId', async (req: Request, res: Response) => {
    const developerId = +req.params.developerId;
    const projectId = +req.params.projectId;

    try {
        const ids = await DeveloperService.deleteProjectFromDeveloper(projectId, developerId)
        res.status(200).send(ids)
    } catch (error) {
        res.status(500).send({ msg: error });
    }
})


export const DeveloperRouter = router;