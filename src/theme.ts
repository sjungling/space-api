import { extendTheme } from "@mui/joy";

export const spaceDevTheme = extendTheme({
  cssVarPrefix: "space",
  components: {
    JoySheet: {
      defaultProps: {
        sx: {
          marginTop: 1,
          paddingY: 1,
          paddingX: 2,
          borderRadius: (theme) => theme.radius.xs,
        },
      },
    },
  },
});
