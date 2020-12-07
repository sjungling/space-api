import React, { FunctionComponent, useState } from "react";
import {
  useFindAllMissionsQuery,
  Mission as TMission,
  Scalars,
  Media as TMedia,
} from "../../generated/graphql";
import { Astronauts } from "../astronauts/astronauts.component";
import { LoadingComponent } from "../common/loading.component";
import { convertSecondsToFormattedTime } from "../../utilities";
import { Link } from "react-router-dom";
import { CREATE_MISSION_DETAIL_LINK } from "../../constants/routes";
type FormatDateOptions = {
  weekday?: "narrow" | "short" | "long";
  era?: "narrow" | "short" | "long";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";

  // Time zone to express it in
  timeZone?: string;
  // Force 12-hour or 24-hour
  hour12?: boolean;
};

const formatISODate = (date: Scalars["DateTime"]): string => {
  return new Date(date).toISOString();
};
const formatLaunchDate = (
  launchDate: Scalars["DateTime"],
  formatOptions?: FormatDateOptions
): string => {
  const stringifiedDate = new Date(launchDate);
  return new Intl.DateTimeFormat("en-US", formatOptions ?? undefined).format(
    stringifiedDate
  );
};

export const MissionVehicles: FunctionComponent<
  Pick<TMission, "launchVehicle" | "commandModule" | "lunarModule">
> = ({ launchVehicle, commandModule, lunarModule }) => (
  <div>
    <span>
      Flew <strong>{launchVehicle}</strong> into space
    </span>{" "}
    {commandModule && (
      <span>
        commanding <strong>{commandModule}</strong>
      </span>
    )}{" "}
    {lunarModule && (
      <span>
        and landing on the 🌖 with <strong>{lunarModule}</strong>
      </span>
    )}
  </div>
);
export const Mission: FunctionComponent<TMission> = ({
  id,
  mission,
  astronauts,
  launchDate,
  commandModule,
  launchVehicle,
  lunarModule,
  notes,
  duration,
  media,
}) => {
  const missionDuration = convertSecondsToFormattedTime(duration);
  const launchDateFormat: FormatDateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const launchDateTimeFormat: FormatDateOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "long",
  };
  const [noteVisibility, setNoteVisibility] = useState(false);
  const toggleNotes = () => {
    setNoteVisibility(!noteVisibility);
  };

  return (
    <div key={id} className="ring-2 p-1 dark:bg-opacity-25 dark:bg-indigo-600">
      <h2 className="text-center">
        <Link to={CREATE_MISSION_DETAIL_LINK(id)}>{mission}</Link>
      </h2>
      <p>
        {duration ? (
          <span>Launched on: </span>
        ) : (
          <span>Planned to launch on: </span>
        )}
        <time dateTime={formatISODate(launchDate)}>
          {formatLaunchDate(launchDate, launchDateFormat)} at{" "}
          {formatLaunchDate(launchDate, launchDateTimeFormat)}
        </time>
        {duration && (
          <p>
            Duration:{" "}
            {Object.keys(missionDuration).map((key) => {
              return (
                <span key={key}>
                  {missionDuration[key]} {key}{" "}
                </span>
              );
            })}
          </p>
        )}
      </p>
      <p>
        <MissionVehicles
          launchVehicle={launchVehicle}
          commandModule={commandModule}
          lunarModule={lunarModule}
        />
      </p>
      <Astronauts crew={astronauts} />
      {media && <Gallery media={media} />}
      <button onClick={toggleNotes}>
        {noteVisibility ? "Hide" : "See"} notes
      </button>
      <p className={noteVisibility ? null : "invisible"}>{notes}</p>
    </div>
  );
};

type ImageProps = {
  url: string;
  width: number;
  height: number;
};
export const Image: FunctionComponent<ImageProps> = ({
  url,
  width,
  height,
}) => <img src={url} width={width} height={height} loading={"lazy"} />;

type YouTubeProps = {
  url: string;
};
export const YouTubeVideo: FunctionComponent<YouTubeProps> = ({ url }) => (
  <iframe
    width="560"
    height="315"
    src={url}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);
export const Gallery: FunctionComponent<{ media: TMedia[] }> = ({ media }) => {
  const gallery = media.map(({ url, type }) => {
    if (type === "IMAGE") {
      return <Image url={url} width={200} height={200} />;
    } else {
      return <YouTubeVideo url={url} />;
    }
  });
  return <div>{gallery}</div>;
};

export const Missions: FunctionComponent = () => {
  const { data, loading, error } = useFindAllMissionsQuery();
  if (error) {
    console.error(error);
    return <h1>Error fetching</h1>;
  }
  if (loading) return <LoadingComponent />;
  const missionList = data.missions?.map((mission) => {
    return <Mission key={mission.id} {...mission} />;
  });
  return (
    <div className="grid grid-cols-1  gap-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {missionList}
    </div>
  );
};
