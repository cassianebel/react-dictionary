"use client";

import { useEffect, useState } from "react";
import { Switch } from "radix-ui";

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const darkMode = storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <form>
      <div className="flex items-center p-2">
        <Switch.Root
          className="relative h-[25px] w-[50px] rounded-full bg-gray-700 outline-none data-[state=checked]:bg-purple-500 cursor-pointer"
          id="theme-switch"
          checked={isDark}
          onCheckedChange={setIsDark}
        >
          <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[26px]" />
        </Switch.Root>
        <label className="ps-4 cursor-pointer" htmlFor="theme-switch">
          <span className="sr-only">{isDark ? "Dark" : "Light"} Mode</span>
          <span className={`${isDark ? "text-purple-500" : "text-gray-700"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
              />
            </svg>
          </span>
        </label>
      </div>
    </form>
  );
}
