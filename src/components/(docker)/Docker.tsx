import "server-only";

import { Box, Divider, Typography } from "@mui/material";
import { Dock, DockItem } from "./display/Wrapper";
import NavLink from "./input/NavLink";
import ThemeToggle from "./input/ThemeToggle";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

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

        <DockItem title="Theme">
          <ThemeToggle />
        </DockItem>
      </Dock>
    </Warpper>
  );
}

export function AdminDocker() {
  return (
    <Warpper>
      <Dock>
        <DockItem title="Overview">
          <NavLink href={"/admin"}>
            <AdminPanelSettingsRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem isStatic>
          <Divider flexItem />
        </DockItem>

        <DockItem isStatic>
          <Typography variant="caption">ADMIN</Typography>
        </DockItem>

        <DockItem title="Product">
          <NavLink href={"/admin/products"}>
            <Inventory2RoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
        <DockItem title="Order">
          <NavLink href={"/admin/orders"}>
            <LocalShippingRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
        <DockItem title="Sales">
          <NavLink href={"/admin/users"}>
            <SellRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem isStatic>
          <Box sx={{ height: 48 }} />
        </DockItem>

        <DockItem isStatic>
          <Divider flexItem />
        </DockItem>

        <DockItem title="Home">
          <NavLink href={"/"}>
            <HomeRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem title="Theme">
          <ThemeToggle />
        </DockItem>
      </Dock>
    </Warpper>
  );
}
