import { Sheet, Typography, Link, Grid, Button, List } from "@mui/joy";
import { FunctionComponent, useState } from "react";
import { CREATE_MISSION_DETAIL_LINK } from "../../constants/routes";
import {
  MissionDetailsFragment,
  AstronautDetailsFragment,
} from "../../generated/apollo-hooks";
import {
  convertSecondsToFormattedTime,
  formatISODate,
  formatDate,
  longDateFormat,
  longTimeFormat,
} from "../../utilities";
import { AstronautCardComponent } from "../astronauts/astronauts.component";
import { MissionVehiclesComponent } from "./vehicles.component";

export const MissionDetailsComponent: FunctionComponent<{
  missionDetails: MissionDetailsFragment & {
    astronauts: AstronautDetailsFragment[];
  };
}> = ({
  missionDetails: {
    astronauts,
    id,
    mission,
    launchDate,
    commandModule,
    launchVehicle,
    lunarModule,
    notes,
    duration,
  },
}) => {
  const missionDuration = duration
    ? convertSecondsToFormattedTime(duration)
    : null;
  const [noteVisibility, setNoteVisibility] = useState(false);
  const toggleNotes = () => {
    setNoteVisibility(!noteVisibility);
  };

  return (
    <Sheet>
      <Typography component="h2" alignContent="center">
        <Link href={CREATE_MISSION_DETAIL_LINK(id)}>{mission}</Link>
      </Typography>
      <Grid container>
        <Grid xs={12} md={6}>
          <Typography component="h3">Vehicles</Typography>
          <MissionVehiclesComponent
            launchVehicle={launchVehicle}
            commandModule={commandModule}
            lunarModule={lunarModule}
          />
          <Typography component="h3">Chronology</Typography>
          <Typography>
            {duration ? (
              <Typography>Launched on: </Typography>
            ) : (
              <Typography>Planned to launch on: </Typography>
            )}
            <Typography component="time" dateTime={formatISODate(launchDate)}>
              {formatDate(launchDate, longDateFormat)}
            </Typography>{" "}
            at{" "}
            <Typography component="time" dateTime={formatISODate(launchDate)}>
              {formatDate(launchDate, longTimeFormat)}
            </Typography>
            {missionDuration && (
              <Typography>
                Duration:{" "}
                {Object.keys(missionDuration).map((key) => {
                  return (
                    <Typography key={key}>
                      {missionDuration[key]} {key}{" "}
                    </Typography>
                  );
                })}
              </Typography>
            )}
          </Typography>
        </Grid>
        <Grid xs={12} md={6}>
          <Typography component="h3">Mission Crew</Typography>
          <List>
            {Array.isArray(astronauts) &&
              astronauts.map((astronaut) => (
                <AstronautCardComponent
                  key={astronaut.id}
                  astronaut={astronaut}
                />
              ))}
          </List>
          <Typography component="h3">Notes</Typography>
          <Button variant="soft" onClick={toggleNotes}>
            {noteVisibility ? "Hide" : "See"} notes
          </Button>
          <Typography visibility={noteVisibility ? "visible" : "hidden"}>
            {notes}
          </Typography>
        </Grid>
      </Grid>
    </Sheet>
  );
};
