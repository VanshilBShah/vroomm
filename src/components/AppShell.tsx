import { BottomNav } from "./BottomNav";

export function AppShell({ children, hideNav = false }: { children: React.ReactNode; hideNav?: boolean }) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-[480px] flex-col pb-28">
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}
