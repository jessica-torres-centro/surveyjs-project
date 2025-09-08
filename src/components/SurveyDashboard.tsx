// components/SurveyDashboard.tsx
import 'survey-analytics/survey.analytics.css';
import { useState } from 'react';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import { IVisualizationPanelOptions } from 'survey-analytics';
import { useEffect } from 'react';

const surveyJsonRaw = window.localStorage.getItem("survey-json");
const surveyResultsRaw = window.localStorage.getItem("survey-results");

// Parse survey definition (JSON schema)
const surveyJson = surveyJsonRaw ? JSON.parse(surveyJsonRaw) : { elements: [] };

// Parse results – VisualizationPanel expects an array of responses
// If you only save one survey result, wrap it in an array
const surveyResults = surveyResultsRaw ? [JSON.parse(surveyResultsRaw)] : [];
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
  
