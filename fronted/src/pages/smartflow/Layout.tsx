import { Grid, GridItem, Heading, List, ListItem } from "@chakra-ui/react";
import { Outlet, NavLink } from "react-router-dom";

export default function Layout({ title }: { title: string }) {
  return (
    <Grid>
      {/* top header */}
      <GridItem
        as="header"
        colSpan={{ base: 12, lg: 12, xl: 12 }}
        p={{ base: "10px", lg: "10px" }}
      >
        <Heading>Smartflow - {title} top bar </Heading>
      </GridItem>

      {/* sidebar */}
      <GridItem
        as="aside"
        colSpan={{ base: 12, lg: 1, xl: 2 }}
        bg=""
        p={{ base: "10px", lg: "10px" }}
      >
        <nav>
          <List>
            <ListItem>
              <NavLink to="new">new Flow</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="flows">explore flows</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="nodes">explore nodes</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="node">node</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="action">action</NavLink>
            </ListItem>
          </List>
        </nav>
      </GridItem>

      {/* main content & navbar */}
      <GridItem
        as="main"
        colSpan={{ base: 12, lg: 11, xl: 10 }}
        p="10px"
        minHeight={{ lg: "100vh" }}
        bg="facebook.400"
      >
        <h1 style={{ fontSize: "20px" }}>{title} - main content </h1>
        <Outlet />
      </GridItem>
    </Grid>
  );
}
