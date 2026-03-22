import AppSidebar from "@/components/layout/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      <AppSidebar />
      <main className="flex-1 ml-60 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
