"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Checks } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavbarComponent() {
  const session = useSession();
  console.log({ session });
  const pathName = usePathname();

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Checks size={32} color="#27272a" weight="bold" />
        <h1 className="ml-2 font-bold text-xl">To-Do</h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathName.endsWith("/")}>
          <Link className="text-neutral-800 hover:opacity-70 transition-all duration-400" href="/">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName.endsWith("/todos")}>
          <Link href="/todos" className="text-neutral-800 hover:opacity-70 transition-all duration-400" aria-current="page">
            To-Do
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName.endsWith("/notes")}>
          <Link className="text-neutral-800 hover:opacity-70 transition-all duration-400" href="/notes">
            Notes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName.endsWith("/blogs")}>
          <Link className="text-neutral-800 hover:opacity-70 transition-all duration-400" href="/blogs">
            Blogs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem hidden={session.status == "authenticated"}>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Log In
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
