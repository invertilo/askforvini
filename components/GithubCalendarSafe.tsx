"use client";

import { GithubCalendar } from "@/components/ui/github-calendar";

type GithubCalendarSafeProps = {
  username: string;
  colorSchema?: "green" | "blue" | "purple" | "orange" | "gray";
  shape?: "square" | "rounded" | "circle" | "squircle";
  showTotal?: boolean;
  className?: string;
};

export function GithubCalendarSafe({
  username,
  colorSchema = "blue",
  shape = "rounded",
  showTotal = true,
  className,
}: GithubCalendarSafeProps) {
  return (
    <GithubCalendar
      username={username}
      colorSchema={colorSchema}
      shape={shape}
      showTotal={showTotal}
      className={className}
    />
  );
}
