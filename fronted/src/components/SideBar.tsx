import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { RxAvatar, RxCalendar, RxActivityLog, RxGlobe } from "react-icons/rx";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1em" spacing={4}>
      <ListItem>
        <NavLink to="/smartflow/flow">
          <ListIcon as={CalendarIcon} color="white" />
          Flows
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="smartflow/node">
          <ListIcon as={RxActivityLog} color="white" />
          Nodes
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="smartflow/walk">
          <ListIcon as={RxGlobe} color="white" />
          Walk
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="smartflow/scheduler">
          <ListIcon as={RxCalendar} color="white" />
          Scheduler
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="profile">
          <ListIcon as={RxAvatar} color="white" />
          Profile
        </NavLink>
      </ListItem>
    </List>
  );
}
