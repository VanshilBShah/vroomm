import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar({
  title,
  back = "/home",
  right,
}: {
  title?: string;
  back?: string | false;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-background/80 px-5 pb-3 pt-5 backdrop-blur-md">
      {back ? (
        <Link
          to={back}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
      ) : (
        <div className="h-10 w-10" />
      )}
      {title && (
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      )}
      <div className="flex items-center gap-2">
        {right}
        <ThemeToggle />
      </div>
    </header>
  );
}
