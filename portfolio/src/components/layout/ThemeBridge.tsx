import { memo, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { applyThemeToDocument } from '../../features/uiSlice'

/** Keeps <html class="dark"> in sync with Redux. */
export const ThemeBridge = memo(function ThemeBridge() {
  const theme = useAppSelector((s) => s.ui.theme)

  useEffect(() => {
    applyThemeToDocument(theme)
  }, [theme])

  return null
})
