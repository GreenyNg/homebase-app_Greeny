import { styled, Button } from "@material-ui/core"

export const SmallButton = styled(Button)({
  "justifyItems": "center",
  "fontSize": "16px",
  "boxShadow": "0px 0px 7px -2px rgba(0, 0, 0, 0.2)",
  "transition": ".15s ease-out",
  "textTransform": "capitalize",
  "borderRadius": 8,
  "backgroundColor": "#81feb7 !important",
  "color": "#1c1f23",

  "&$disabled": {
    boxShadow: "none"
  },

  "&:hover": {
    boxShadow: "0px 0px 7px -2px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#62eda5 !important",
    transition: ".15s ease-in"
  }
})
