import * as exercise from "../controllers/exercise.controller";

import { Router } from "express";

const router = Router();

router.get("/", exercise.readExercises);
router.get("/:id", exercise.readExercise);
router.post("/", exercise.createExercise);
router.post("/filter", exercise.readFilteredExercises);
router.put("/:id", exercise.updateExercise);
router.delete("/:id", exercise.deleteExercise);

export default router;