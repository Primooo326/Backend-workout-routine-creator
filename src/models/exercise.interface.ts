export interface ExerciseInterface { 
    name: string;
    force: Force;
    level: Level;
    mechanic: Mechanic;
    primaryMuscles: Muscle[];
    secondaryMuscles: Muscle[];
    category: Category;
    instructions: string[];
    path: string;
    imgs: string[];
}

export type Category =
    "strength" |
    "stretching" |
    "plyometrics" |
    "strongman" |
    "powerlifting" |
    "cardio" |
    "olympic weightlifting";

export type Equipment =
    "body only" |
    "machine" |
    "other" |
    "foam roll" |
    "kettlebells" |
    "dumbbell" |
    "cable" |
    "barbell" |
    "medicine ball" |
    "bands" |
    "exercise ball" |
    "e-z curl bar" |
    null;

export type Mechanic =
    "compound" |
    "isolation" |
    null;

export type Level =
    "beginner" |
    "intermediate" |
    "expert";

export type Force = 
    "pull" |
    "push" |
    "static" |
    null;

export type Muscle =
  "abdominals"|
  "hamstrings"|
  "adductors"|
  "quadriceps"|
  "biceps"|
  "shoulders"|
  "chest"|
  "middle back"|
  "calves"|
  "glutes"|
  "lower back"|
  "lats"|
  "triceps"|
  "traps"|
  "forearms"|
  "neck"|
  "abductors"|
  null