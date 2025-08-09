// components/Survey.tsx
//this will render the survey created in Survey Creator

import 'survey-core/survey-core.css';

import {Model} from 'survey-core';
import {Survey} from 'survey-react-ui'

import CustomTheme from "./CustomTheme";

//need to import JSON saved in localstorage
const defaultJson = {
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  }

export default function SurveyComponent(){
    //grabbing content saved to localstorage and saving it, else display default JSON data
    const contentToRender = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
    //Model is a constructor and you're creating an instance of Model and naming it survey
    const survey = new Model(contentToRender);
    //add theme to survey
    survey.applyTheme(CustomTheme);
    return <Survey model={survey}/>;
}