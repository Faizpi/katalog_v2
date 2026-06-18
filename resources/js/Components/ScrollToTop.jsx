import { useEffect } from 'react'
import { router } from '@inertiajs/react'

function ScrollToTop() {
  useEffect(() => {
    const removeListener = router.on('success', () => {
      window.scrollTo(0, 0)
    })
    return () => {
      if (typeof removeListener === 'function') removeListener()
    }
  }, [])

  return null
}

export default ScrollToTop
