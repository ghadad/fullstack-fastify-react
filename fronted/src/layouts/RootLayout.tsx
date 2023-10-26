import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// components
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(18, 1fr)" bg="gray.50">
      {/* sidebar */}
      <GridItem
        as="aside"
        colSpan={{ base: 18, lg: 3, xl: 2 }}
        bg="gray.500"
        minHeight={{ lg: "100vh" }}
        p={{ base: "20px", lg: "30px" }}
      >
        <Sidebar />
      </GridItem>

      {/* main content & navbar */}
      <GridItem as="main" colSpan={{ base: 18, lg: 15, xl: 16 }} p="10px">
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
