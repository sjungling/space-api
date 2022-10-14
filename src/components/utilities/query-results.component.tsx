import { ApolloQueryResult } from "@apollo/client";
import { Alert, Box, CircularProgress } from "@mui/joy";
import React, { FunctionComponent } from "react";
import { Emoji } from "./emoji.component";

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */
export const QueryResult: FunctionComponent<
  React.PropsWithChildren<
    Pick<ApolloQueryResult<unknown>, "data" | "error" | "loading"> & {
      loadingComponent?: React.ReactNode;
    }
  >
> = ({ loading, error, data, loadingComponent, children }) => {
  if (error) {
    return (
      <Alert color="danger" variant="solid">
        Failure to Launch <Emoji name="moon" />
      </Alert>
    );
  }
  if (loading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <Box display="flex" justifyContent="center">
        <CircularProgress>
          <Emoji name="rocket" />
        </CircularProgress>
      </Box>
    );
  }
  if (!data) {
    return (
      <Alert color="warning" variant="soft">
        Nothing to show...
      </Alert>
    );
  }
  if (data) {
    return <React.Fragment>{children}</React.Fragment>;
  }
};
