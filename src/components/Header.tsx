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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 lg:px-96">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl md:text-2xl font-bold text-gray-800 mr-4 md:mr-8">NewsDaily</Link>
            
            {/* Desktop and Tablet Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link to="/" className="text-sm lg:text-base text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/trending" className="text-sm lg:text-base text-gray-600 hover:text-gray-900">Trending</Link>
              <Link to="/latest" className="text-sm lg:text-base text-gray-600 hover:text-gray-900">Latest</Link>
              <Link to="/about" className="text-sm lg:text-base text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-sm lg:text-base text-gray-600 hover:text-gray-900">Contact</Link>
              <Link to="/subscribe" className="text-sm lg:text-base text-gray-600 hover:text-gray-900">Subscribe</Link>
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-gray-100 border-2 border-gray-300 hover:bg-gray-200"
                  >
                    <img 
                      src="/burger-menu-svgrepo-com.svg" 
                      alt="Menu" 
                      className="h-6 w-6 invert brightness-0"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link to="/" className="w-full text-gray-900">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link to="/trending" className="w-full text-gray-900">Trending</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link to="/latest" className="w-full text-gray-900">Latest</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link to="/about" className="w-full text-gray-900">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link to="/contact" className="w-full text-gray-900">Contact</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link to="/subscribe" className="w-full text-gray-900">Subscribe</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}