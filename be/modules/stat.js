import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import "../src/configs/mongoose.config";
import Models from "../src/models";
import fs from "fs";
import axios from "axios";
import bluebird from "bluebird";

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csv = require("csvtojson");
import _ from "lodash";

main();
async function main() {
  let dataCSV = await csv({
    noheader: true,
    output: "csv"
  }).fromFile("/Users/a1234/Downloads/CSVReport_a6a2f1dcb92a_B_Page#1_With_PageSize#5000.csv");

  const answers = await Models.Answer.find();

  const header = [
    {
      id: "stt",
      title: "#"
    },
    {
      id: "workerId",
      title: "Worker Id"
    },
    {
      id: "email",
      title: "email"
    },
    {
      id: "appName",
      title: "App name"
    },
    {
      id: "category",
      title: "category"
    },
    {
      id: "developer",
      title: "developer"
    },
    {
      id: "dataCollection",
      title: "Data collection"
    },
    {
      id: "dataCollectionPurpose",
      title: "Data collection purpose"
    },
    {
      id: "thirdParty",
      title: "Third party"
    },
    {
      id: "other",
      title: "Other"
    },
    {
      id: "question2",
      title: "Question 2"
    },
    {
      id: "response",
      title: "response"
    }
  ];
  const rows = [];
  const result2 = {
    appName: {
      total: 0
    },
    category: { total: 0 },
    developer: { total: 0 },
    dataCollection: { total: 0 },
    dataCollectionPurpose: { total: 0 },
    thirdParty: { total: 0 },
    question2: { total: 0 }
  };
  let stt = 1;
  for (let o = 0; o < answers.length; o++) {
    const answer = answers[o];
    const user = await Models.User.findById(answer.userId);
    const email = user.email;

    const microWorker = dataCSV.find(item => item[9].trim() === email);
    if (!microWorker) continue;

    const appName = answer.responses.find(item => item.name === "question11");
    const category = answer.responses.find(item => item.name === "question12");
    const developer = answer.responses.find(item => item.name === "question13");
    const dataCollection = answer.responses.find(item => item.name === "question2");
    const dataCollectionPurpose = answer.responses.find(item => item.name === "question31");
    const thirdParty = answer.responses.find(item => item.name === "question32");
    const other = answer.responses.find(item => item.name === "question4");
    const question2 = answer.responses.find(item => item.name === "question51");
    const response = answer.responses.find(item => item.name === "question52");
    if (appName && appName.value) {
      if (!result2["appName"][appName.value]) result2["appName"][appName.value] = 0;
      result2["appName"][appName.value]++;

      result2["appName"].total++;
    }
    if (category && category.value) {
      if (!result2["category"][category.value]) result2["category"][category.value] = 0;
      result2["category"][category.value]++;

      result2["category"].total++;
    }
    if (developer && developer.value) {
      if (!result2["developer"][developer.value]) result2["developer"][developer.value] = 0;
      result2["developer"][developer.value]++;

      result2["developer"].total++;
    }
    if (dataCollection && dataCollection.value) {
      if (!result2["dataCollection"][dataCollection.value])
        result2["dataCollection"][dataCollection.value] = 0;
      result2["dataCollection"][dataCollection.value]++;

      result2["dataCollection"].total++;
    }
    if (dataCollectionPurpose && dataCollectionPurpose.value) {
      if (!result2["dataCollectionPurpose"][dataCollectionPurpose.value])
        result2["dataCollectionPurpose"][dataCollectionPurpose.value] = 0;
      result2["dataCollectionPurpose"][dataCollectionPurpose.value]++;

      result2["dataCollectionPurpose"].total++;
    }

    if (thirdParty && thirdParty.value) {
      if (!result2["thirdParty"][thirdParty.value]) result2["thirdParty"][thirdParty.value] = 0;
      result2["thirdParty"][thirdParty.value]++;

      result2["thirdParty"].total++;
    }

    if (question2 && question2.value) {
      if (!result2["question2"][question2.value]) result2["question2"][question2.value] = 0;
      result2["question2"][question2.value]++;

      result2["question2"].total++;
    }

    rows.push({
      stt: stt++,
      ...(microWorker && {
        workerId: microWorker[3]
      }),
      email,
      ...(appName &&
        appName.value && {
          appName: getLable(appName.value)
        }),
      ...(category &&
        category.value && {
          category: getLable(category.value)
        }),
      ...(developer &&
        developer.value && {
          developer: getLable(developer.value)
        }),
      ...(dataCollection &&
        dataCollection.value && {
          dataCollection: getLable(dataCollection.value)
        }),
      ...(dataCollectionPurpose &&
        dataCollectionPurpose.value && {
          dataCollectionPurpose: getLable(dataCollectionPurpose.value)
        }),
      ...(thirdParty &&
        thirdParty.value && {
          thirdParty: getLable(thirdParty.value)
        }),
      ...(other &&
        other.value && {
          other: other.value
        }),
      ...(question2 &&
        question2.value && {
          question2: question2.value == 1 ? "Yes" : "No"
        }),
      ...(response &&
        response.value && {
          response: response.value
        })
    });
  }

  console.log(result2);
  const csvWriter = createCsvWriter({
    path: "./rais4-report(file1)(microworker).csv",
    header
  });
  csvWriter.writeRecords(rows);
  const text = `
  appName: Very unimportant((${result2.appName["1"]}-${(
    result2.appName["1"] / result2.appName.total
  ).toFixed(2) * 100}%)       Unimportant((${result2.appName["2"]}-${(
    result2.appName["2"] / result2.appName.total
  ).toFixed(2) * 100}%)       Neutral(((${result2.appName["3"]}-${(
    result2.appName["3"] / result2.appName.total
  ).toFixed(2) * 100}%)       Important(((${result2.appName["4"]}-${(
    result2.appName["4"] / result2.appName.total
  ).toFixed(2) * 100}%)       Very important(((${result2.appName["5"]}-${(
    result2.appName["5"] / result2.appName.total
  ).toFixed(2) * 100}%) \n

  category: Very unimportant(${result2.category["1"]}-${(
    result2.category["1"] / result2.category.total
  ).toFixed(2) * 100}%)       Unimportant(${result2.category["2"]}-${(
    result2.category["2"] / result2.category.total
  ).toFixed(2) * 100}%)       Neutral(${result2.category["3"]}-${(
    result2.category["3"] / result2.category.total
  ).toFixed(2) * 100}%)       Important(${result2.category["4"]}-${(
    result2.category["4"] / result2.category.total
  ).toFixed(2) * 100}%)       Very important(${result2.category["5"]}-${(
    result2.category["5"] / result2.category.total
  ).toFixed(2) * 100}%) \n

  developer: Very unimportant(${result2.developer["1"]}-${(
    result2.developer["1"] / result2.developer.total
  ).toFixed(2) * 100}%)       Unimportant(${result2.developer["2"]}-${(
    result2.developer["2"] / result2.developer.total
  ).toFixed(2) * 100}%)       Neutral(${result2.developer["3"]}-${(
    result2.developer["3"] / result2.developer.total
  ).toFixed(2) * 100}%)       Important(${result2.developer["4"]}-${(
    result2.developer["4"] / result2.developer.total
  ).toFixed(2) * 100}%)       Very important(${result2.developer["5"]}-${(
    result2.developer["5"] / result2.developer.total
  ).toFixed(2) * 100}%) \n

  dataCollection: Very unimportant(${result2.dataCollection["1"]}-${(
    result2.dataCollection["1"] / result2.dataCollection.total
  ).toFixed(2) * 100}%)       Unimportant(${result2.dataCollection["2"]}-${(
    result2.dataCollection["2"] / result2.dataCollection.total
  ).toFixed(2) * 100}%)       Neutral(${result2.dataCollection["3"]}-${(
    result2.dataCollection["3"] / result2.dataCollection.total
  ).toFixed(2) * 100}%)       Important(${result2.dataCollection["4"]}-${(
    result2.dataCollection["4"] / result2.dataCollection.total
  ).toFixed(2) * 100}%)       Very important(${result2.dataCollection["5"]}-${(
    result2.dataCollection["5"] / result2.dataCollection.total
  ).toFixed(2) * 100}%) \n

  dataCollectionPurpose: Very unimportant(${result2.dataCollectionPurpose["1"]}-${(
    result2.dataCollectionPurpose["1"] / result2.dataCollectionPurpose.total
  ).toFixed(2) * 100}%)       Unimportant(${result2.dataCollectionPurpose["2"]}-${(
    result2.dataCollectionPurpose["2"] / result2.dataCollectionPurpose.total
  ).toFixed(2) * 100}%)       Neutral(${result2.dataCollectionPurpose["3"]}-${(
    result2.dataCollectionPurpose["3"] / result2.dataCollectionPurpose.total
  ).toFixed(2) * 100}%)       Important(${result2.dataCollectionPurpose["4"]}-${(
    result2.dataCollectionPurpose["4"] / result2.dataCollectionPurpose.total
  ).toFixed(2) * 100}%)       Very important(${result2.dataCollectionPurpose["5"]}-${(
    result2.dataCollectionPurpose["5"] / result2.dataCollectionPurpose.total
  ).toFixed(2) * 100}%) \n

  thirdParty: Very unimportant(${result2.thirdParty["1"]}-${(
    result2.thirdParty["1"] / result2.thirdParty.total
  ).toFixed(2) * 100}%)       Unimportant(${result2.thirdParty["2"]}-${(
    result2.thirdParty["2"] / result2.thirdParty.total
  ).toFixed(2) * 100}%)       Neutral(${result2.thirdParty["3"]}-${(
    result2.thirdParty["3"] / result2.thirdParty.total
  ).toFixed(2) * 100}%)       Important(${result2.thirdParty["4"]}-${(
    result2.thirdParty["4"] / result2.thirdParty.total
  ).toFixed(2) * 100}%)       Very important(${result2.thirdParty["5"]}-${(
    result2.thirdParty["5"] / result2.thirdParty.total
  ).toFixed(2) * 100}%) \n

  question2: Yes(${result2.question2["1"]}-${(
    result2.question2["1"] / result2.question2.total
  ).toFixed(2) * 100}%)       No(${result2.question2["0"]}-${(
    result2.question2["0"] / result2.question2.total
  ).toFixed(2) * 100}%) \n
  `;

  fs.writeFileSync("./rais4-report(file2)(microworker).text", text);
  console.log(text);
  console.log("DONE");
}

function getLable(value) {
  const questionOptions = [
    { label: "Very unimportant", value: 1 },
    { label: "Unimportant", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Important", value: 4 },
    { label: "Very important", value: 5 }
  ];

  const option = questionOptions.find(item => item.value === parseInt(value));

  return option && option.value;
}
