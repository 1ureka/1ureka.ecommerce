"use client";

import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Paper,
  Stack,
  TableBody,
  TableRow,
  Divider,
  ButtonBase,
  Typography,
  TableCell,
  TablePagination,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import type { TablePaginationProps } from "@mui/material";

// layout
export const BoxM = motion(Box);
export const PaperM = motion(Paper);
export const StackM = motion(Stack);
export const GridM = motion(Grid);

// misc
export const ButtonBaseM = motion(ButtonBase);
export const DividerM = motion(Divider);
export const TypographyM = motion(Typography);

// table
export const TableRowM = motion(TableRow);
export const TableBodyM = motion(TableBody);
export const TableCellM = motion(TableCell);
export const TablePaginationM = motion(TablePagination) as (
  props: TablePaginationProps & { layout: boolean }
) => React.ReactNode;

// dialog
export const DialogContentM = motion(DialogContent);
export const DialogActionsM = motion(DialogActions);
export const DialogTitleM = motion(DialogTitle);
