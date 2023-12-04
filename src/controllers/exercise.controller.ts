import { Request, Response } from "express";
import { createJwt, logger } from "../tools";
import { Op,literal } from 'sequelize'; // Importa el operador Op de Sequelize
import  Exercise  from "../database/models/exercise";


export const readExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await Exercise.findAll();
        res.status(200).json(exercises);
    } catch (error) {
        logger("🚀 ~ file: exercise.controller.ts:11 ~ readExersices ~ error:", error)
        console.log("🚀 ~ file: exercise.controller.ts:11 ~ readExersices ~ error:", error)
        res.status(500).json({ message: "Error", error });
    }
}

export const readExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id);
        res.status(200).json(exercise);
    } catch (error) {
        logger("🚀 ~ file: exercise.controller.ts:20 ~ readExersice ~ error:", error)
        console.log("🚀 ~ file: exercise.controller.ts:20 ~ readExersice ~ error:", error)
        res.status(500).json({ message: "Error", error });
    }
}

export const readFilteredExercises = async (req: Request, res: Response) => {
    const { force, level, mechanic, muscles, category, equipment, page = 1 } = req.body;

    const limit = 12; // Número de ejercicios por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    try {
        // Construir dinámicamente el objeto de condiciones
        const whereCondition:any = {};
        if (force && force.length) whereCondition.force = force;
        if (level && level.length) whereCondition.level = level;
        if (mechanic && mechanic.length) whereCondition.mechanic = mechanic;
        if (equipment && equipment.length) whereCondition.equipment = equipment;
        if (muscles && muscles.length) {
            // Usar JSON_CONTAINS para MySQL
            whereCondition[Op.or] = muscles.map((muscle:string) => ({
                [Op.or]: [
                    literal(`JSON_CONTAINS(primaryMuscles, '"${muscle}"')`),
                    literal(`JSON_CONTAINS(secondaryMuscles, '"${muscle}"')`)
                ]
            }));
        }
        if (category && category.length) whereCondition.category = category;

        const exercises = await Exercise.findAll({
            where: Object.keys(whereCondition).length ? whereCondition : undefined,
            limit, // Limitar el número de resultados
            offset // Desplazar los resultados según la página
        });

        res.status(200).json(exercises);
    } catch (error) {
        logger("🚀 ~ file: exercise.controller.ts:20 ~ readExersice ~ error:", error)
        console.log("🚀 ~ file: exercise.controller.ts:20 ~ readExersice ~ error:", error)
        res.status(500).json({ message: "Error", error });
    }
};


export const createExercise = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const imgs = req.body.imgs.map(async (img:string)=>createJwt(img))

        req.body.imgs = await Promise.all(imgs)

        const exercise = await Exercise.create(req.body);
        res.status(200).json(exercise);
    } catch (error) {
        logger("🚀 ~ file: exercise.controller.ts:29 ~ createExersice ~ error:", error)
        console.log("🚀 ~ file: exercise.controller.ts:29 ~ createExersice ~ error:", error)
        res.status(500).json({ message: "Error", error });
    }
}

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id);
        await exercise?.update(req.body);
        res.status(200).json(exercise);
    } catch (error) {
        logger("🚀 ~ file: exercise.controller.ts:38 ~ updateExersice ~ error:", error)
        console.log("🚀 ~ file: exercise.controller.ts:38 ~ updateExersice ~ error:", error)
        res.status(500).json({ message: "Error", error });
    }
}

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id);
        await exercise?.destroy();
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        logger("🚀 ~ file: exercise.controller.ts:47 ~ deleteExersice ~ error:", error)
        console.log("🚀 ~ file: exercise.controller.ts:47 ~ deleteExersice ~ error:", error)
        res.status(500).json({ message: "Error", error });
    }
}