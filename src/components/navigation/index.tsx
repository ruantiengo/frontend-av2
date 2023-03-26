/* eslint-disable react/display-name */
import React, { ForwardedRef } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";

import Link from "next/link";

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/">
            Pessoas
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/estados">
            Estados
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/cidade">
            Cidades
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="/tipoSanguineo"
          >
            Tipo Sanguineos
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

interface ListItemProps extends React.HTMLProps<HTMLAnchorElement> {
  className?: string;
  children?: React.ReactNode;
  title: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef as ForwardedRef<HTMLAnchorElement>}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default NavigationMenuDemo;
