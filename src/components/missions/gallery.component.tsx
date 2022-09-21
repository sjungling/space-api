import { Box, Grid, Sheet } from "@mui/joy";
import { FunctionComponent } from "react";
import {
  ImageGalleryFragment,
  useMissionImageGalleryQuery,
} from "../../generated/apollo-hooks";
import { ImageComponent } from "../common";
import { QueryResult } from "../utilities/query-results.component";
import { SheetHeader } from "../utilities/styled.components";

export const MissionGallery: FunctionComponent<{ id: number }> = ({ id }) => {
  const { data, loading, error } = useMissionImageGalleryQuery({
    variables: {
      missionId: Number(id),
    },
    returnPartialData: true,
  });

  return (
    <QueryResult
      data={data}
      loading={loading}
      error={error}
      loadingComponent={<GalleryComponent usePlaceholder={true} />}
    >
      <Sheet>
        <SheetHeader component="h3">Gallery</SheetHeader>
        {data?.mission.__typename === "Mission" && (
          <GalleryComponent images={data.mission.images} />
        )}
      </Sheet>
    </QueryResult>
  );
};

export const GalleryComponent: FunctionComponent<{
  images?: ImageGalleryFragment[];
  usePlaceholder?: boolean;
}> = ({ images, usePlaceholder }) => {
  const placeholderImages = [...Array(12)].map((_, idx) => (
    <Box
      key={idx}
      sx={{ width: 200, height: 200, backgroundColor: "gray.400" }}
    />
  ));

  const gallery = images?.map(({ id, href, title }) => (
    <Grid key={id}>
      <ImageComponent
        src={href}
        width={200}
        height={200}
        lazy={true}
        crop={"lfill"}
        alt={title}
      />
    </Grid>
  ));
  return (
    <Grid container gap={1}>
      {usePlaceholder && !images ? placeholderImages : gallery}
    </Grid>
  );
};
