"use client";

import { useEffect, useState } from "react";
import { useFont } from "../FontProvider";
import { DropdownMenu } from "radix-ui";

export default function FontSelector() {
  const { font, setFont } = useFont();
  const [formattedFont, setFormattedFont] = useState(font);

  useEffect(() => {
    let formatted = font.charAt(0).toUpperCase() + font.slice(1);
    if (formatted == "Sans") {
      formatted = "Sans Serif";
    }
    setFormattedFont(formatted);
  }, [font]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex gap-4 items-center justify-center p-2 font-bold cursor-pointer">
          <span>{formattedFont}</span>
          <span className="text-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              viewBox="0 0 14 8"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                d="m1 1 6 6 6-6"
              />
            </svg>
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="p-4 bg-white dark:bg-gray-900 rounded-2xl min-w-40 shadow-[0_0px_20px_rgba(0,0,0,0.15)]  dark:shadow-purple-500 font-bold"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.RadioGroup
            value={font}
            onValueChange={setFont}
            className="flex flex-col gap-2"
          >
            <DropdownMenu.RadioItem
              value="sans"
              className="font-sans cursor-pointer hover:text-purple-500"
            >
              Sans Serif
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              value="serif"
              className="font-serif cursor-pointer hover:text-purple-500"
            >
              Serif
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              value="mono"
              className="font-mono cursor-pointer hover:text-purple-500"
            >
              Mono
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
