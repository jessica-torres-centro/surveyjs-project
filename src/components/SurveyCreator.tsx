// components/SurveyCreator.tsx
import { useState, useEffect } from "react";
import { SurveyCreator } from "survey-creator-react";
//this is to render the Survey Creator
import { SurveyCreatorComponent } from "survey-creator-react";
import SurveyTheme from "survey-core/themes";
import { registerSurveyTheme } from "survey-creator-core";

import CustomTheme from "./CustomTheme";

//survey Creator and Form Library styling sheets
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";

import { ICreatorOptions } from "survey-creator-core";

registerSurveyTheme(SurveyTheme);

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true,
  showThemeTab: true
};
//default JSON that appears if no localstorage JSON data is found or when SurveyCreator is launched for the first time
const defaultJson = {
    pages: [{
      name: "Name",
      elements: [{
        name: "FirstName",
        title: "Enter your first name:",
        type: "text"
      }, {
        name: "LastName",
        title: "Enter your last name:",
        type: "text"
      }]
    }]
  };

//what will show the Survey Creator UI, takes in JSON data and the Creator UI Options
export default function SurveyCreatorWidget(props: { json?: Object, options?: ICreatorOptions }) {
    //set creator state
    let [creator, setCreator] = useState<SurveyCreator>();
    //if no creator, make one from SurveyCreator and set it to creator
    if (!creator) {
      creator = new SurveyCreator(props.options || defaultCreatorOptions);
      creator.applyTheme(CustomTheme);
      setCreator(creator);
    }

    //to grab existing JSON data
    creator.text = JSON.stringify(props.json) || window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);

    //to save JSON data
    creator.saveSurveyFunc = (saveNo: number, callback: (num: number, status: boolean) => void) => {
        // If you use localStorage:
        //using 'creator!' bc there will always be JSON data available
        window.localStorage.setItem("survey-json", creator!.text);
        callback(saveNo, true);
    
      };
      
      /*
      const [creator] = useState(() => {
        const c = new SurveyCreator(props.options || defaultCreatorOptions);
        c.applyTheme(CustomTheme);
        return c;
      });
    
      // set survey JSON on mount or when props.json changes
      useEffect(() => {
        const initialJson = props.json ? JSON.stringify(props.json) : window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
        creator.text = initialJson;
      }, [props.json, creator]);
    
      // attach save function once
      useEffect(() => {
        creator.saveSurveyFunc = (saveNo: number, callback: (num: number, status: boolean) => void) => {
          window.localStorage.setItem("survey-json", creator.text);
          callback(saveNo, true);
        };
      }, [creator]);
      */
    return (
        <div style={{ height: "100vh", width: "100%" }}>
          <SurveyCreatorComponent creator={creator} />
        </div>
      );
  }