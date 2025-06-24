"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X, Home } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [role, setRole] = useState("planner");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 1, name: "Home", href: "/", visible: "all" },
    { id: 2, name: "Browse Artists", href: "/artists", visible: "planner" },
    { id: 3, name: "Dashboard", href: "/manager/dashboard", visible: "manager" },
    { id: 4, name: "Bookings", href: "/booking", visible: "planner" },
    {id: 5 , name: "Onboarding" , href: '/manager/onboarding' , visible: "manager"}
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="sticky p-3 top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-black/80 dark:backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 shadow-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Home className="w-5 h-5" />
          <span>Artistly</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-5 text-sm font-medium">
            {navItems
              .filter((item) => item.visible === "all" || item.visible === role)
              .map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>

          <Separator orientation="vertical" className="h-6" />

          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planner">Planner</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectContent>
          </Select>

          <div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pb-4"
        >
          <ul className="flex flex-col gap-3">
            {navItems
              .filter((item) => item.visible === "all" || item.visible === role)
              .map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block py-1 text-sm hover:text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>

          <div className="mt-3">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planner">Planner</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
