import "server-only";

import { Box, Divider, Typography } from "@mui/material";
import { Dock, DockItem } from "./display/Wrapper";
import NavLink from "./input/NavLink";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

function Warpper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="nav"
      sx={{
        display: "grid",
        alignItems: "center",
        height: 1,
        maxHeight: "100dvh",
        zIndex: "appBar",
      }}
    >
      {children}
    </Box>
  );
}

export function UserDocker() {
  return (
    <Warpper>
      <Dock>
        <DockItem title="Home">
          <NavLink href={"/"}>
            <HomeRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem isStatic>
          <Divider flexItem />
        </DockItem>

        <DockItem isStatic>
          <Typography variant="caption">USER</Typography>
        </DockItem>

        <DockItem title="Product">
          <NavLink href={"/products"}>
            <ShoppingCartRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
        <DockItem title="Order">
          <NavLink href={"/orders"}>
            <ShoppingBasketRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem isStatic>
          <Box sx={{ height: 48 }} />
        </DockItem>

        <DockItem isStatic>
          <Divider flexItem />
        </DockItem>

        <DockItem title="Admin">
          <NavLink href={"/admin"}>
            <AdminPanelSettingsRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
      </Dock>
    </Warpper>
  );
}

export function AdminDocker() {
  return null;
}
