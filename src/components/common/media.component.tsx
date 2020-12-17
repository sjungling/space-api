import React, { FunctionComponent } from "react";

export type ImageProps = {
  width: number;
  height: number;
  lazy?: boolean;
  src: string;
  crop?: "scale" | "fit" | "lpad" | "thumb" | "crop" | "lfill";
  alt: string;
};

function optionsToString(options: { [key: string]: string | number }): string {
  return Object.entries(options)
    .map(([key, value]) => [key, value].join("_"))
    .join(",");
}
export const Image: FunctionComponent<ImageProps> = (image) => {
  const CLOUDINARY_PREFIX = `//res.cloudinary.com/spaceapi/image/`;
  const { src, width, height, lazy, alt } = image;
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
      alt={alt}
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
