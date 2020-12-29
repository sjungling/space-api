import React, { FunctionComponent, useState } from "react";
import {
  TMission,
  FindMissionByIdDocument,
  TImageGalleryFragment,
  TMissionDetailsFragment,
  TAstronautDetailsFragment,
} from "../../generated/graphql";
import { AstronautCard } from "../astronauts/astronauts.component";
import {
  convertSecondsToFormattedTime,
  formatISODate,
  formatDate,
  longDateFormat,
  longTimeFormat,
} from "../../utilities";
import { Link } from "react-router-dom";
import { CREATE_MISSION_DETAIL_LINK } from "../../constants/routes";
import { Image } from "../common/media.component";
import { useApolloClient } from "@apollo/client";

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
        and landing on the{" "}
        <span role="img" aria-label="moon">
          🌖
        </span>{" "}
        with <strong>{lunarModule}</strong>
      </span>
    )}
  </div>
);
export const MissionDetails: FunctionComponent<
  TMissionDetailsFragment & { astronauts: Array<TAstronautDetailsFragment> }
> = ({
  id,
  mission,
  astronauts,
  launchDate,
  commandModule,
  launchVehicle,
  lunarModule,
  notes,
  duration,
}) => {
  const missionDuration = duration
    ? convertSecondsToFormattedTime(duration)
    : null;
  const [noteVisibility, setNoteVisibility] = useState(false);
  const toggleNotes = () => {
    setNoteVisibility(!noteVisibility);
  };

  return (
    <>
      <h2 className="text-center">
        <Link to={CREATE_MISSION_DETAIL_LINK(id)}>{mission}</Link>
      </h2>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4">
        <div>
          <h3>Vehicles</h3>
          <MissionVehicles
            launchVehicle={launchVehicle}
            commandModule={commandModule}
            lunarModule={lunarModule}
          />
        </div>
        <aside>
          <h3>Chronology</h3>
          <p>
            {duration ? (
              <span>Launched on: </span>
            ) : (
              <span>Planned to launch on: </span>
            )}
            <time dateTime={formatISODate(launchDate)}>
              {formatDate(launchDate, longDateFormat)}
            </time>{" "}
            at{" "}
            <time dateTime={formatISODate(launchDate)}>
              {formatDate(launchDate, longTimeFormat)}
            </time>
            {missionDuration && (
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
        </aside>
        <div>
          <h3>Mission Crew</h3>
          <div className="grid md:grid-cols-1 grid-cols-3">
            {Array.isArray(astronauts) &&
              astronauts.map((astronaut) => (
                <AstronautCard key={astronaut.id} {...astronaut} />
              ))}
          </div>
        </div>
        <div>
          {/* Notes */}
          <h3>Notes</h3>
          <button onClick={toggleNotes}>
            {noteVisibility ? "Hide" : "See"} notes
          </button>
          <p className={noteVisibility ? "" : "invisible"}>{notes}</p>
        </div>
      </div>
    </>
  );
};

export const Gallery: FunctionComponent<{
  images?: TImageGalleryFragment[];
  usePlaceholder?: boolean;
}> = ({ images, usePlaceholder }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const placeholderImages = [...Array(12)].map((_, idx) => (
    <div
      key={idx}
      className="bg-gray-400 animate-pulse"
      style={{ width: 200, height: 200 }}
    />
  ));

  const gallery = images?.map(({ id, href, title }) => (
    <>
      <Image
        key={id}
        src={href}
        width={200}
        height={200}
        lazy={true}
        crop={"lfill"}
        alt={title}
      />
    </>
  ));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-1">
      {usePlaceholder && !images ? placeholderImages : gallery}
    </div>
  );
};

export const MissionCard: FunctionComponent<
  Pick<TMission, "mission" | "id">
> = ({ id, mission }) => {
  const client = useApolloClient();

  const preloadQuery: React.MouseEventHandler = (): void => {
    void client.query({
      query: FindMissionByIdDocument,
      variables: {
        mission_id: Number(id),
      },
    });
  };
  return (
    <div className="mission-card">
      <h2>
        <Link to={CREATE_MISSION_DETAIL_LINK(id)} onMouseOver={preloadQuery}>
          {mission}
        </Link>
      </h2>
    </div>
  );
};
