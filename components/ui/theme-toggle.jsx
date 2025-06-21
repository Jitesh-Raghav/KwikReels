"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function ThemeToggle({ className, ...props }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (theme === "dark" || resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-10 w-10 border border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-pink-500/10 backdrop-blur-sm",
          className
        )}
        disabled
        {...props}
      >
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "h-10 w-10 border border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-pink-500/10 hover:from-purple-600/20 hover:to-pink-500/20 text-purple-300 hover:text-purple-200 backdrop-blur-sm transition-all duration-200",
        className
      )}
      {...props}
    >
      {isDark ? (
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-4 w-4 rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export { ThemeToggle } 