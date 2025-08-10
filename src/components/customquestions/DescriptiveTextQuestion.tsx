import React from 'react';
import { getLocaleStrings } from "survey-creator-core";
import { ElementFactory, QuestionNonValue, Serializer, settings } from "survey-core";
import { SurveyQuestionElementBase, ReactQuestionFactory, SurveyElementBase } from "survey-react-ui";
import './descriptivetextstyling.css';
const CUSTOM_QUESTION_TYPE = "descriptivetext";

// create a model that extends the QuestionNonValue class and inherits all its properties and methods
// DescriptiveTextModel -> QuestionNonValue -> Question -> ...
class DescriptiveTextModel extends QuestionNonValue {
    constructor(name: string) {
        super(name);
        // Create a `LocalizableString` object for the text property
        // Each localizablestring can hold multiple translations
        this.createLocalizableString("headerText", this);
        this.createLocalizableString("bodyText", this);
        
    }
    getType() {
        return CUSTOM_QUESTION_TYPE;
    }
    // returns actual text for current language as a string
    get headerText() {
        return this.getLocalizableStringText("headerText");
    }
    set headerText(val) {
        this.setLocalizableStringText("headerText", val);
    }
    // Returns caption text that corresponds to the current locale
    get bodyText() {
        return this.getLocalizableStringText("bodyText");
    }
    // Sets caption text for the current locale
    set bodyText(val) {
        this.setLocalizableStringText("bodyText", val);
    }
    // stores size value in JSON and are registered in Serializer.addClass(...)
    get headerTextSize() {
        return this.getPropertyValue("headerTextSize") || "medium";
      }
      set headerTextSize(val) {
        this.setPropertyValue("headerTextSize", val);
      }
    
      get bodyTextSize() {
        return this.getPropertyValue("bodyTextSize") || "medium";
      }
      set bodyTextSize(val) {
        this.setPropertyValue("bodyTextSize", val);
      }
      // returns full localizablestring object that holds translations
      get locHeaderText() {
        return this.getLocalizableString("headerText");
      }
      get locBodyText() {
        return this.getLocalizableString("bodyText");
      }
      get backgroundColor() {
        return this.getPropertyValue("backgroundColor");
      }
      set backgroundColor(val) {
        this.setPropertyValue("backgroundColor", val);
      }
      
}

// Register `DescriptiveTextModel` as a constructor for the "descriptivetext" question type
ElementFactory.Instance.registerElement(CUSTOM_QUESTION_TYPE, (name) => {
    return new DescriptiveTextModel(name);
});

// Configure JSON serialization and deserialization rules for the custom properties
// this is where you define options that display in the settings panel for the custom question
Serializer.addClass(
    CUSTOM_QUESTION_TYPE,
    [
        {
            name: "headerText:text",
            category: "general",
            visibleIndex: 2
        },
        {
            name: "bodyText:text",
            category: "general",
            visibleIndex: 3
        },
        {
            name: "headerTextSize",
            category: "general",
            visibleIndex: 4,
            default: "medium",
            choices: [
                { value: "small", text: "Small" },
                { value: "medium", text: "Medium" },
                { value: "large", text: "Large" }
            ]
        },
        {
            name: "bodyTextSize",
            category: "general",
            visibleIndex: 5,
            default: "medium",
            choices: [
                { value: "small", text: "Small" },
                { value: "medium", text: "Medium" },
                { value: "large", text: "Large" }
            ]
        }

    ],
    function () {
        return new DescriptiveTextModel("");
    },
    "question"
);

Serializer.addProperty(CUSTOM_QUESTION_TYPE, {
    name: "backgroundColor",
    category: "general",
    default: "transparent",  // or any default color you want
    type: "color"        // this makes it show a color picker in the Survey Creator UI
  });

// Change a placeholder for the text property editor
Serializer.findProperty(CUSTOM_QUESTION_TYPE, "headerText").placeholder = "Enter header text...";
Serializer.findProperty(CUSTOM_QUESTION_TYPE, "bodyText").placeholder = "Enter body text...";


// Change default values for inherited properties
Serializer.getProperty(CUSTOM_QUESTION_TYPE, "showNumber").defaultValue = false;
Serializer.getProperty(CUSTOM_QUESTION_TYPE, "titleLocation").defaultValue = "hidden";

// A class that renders a Descriptive Text question
class SurveyQuestionDescriptiveText extends SurveyQuestionElementBase {
    get question() {
        return this.questionBase;
    }
    renderElement() {
        const headerSize = this.question.headerTextSize || "medium";
        const bodySize = this.question.bodyTextSize || "medium";
        const backgroundColor = this.question.backgroundColor || "transparent";
        
        const header = SurveyElementBase.renderLocString(this.question.locHeaderText);
        const body = SurveyElementBase.renderLocString(this.question.locBodyText);
        console.log("headerSize:", headerSize, "bodySize:", bodySize, "backgroundColor:", backgroundColor);
        return (
            <div className="descriptiveTextContainer" tabIndex={0} style={{ overflow: "hidden", display: "block" , backgroundColor: backgroundColor, textAlign: 'left', padding: '2rem', borderRadius: '15px'}}>
                <h2 className={`descriptiveTextHeader ${headerSize}`}>{header}</h2>
                <p className={`descriptiveTextBody ${bodySize}`}>{body}</p>
            </div>
          );
    }
}

// Register `SurveyQuestionDescriptiveText` as a class that renders the Descriptive Text question type
ReactQuestionFactory.Instance.registerQuestion(
    CUSTOM_QUESTION_TYPE,
    (props) => {
        return React.createElement(SurveyQuestionDescriptiveText, props);
    }
);

// Specify captions to display on the design surface and in Property Grid
const locale = getLocaleStrings("en");
locale.qt[CUSTOM_QUESTION_TYPE] = "Descriptive Text";
locale.pe.caption = "Caption text";
locale.pe.textSize = "Text size";

// Use the Text icon for the Descriptive Text question type
(settings.customIcons as any)["icon-descriptivetext"] = "icon-text";
