import Header from "./Header";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}