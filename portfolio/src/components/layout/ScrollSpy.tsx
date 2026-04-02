import { memo, useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { setActiveId } from '../../features/uiSlice'
import { NAV } from '../../data/content'

export const ScrollSpy = memo(function ScrollSpy() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const ids = NAV.map((n) => n.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (vis?.target?.id) dispatch(setActiveId(vis.target.id))
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [dispatch])

  return null
})
