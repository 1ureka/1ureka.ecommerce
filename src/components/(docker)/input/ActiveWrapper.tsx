"use client";

import { usePathname } from "next/navigation";
import { Children, cloneElement } from "react";

const specialPaths = ["/", "/admin", "/admin/*"];

function isActive(href: string, pathname: string) {
  if (href === "/" || href === "/admin") {
    return pathname === href;
  }

  if (href.startsWith("/admin")) {
    return pathname.split("/")[2] === href.split("/")[2];
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
