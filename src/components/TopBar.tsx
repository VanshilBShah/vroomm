import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 pb-3 pt-6">
      {back ? (
        <Link
          to={back}
          className="glass flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
      ) : (
        <div className="h-10 w-10" />
      )}
      {title && (
        <h1 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {title}
        </h1>
      )}
      <div className="flex h-10 w-10 items-center justify-center">{right}</div>
    </header>
  );
}
