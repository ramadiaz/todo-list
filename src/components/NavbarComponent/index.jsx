"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Checks } from "@phosphor-icons/react";

export default function NavbarComponent() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Checks size={32} color="#27272a" weight="bold" />
        <h1 className="ml-2 font-bold text-xl">To-Do</h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link className="text-neutral-800" href="#">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-neutral-800" aria-current="page">
            To-Do
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-neutral-800" href="#">
            Note
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-neutral-800" href="#">
            Blogs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
