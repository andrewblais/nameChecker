import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import * as projFunctions from "./projFunctions.cjs"

const app = express();

const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_NATION = "https://api.nationalize.io";
const API_AGE = "https://api.agify.io";
const API_GENDER = "https://api.genderize.io";

app.get("/", async (req, res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        console.error("Failed to make request: ", error.message);
    }
});

app.post("/get-name", async (req, res) => {
    try {
        const NAME = req.body.name;

        const responseNation = await axios.get(`${API_NATION}/?name=${NAME}`);
        const responseAge = await axios.get(`${API_AGE}/?name=${NAME}`);
        const responseGender = await axios.get(`${API_GENDER}/?name=${NAME}`);

        const resultNation = projFunctions.nationData(responseNation.data);
        const resultAge = responseAge.data.age;
        const resultGenderName = responseGender.data.gender;
        const resultGenderProb = responseGender.data.probability * 100;
        const resultGender = `${resultGenderName}, ${resultGenderProb}%`;

        res.render("index.ejs", {
            firstName: projFunctions.capitalizeWord(NAME),
            nationality: resultNation,
            age: resultAge,
            gender: projFunctions.capitalizeWord(resultGender),
        }),
            console.log(`\nName: ${NAME} Request Successful!`);
        console.log("EJS Successfully Updated!\n");
    } catch (error) {
        console.error("Failed to make request: ", error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
