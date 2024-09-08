import { IconButton, type IconButtonProps } from "@mui/material";
import ActiveWrapper from "./ActiveWrapper";
import { Link } from "next-view-transitions";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const baseOulineSx: IconButtonProps["sx"] = {
    outlineStyle: "solid",
    outlineWidth: 0,
    outlineOffset: 20,
    outlineColor: "#e783ad60",
  };
  const activeSx: IconButtonProps["sx"] = {
    bgcolor: "primary.light",
    "&:hover": { bgcolor: "primary.light" },
    outlineWidth: 5,
    outlineOffset: 1,
    color: "background.paper",
  };
  const sx: IconButtonProps["sx"] = {
    transition: "all 0.5s ease",
    ...baseOulineSx,
    "&.active-link": activeSx,
  };

  return (
    <ActiveWrapper href={href.toString()}>
      <IconButton component={Link} href={href} sx={sx}>
        {children}
      </IconButton>
    </ActiveWrapper>
  );
}
