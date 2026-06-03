import { BottomNav } from "./BottomNav";
import { Fab } from "./Fab";
import { SideNav } from "./SideNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-primary">
      <SideNav />
      <main className="md:pl-60">
        <div className="mx-auto pb-28 md:pb-12 min-h-screen max-w-md md:max-w-[1280px] md:px-8 md:pt-2">
          {children}
        </div>
      </main>
      <div className="md:hidden">
        <Fab />
        <BottomNav />
      </div>
    </div>
  );
}
