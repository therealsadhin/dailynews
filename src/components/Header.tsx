import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 lg:px-96">
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg mt-4">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-gray-800 mr-8">NewsDaily</Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/trending" className="text-gray-600 hover:text-gray-900">Trending</Link>
                <Link to="/latest" className="text-gray-600 hover:text-gray-900">Latest</Link>
                <Link to="/subscribe" className="text-gray-600 hover:text-gray-900">Subscribe</Link>
              </nav>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to="/">Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/trending">Trending</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/latest">Latest</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/subscribe">Subscribe</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}