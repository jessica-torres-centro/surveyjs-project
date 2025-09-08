// components/SurveyCreator.tsx
import { useState, useEffect } from "react";
import { SurveyCreator } from "survey-creator-react";
//this is to render the Survey Creator
import { SurveyCreatorComponent } from "survey-creator-react";
import SurveyTheme from "survey-core/themes";
import { registerSurveyTheme } from "survey-creator-core";
//survey Creator and Form Library styling sheets
import "./customquestions/contactinformation.css";
import CustomTheme from "./CustomTheme";
import "survey-creator-core/i18n/spanish"; // built-in Spanish UI strings

import "./customquestions/ContactInformationQuestion";
import "./customquestions/DescriptiveTextQuestion";

import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";


import { ICreatorOptions } from "survey-creator-core";

registerSurveyTheme(SurveyTheme);

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true,
  showThemeTab: true,
  showTranslationTab: true,   // show the Translations tab
  showJSONEditorTab: true,    // allow direct JSON editing
  isReadOnly: false,
  clearTranslationsOnSourceTextChange: true
};
//default JSON that appears if no localstorage JSON data is found or when SurveyCreator is launched for the first time

/*const defaultJson = {
    locale: "en",
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
*/

const defaultJson = {
  locale: "en",
  title: "My survey",
  pages: [
    {
      name: "Name",
      elements: [
        {
          type: "descriptivetext",
          name: "question1",
          visible: false,
          title: "a title",
          headerText: "Part 2.",
          bodyText: "Vision, Mission, Values",
          backgroundColor: "#93a48e"
        },
        {
          type: "html",
          name: "question5",
          title: "a title",
          description: "question",
          readOnly: true,
          html: `<div style="background-color: #9ecfde; border-radius: 15px; text-align:left; padding: 2rem">
<p style="font-weight:bold">Part 1</p>
<p>Vision, Mission, Values</p>
</div>`
        },
        {
          type: "contactinformation",
          name: "question2"
        },
        {
          type: "text",
          name: "question4"
        }
      ]
    },
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "business-name",
          title: {
            default: "Business Name",
            es: "Nombre de negocio"
          }
        },
        {
          type: "text",
          name: "business-description",
          title: "Business Description"
        },
        {
          type: "text",
          name: "legal-entity",
          title: "Legal Entity"
        },
        {
          type: "dropdown",
          name: "growth-stage",
          title: "Growth Stage",
          choices: [
            { value: "Item 1", text: "start up" },
            { value: "Item 2", text: "medium" },
            { value: "Item 3", text: "advanced" }
          ]
        },
        {
          type: "text",
          name: "numberinput1",
          title: "Years spent planning",
          inputType: "number"
        },
        {
          type: "text",
          name: "numberinput2",
          title: "Years business has been operating",
          inputType: "number"
        },
        {
          type: "expression",
          name: "addition",
          visible: false,
          expression: "({numberinput1} + {numberinput2})"
        },
        {
          type: "html",
          name: "question8",
          visibleIf: "{business-name} notempty and {business-description} notempty and {legal-entity} notempty and {growth-stage} notempty",
          html: `<div style="background-color: #9ecfde; border-radius: 15px; text-align:left; padding: 1rem">
<h4>Business Summary</h4>
<p style="font-weight:bold">Business Name</p>
<p>{business-name}</p>
<p style="font-weight:bold">Business Description</p>
<p>{business-description}</p>
<p style="font-weight:bold">Legal Entity</p>
<p>{legal-entity}</p>
<p style="font-weight:bold">Growth Stage</p>
<p>{growth-stage}</p>
<p style="font-weight:bold">Total Years in Business</p>
<p>{addition}</p>
</div>`
        }
      ]
    },
    {
      name: "page3",
      elements: [
        {
          type: "matrixdynamic",
          name: "question6",
          title: "Employees",
          columns: [
            { name: "Name", cellType: "text" },
            {
              name: "Education",
              cellType: "dropdown",
              choices: [
                { value: 1, text: "high school" },
                { value: 2, text: "some college" },
                { value: 3, text: "bachelors" },
                { value: 4, text: "masters" },
                { value: 5, text: "phd" }
              ],
              storeOthersAsComment: true
            },
            { name: "Column 3", title: "Manual Input", cellType: "text" }
          ]
        }
      ]
    }
  ]
};



  export default function SurveyCreatorWidget(props: { json?: Object; options?: ICreatorOptions }) {
    const [creator] = useState(() => {
      const cr = new SurveyCreator(props.options || defaultCreatorOptions);
      cr.applyTheme(CustomTheme);
      return cr;
    });
  
    /*
    useEffect(() => {
      creator.text =
        JSON.stringify(props.json) || window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
    }, [props.json, creator]);
  */

    useEffect(() => {
      let surveyJson: any;
    
      try {
        if (props.json) {
          surveyJson = props.json;
        } else if (window.localStorage.getItem("survey-json")) {
          surveyJson = JSON.parse(window.localStorage.getItem("survey-json") || "{}");
        } else {
          surveyJson = defaultJson;
        }
    
        // Ensure locale exists
        surveyJson.locale = surveyJson.locale || "en";
    
        creator.text = JSON.stringify(surveyJson);
      } catch (e) {
        console.error("Error loading survey JSON:", e);
        creator.text = JSON.stringify({ ...defaultJson, locale: "en" });
      }
    }, [props.json, creator]);

    /*
    creator.saveSurveyFunc = (saveNo: number, callback: (saveNo: number, success: boolean) => void) => {
      window.localStorage.setItem("survey-json", creator.text);
      callback(saveNo, true);
    };
  */

    creator.saveSurveyFunc = (
      saveNo: number,
      callback: (saveNo: number, success: boolean) => void
    ) => {
      try {
        const json = JSON.parse(creator.text);
        json.locale = json.locale || "en"; // make sure locale persists
        window.localStorage.setItem("survey-json", JSON.stringify(json));
        callback(saveNo, true);
      } catch (e) {
        console.error("Failed to save survey JSON:", e);
        callback(saveNo, false);
      }
    };
    creator.survey.locale = "es";
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <SurveyCreatorComponent creator={creator} />
      </div>
    );
  }
  


//what will show the Survey Creator UI, takes in JSON data and the Creator UI Options
/*
export default function SurveyCreatorWidget(props: { json?: Object, options?: ICreatorOptions }) {
    //set creator state
    let [creator, setCreator] = useState<SurveyCreator>();
    //if no creator, make one from SurveyCreator and set it to creator
    if (!creator) {
      creator = new SurveyCreator(props.options || defaultCreatorOptions);
      creator.applyTheme(CustomTheme);

      // Add toolbox category
    creator.toolbox.defineCategories([{
    category: "Custom Items",
    items: ["contactinformation"]
    }], true);

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
      
      
    return (
        <div style={{ height: "100vh", width: "100%" }}>
          <SurveyCreatorComponent creator={creator} />
        </div>
      );
  }

  */