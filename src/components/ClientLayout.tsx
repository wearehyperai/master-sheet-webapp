"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboardingPage = pathname === "/onboarding";

  return (
    <div className="flex h-screen">
      {!isOnboardingPage && <Sidebar />}
      <main className={`overflow-auto ${isOnboardingPage ? "w-full" : "flex-1"}`}>
        {children}
      </main>
    </div>
  );
}

export default ClientLayout;