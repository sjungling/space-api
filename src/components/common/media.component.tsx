import React, { FunctionComponent } from "react";

export type ImageProps = {
  width: number;
  height: number;
  lazy?: boolean;
  src: string;
  crop?: "scale" | "fit" | "lpad" | "thumb" | "crop" | "lfill";
};

function optionsToString(options: { [key: string]: string | number }): string {
  return Object.keys(options)
    .map((key) => {
      return [key, options[key]].join("_");
    })
    .join(",");
}
export const Image: FunctionComponent<ImageProps> = (image) => {
  const CLOUDINARY_PREFIX = `http://res.cloudinary.com/spaceapi/image/`;
  const { src, width, height, lazy } = image;
  const options = {
    w: width,
    h: height,
  };
  if (image.crop) {
    options["c"] = image.crop;
  }
  const imageHref = `${CLOUDINARY_PREFIX}fetch/f_auto/${optionsToString(
    options
  )}/${src}`;

  return (
    <img
      loading={lazy ? "lazy" : undefined}
      src={imageHref}
      width={width}
      height={height}
    />
  );
};

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
