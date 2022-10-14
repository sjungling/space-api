import { Box, styled, Typography, TypographyProps } from "@mui/joy";

export const FlexBox = styled(Box)`
  display: flex;
`;
export const SheetHeader = styled((props: TypographyProps) => (
  <Typography {...props} />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
