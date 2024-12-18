import { useState } from 'react'

type SidebarState = 'expanded' | 'collapsed'

interface UseSidebarOptions {
  defaultState?: SidebarState
}

export function useSidebar(options: UseSidebarOptions = {}) {
  const [state, setState] = useState<SidebarState>(options.defaultState || 'collapsed')
  const [isMobile, setIsMobile] = useState(false)

  const setOpen = (open: boolean) => {
    setState(open ? 'expanded' : 'collapsed')
  }

  const toggleSidebar = () => {
    setState(state === 'expanded' ? 'collapsed' : 'expanded')
  }

  return {
    state,
    setOpen,
    isMobile,
    toggleSidebar
  }
}
