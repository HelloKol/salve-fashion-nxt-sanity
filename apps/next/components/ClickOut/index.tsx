import React from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
  handleClick: (e: React.MouseEvent<HTMLElement>) => void
  className?: string
}

const ClickOut = ({ children, handleClick, className }: Props): JSX.Element => {
  const wrapper = React.useRef<HTMLDivElement>(null)

  const handleClickOut = React.useCallback(
    (e?: React.MouseEvent<HTMLElement>): undefined => {
      if (!e?.target || wrapper.current === null) return undefined
      if (!wrapper.current.contains(e.target as Node)) handleClick(e)
      return undefined
    },
    [handleClick]
  )

  React.useEffect(() => {
    document.addEventListener('click', (e: any) => handleClickOut(e), true)
    return () => document.removeEventListener('click', () => handleClickOut())
  }, [handleClickOut])

  return (
    <div ref={wrapper} className={`${className || 'wrap'}`}>
      {children}
    </div>
  )
}

export default ClickOut
