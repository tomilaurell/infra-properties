import core = require('@aws-cdk/core');
import fs = require("fs");
import generateDotEnv from "./generateDotEnv";

function removeFileIfExist(path: string) {
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {}
}

test("Branch specific .env-file should be written", async () => {
  // Given
  const app = new core.App({ context: {
      "aws:cdk:toolkit:default-account": "TEST_ACCOUNT",
      "aws:cdk:toolkit:default-region": "DEFAULT_REGION"
    }})

  const pathToServerlessFolder = "./serverless-child";
  const variablesFilePath = `${pathToServerlessFolder}/.env`;
  removeFileIfExist(variablesFilePath);

  // When
  await generateDotEnv(app, "./serverless-child");

  // Then
  const content = fs.readFileSync(variablesFilePath, "utf8");
  expect(content.indexOf("SERVERLESS_REGION")).toBeGreaterThan(0);
});
