import app from "./app";
import  config  from "./config";
import db from "./database/database";

const PORT = config.PORT;

db.sync({ force: false }).then(() => {
    console.log("Database connected");
}).catch((err) => {
    throw new Error(err);
})

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});