import express from "express";
import router from "./index";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
	console.log(`Week 4 app listening on port ${port}`);
});
