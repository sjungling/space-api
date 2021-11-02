import React, { FunctionComponent } from "react";

const Emojis = {
  astronaut: "🧑‍🚀",
  moon: "🌖",
  rocket: "🚀",
};
export const Emoji: FunctionComponent<{
  name: keyof typeof Emojis;
  className?: string;
}> = ({ name, className = undefined, ...rest }) => (
  <span role="img" aria-label={name} className={className} {...rest}>
    {Emojis[name]}
  </span>
);
