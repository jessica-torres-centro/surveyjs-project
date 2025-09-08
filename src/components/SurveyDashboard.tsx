// components/SurveyDashboard.tsx
import 'survey-analytics/survey.analytics.css';
import { useState } from 'react';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import { IVisualizationPanelOptions } from 'survey-analytics';
import { useEffect } from 'react';

/*
const surveyJsonRaw = window.localStorage.getItem("survey-json");
const surveyResultsRaw = window.localStorage.getItem("survey-results");

const surveyJson = surveyJsonRaw ? JSON.parse(surveyJsonRaw) : { elements: [] };
const surveyResults = surveyResultsRaw ? [JSON.parse(surveyResultsRaw)] : [];

*/
const surveyJson = {
  elements: [{
    name: "industry",
    title: "What industry is your business in?",
    type: "radiogroup",
    choices: [
      { value: 8, text: "Agriculture" },
      { value: 7, text: "Dining and Entertainment" },
      { value: 6, text: "Domestic Services" },
      { value: 5, text: "Products" },
      { value: 4, text: "Health and Fitness" },
      { value: 3, text: "Technical Services"},
      { value: 2, text: "Professional Services"},
      { value: 1, text: "Other"}
    ],
    isRequired: true
  }, {
    name: "nps-score",
    title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
    type: "rating",
    rateMin: 0,
    rateMax: 10,
  },
  {
    name: "name-input",
    title: "What is your name?",
    type: "text",
  },
  {
    name: "employees",
    title: "List your employees",
    type: "matrixdynamic",
    "columns": [
      { "name": "employee-name", "title": "Name of Employee", "cellType": "text" },
      { "name": "education-level", "title": "Education Level", "cellType": "dropdown", "choices": ["less than high school", "High School", "College"] },
      { "name": "experience-years", "title": "Years of Experience", "cellType": "dropdown", "choices": ["less than 1", "1", "2", "more than 2"]}
    ],
    "rowCount": 1
  }



],
  completedHtml: "Thank you for your feedback!",
};

const surveyResults = [{
  "industry": 5,
  "nps-score": 10,
  "name-input": "Jes",
  "employees": [
    {"employee-name": "Jess", "education-level": "College", "experience-years": "2"},
    {"employee-name": "Dave", "education-level": "High School", "experience-years": "1"}
  ]
}, {
  "industry": 5,
  "nps-score": 9,
  "name-input": "Jes",
  "employees": [
    {"employee-name": "John", "education-level": "College", "experience-years": "2"},
    {"employee-name": "Kay", "education-level": "High School", "experience-years": "1"}
  ]
}, {
  "industry": 3,
  "nps-score": 6,
  "name-input": "Ted"
}, {
  "industry": 3,
  "nps-score": 6,
  "name-input": "John"
}, {
  "industry": 2,
  "nps-score": 3,
  "name-input": "Sally"
}];

const vizPanelOptions: IVisualizationPanelOptions = {
  allowHideQuestions: false
}

export default function DashboardComponent() {
    const [survey, setSurvey] = useState<Model>();
    const [vizPanel, setVizPanel] = useState<VisualizationPanel>();
  
    if (!survey) {
        const survey = new Model(surveyJson);
        setSurvey(survey);
      }
    
    if (!vizPanel && !!survey) {
        const vizPanel = new VisualizationPanel(
          survey.getAllQuestions(),
          surveyResults,
          vizPanelOptions
        );
        setVizPanel(vizPanel);
      }
  
    useEffect(() => {
        vizPanel?.render("surveyVizPanel");
        return () => {
          vizPanel?.clear();
        }
      }, [vizPanel]);
    
      return (
        <div id="surveyVizPanel" />
      );
  }
  
