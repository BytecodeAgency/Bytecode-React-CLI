const path = require("path");
const cli = require("./cli");
const writer = require("./writefile");
const templates = require("./templates");

const getConfig = () => {
    const currentDir = path.resolve();
    const fileName = ".bcr-config.js";
    const requiredFile = `${currentDir}/${fileName}`;
    const config = require(requiredFile);
    if (!config) {
        console.log(
            "The .bcr-config.js file was not found. For installation instructions, check the README.md file."
        );
        process.exit(1);
    }
    return config;
};

const getQuestions = (config) => [
    {
        type: "list",
        name: "type",
        message: "Please select the type of files you would like to create",
        choices: Object.keys(config.options),
    },
    {
        type: "input",
        name: "name",
        message:
            "What should the component/domain name be (please use PascalCase for React components, and camelCase for Redux domains)",
    },
];

const app = () => {
    const config = getConfig();
    const questions = getQuestions(config);
    cli(questions).then((ans) => handleAnswers(ans));
};

const handleAnswers = (answers) => {
    const { type, name } = answers;
    const selectedOption = getConfig().options[type];
    filesToCreate = templates[selectedOption.template](name);
    const fileDataArr = Object.entries(filesToCreate);
    fileDataArr.forEach((fileData) => {
        const [fileName, fileContents] = fileData;
        const destDir = `${selectedOption.path}/${name}`;
        writer(destDir, fileName, fileContents);
    });
    if (selectedOption.additionalInstructions) {
        console.log(selectedOption.additionalInstructions);
    }
    console.log("Files created succesfully");
};

module.exports = app;
