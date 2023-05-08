const fs = require("fs");

// directory where evals are contained
const directoryPath = "./public/evals";

fs.readdir(directoryPath, (error, files) => {
  if (error) {
    console.error("Error reading directory:", error);
    return;
  }

  const fileNames = files
    .filter((file) => {
      return fs.statSync(`${directoryPath}/${file}`).isFile();
    })
    .map((file) => {
      return file;
    });

  const jsonData = JSON.stringify(fileNames, null, 2);
  fs.writeFileSync("./public/evalsFilenames.json", jsonData);

  console.log("File names saved to public/evalsFilenames.json");
});
