import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  ClickAwayListener,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./Menu.module.scss";
import { useContext, useEffect } from "react";
import { AppContext } from "../layout/Layout";
import { signOut } from "next-auth/react";

const Menu = () => {
  const { handleClickAway } = useContext(AppContext);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={styles.wrapper}>
        <Paper
          sx={{
            width: "18.8rem",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={signOut}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </div>
    </ClickAwayListener>
  );
};

export default Menu;
