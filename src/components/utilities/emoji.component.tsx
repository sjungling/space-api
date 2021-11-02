import React, { FunctionComponent } from "react";

const Emojis = {
  astronaut: "🧑‍🚀",
  moon: "🌖",
  rocket: "🚀",
};
export const Emoji: FunctionComponent<{ name: keyof typeof Emojis }> = ({
  name,
  ...rest
}) => (
  <span role="img" aria-label={name} {...rest}>
    {Emojis[name]}
  </span>
);
