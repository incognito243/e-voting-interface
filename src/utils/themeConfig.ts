import { ThemeConfig } from "antd";

export const themeAntd: ThemeConfig = {
  token: {
    fontFamily: '"OverusedGrotesk", sans-serif',
    fontWeightStrong: 500,
    colorBgBase: "#2E3440",
    colorTextBase: "#9ac2c2",
    colorBorder: "#579190",
    colorBorderSecondary: "#579190",
    colorPrimary: "#4A7197",
  },
  components: {
    Modal: {
      headerBg: "transparent",
    },
    Button: {
      primaryShadow: "transparent",
    },
    Menu: {
      colorPrimaryBg: "transparent",
    }
  }
}

export const themeStyledComponents = {
  foreground: "#A6B4CD",
  background: "#2E3440",
  primary: "#4A7197",
  secondary: "#373e4d",
  tertiary: "#2b3139",
  border: "#579190",
  accent: "#31CB9E",
  critical: "#FF6565",
  white: "#FFFFFF",
  text: "#9ac2c2",

};