import { DataTypes } from "sequelize";
import db from "../database";

const Exercise = db.define('Exercise', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    force: {
        type: DataTypes.STRING,
        allowNull: true
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mechanic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    equipment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    primaryMuscles: {
        type: DataTypes.JSON,
        allowNull: false
    },
    secondaryMuscles: {
        type: DataTypes.JSON,
        allowNull: false
    },
    instructions: {
        type: DataTypes.JSON,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgs: {
        type: DataTypes.JSON,
        allowNull: false
    }
});


export default Exercise;