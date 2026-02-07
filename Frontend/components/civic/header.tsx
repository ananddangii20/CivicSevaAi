"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mic, HelpCircle, Globe, Menu, X, Shield, LogIn, User, LogOut, Settings } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";


interface HeaderProps {
  onLanguageChange?: (lang: "en" | "hi") => void;
  currentLanguage?: "en" | "hi";
}

export function Header({
  onLanguageChange,
  currentLanguage = "en",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
}, []);

  const content = {
    en: {
      appName: "CivicSeva AI",
      tagline: "Civic Assistant",
      help: "Help",
      voice: "Voice",
      login: "Login",
    },
    hi: {
      appName: "नागरिक सेवा AI AI",
      tagline: "नागरिक सहायक",
      help: "मदद",
      voice: "आवाज़",
      login: "लॉगिन",
    },
  };

  const t = content[currentLanguage];

  const handleLogout = () => {
  localStorage.removeItem("token"); // remove auth token
  setIsLoggedIn(false);              // update UI immediately
  router.push("/login");             // redirect
};


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo and App Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {t.appName}
            </span>
            <span className="text-xs text-muted-foreground">{t.tagline}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Globe className="h-4 w-4" />
                {currentLanguage === "en" ? "EN" : "हिं"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onLanguageChange?.("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange?.("hi")}>
                हिंदी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Voice Button */}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Mic className="h-4 w-4" />
            <span className="sr-only">{t.voice}</span>
          </Button>

          {/* Help Button */}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden lg:inline">{t.help}</span>
          </Button>

          {/* Auth Section */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

              <DropdownMenuItem
  onClick={handleLogout}
  className="text-red-600 cursor-pointer"
>
  <LogOut className="mr-2 h-4 w-4" />
  Logout
</DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="ml-2 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden lg:inline">{t.login}</span>
              </Button>
            </Link>
          )}


        </div>




        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Language
              </span>
              <div className="flex gap-2">
                <Button
                  variant={currentLanguage === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onLanguageChange?.("en")}
                >
                  EN
                </Button>
                <Button
                  variant={currentLanguage === "hi" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onLanguageChange?.("hi")}
                >
                  हिं
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Mic className="h-4 w-4" />
              {t.voice}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <HelpCircle className="h-4 w-4" />
              {t.help}
            </Button>
          </div>



          {isLoggedIn ? (
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <User className="h-4 w-4" />
              My Profile
            </Button>
          ) : (
            <Link href="/login">
              <Button className="w-full gap-2 bg-primary text-primary-foreground">
                <LogIn className="h-4 w-4" />
                {t.login}
              </Button>
            </Link>
          )}


          {isLoggedIn && (
  <Button
    variant="outline"
    className="w-full justify-start gap-2 text-red-600"
    onClick={handleLogout}
  >
    <LogOut className="h-4 w-4" />
    Logout
  </Button>
)}

        </div>


      )}



    </header>
  );
}
