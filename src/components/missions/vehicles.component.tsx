import { Typography } from "@mui/joy";
import { FunctionComponent } from "react";
import { Mission } from "../../generated/apollo-hooks";
import { Emoji } from "../utilities/emoji.component";

export const MissionVehiclesComponent: FunctionComponent<
  Pick<Mission, "launchVehicle" | "commandModule" | "lunarModule">
> = ({ launchVehicle, commandModule, lunarModule }) => (
  <>
    <Typography>
      Flew <strong>{launchVehicle}</strong> into space
    </Typography>{" "}
    {commandModule && (
      <Typography>
        commanding <strong>{commandModule}</strong>
      </Typography>
    )}{" "}
    {lunarModule && (
      <Typography>
        and landing on the <Emoji name="moon" /> with{" "}
        <strong>{lunarModule}</strong>
      </Typography>
    )}
  </>
);
