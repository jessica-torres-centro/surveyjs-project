import { ComponentCollection, Serializer } from "survey-core";
//import { registerCreatorTheme } from "survey-creator-core";
//import { SurveyCreatorTheme } from "survey-creator-core"; // Or your chosen theme

//registerCreatorTheme(SurveyCreatorTheme); // Load the theme for Survey Creator
import "./contactinformation.css";

// Add a custom property for color
console.log("serializer before")
Serializer.addProperty("contactinformation", {
  name: "backgroundColor",
  category: "general", // Shows in the "general" tab in Survey Creator
  type: "color", // This tells Survey Creator to use a color picker
});
console.log("serializer runs")

ComponentCollection.Instance.add({
  name: "contactinformation",
  title: "Contact Information",
  defaultQuestionTitle: "Modal Pop-Up",
  elementsJSON: [
    { type: "text", name: "employeeName", title: "1. What is the name of the employee?"},
    { type: "dropdown", name: "educationlevel", title: "2. Education Level", "choices": [
      "high school",
      "bachelors",
      "masters"
    ] },
    { type: "dropdown", name: "profexperience", title: "3. How many years of professional experience do they have?", choices: [
      "1-2 year",
      "3-4 years",
      "4+ years"
    ] },
    { type: "boolean", name: "responsibilities", title: "Management responsibilities?"}
  ],
  onLoaded(question) {
    //question.panelWrapper.questionTitleLocation = "left";
    question.panelWrapper.questionTitleWidth = 120;
    console.log("inside onLoaded")
    /*
    console.log(question.customColor)
    if (question.customColor) {
      const colorClass = `custom-color-${question.customColor.replace("#", "").toLowerCase()}`;
      question.cssClasses.root += " custom-color-4287f5";
    }
    */
  },
  onAfterRender(question, el) {
    // Hardcode for testing
    el.classList.add("custom-color-red");
    // Or dynamic if you want
    if (question.backgroundColor) {
      const colorClass = `custom-color-${question.backgroundColor.replace("#", "").toLowerCase()}`;
      el.classList.add(colorClass);
    }
  },
});
