"use client";

import { usePathname } from "next/navigation";
import { Children, cloneElement } from "react";

const specialPaths = ["/", "/gallery/scene", "/gallery/props"];

function isActive(href: string, pathname: string) {
  if (specialPaths.includes(href)) {
    return pathname === href;
  }

  return pathname.split("/")[1] === href.split("/")[1];
}

export default function ActiveWrapper({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const renderChildren = () => {
    return Children.map(children, (child: unknown) => {
      return cloneElement(child as React.ReactElement, {
        className: isActive(href, pathname) ? "active-link" : "",
      });
    });
  };

  return <>{renderChildren()}</>;
}
