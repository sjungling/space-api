import { extendTheme } from "@mui/joy";

export const spaceDevTheme = extendTheme({
  cssVarPrefix: "space",
  components: {
    JoySheet: {
      defaultProps: {
        sx: {
          borderRadius: (theme) => theme.radius.xs,
        },
      },
    },
  },
});
