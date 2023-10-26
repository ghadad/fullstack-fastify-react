import { Grid, GridItem, Heading, List, ListItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout({ title }: { title: string }) {
  return (
    <Grid>
      {/* top header */}
      {/* main content & navbar */}
      <GridItem
        as="main"
        colSpan={{ base: 12, lg: 11, xl: 10 }}
        p="10px"
        minHeight={{ lg: "100vh" }}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
}
