'use client'

import { createContext, useContext, useState } from 'react'
import Image from 'next/image'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>('dark')

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeToggle() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('ThemeToggle must be rendered inside ThemeProvider')
  }

  if(context.theme == 'light') {
    return (
        <button 
            type="button" 
            className="border rounded p-2"
            onClick={context.toggleTheme}>
             <Image
                src="sun.svg"
                alt='A Sun'
                width={32}
                height={32}
             />
        </button>
       
    )
  } else {
    return(
    <button
        type="button"
        className="border rounded p-2"
        onClick={context.toggleTheme} 
        aria-pressed={context.theme === 'dark'}>
         <Image
            src="moon.svg"
            alt='A Moon'
            width={32}
            height={32}
        />
    </button>
   )
  }
//   return (
//     <button type="button" onClick={context.toggleTheme} aria-pressed={context.theme === 'dark'}>
//         Switch to {context.theme === 'dark' ? 'light' : 'dark'} mode
//     </button>

//   )
}
