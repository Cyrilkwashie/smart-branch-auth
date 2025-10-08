import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AppHeaderProps {
  children?: React.ReactNode;
}

const AppHeader = ({ children }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      {children}
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
