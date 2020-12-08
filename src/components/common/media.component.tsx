import React, { FunctionComponent, ImgHTMLAttributes } from "react";

export const Image: FunctionComponent<
  Pick<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height">
> = ({ src, width, height }) => (
  <img src={src} width={width} height={height} loading={"lazy"} />
);

export type YouTubeProps = {
  url: string;
};
export const YouTubeVideo: FunctionComponent<YouTubeProps> = ({ url }) => (
  <div className="iframe-container" style={{ paddingTop: "75%" }}>
    <iframe
      className=""
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);
