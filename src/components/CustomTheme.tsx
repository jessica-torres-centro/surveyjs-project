//import { IThemes } from "survey-creator-core";
import { FlatLightPanelless } from "survey-core/themes";

const CustomTheme = {
  ...FlatLightPanelless,
  cssVariables: {
    ...FlatLightPanelless.cssVariables, // keep all existing variables
    "--sjs-primary-backcolor": "rgba(68, 117, 36, 1)",       // new accent for buttons, border of text boxes, boolean, check boxes 
    "--sjs-primary-backcolor-light": "rgba(90, 156, 48, 1)", // color for dragging items
    "--sjs-primary-backcolor-dark": "rgba(68, 117, 36, 1)",
    "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)"      // text color on accent
  }
};

export default CustomTheme;