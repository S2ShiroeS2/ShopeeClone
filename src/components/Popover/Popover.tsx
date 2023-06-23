import React, { useRef, useState, useId, type ElementType } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset, type Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
	children: React.ReactNode
	renderPopover: React.ReactNode
	className?: string
	as?: ElementType //Handle custom html tag
	initialOpen?: boolean
	placement?: Placement
}

const Popover = ({
	children,
	renderPopover,
	className,
	as: Element = 'div',
	initialOpen,
	placement = 'bottom-end'
}: Props) => {
	//Floating
	const [open, setOpen] = useState(initialOpen || false)
	const arrowRef = useRef<HTMLElement>(null)
	const { x, y, strategy, refs, middlewareData } = useFloating({
		middleware: [offset(6), shift(), arrow({ element: arrowRef })],
		placement: placement
	})

	//Gen popover id
	const id = useId()

	//Popover
	const showPopover = () => {
		setOpen(true)
	}

	const hidePopover = () => {
		setOpen(false)
	}

	return (
		<Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
			{/* Content (jsx or tsx) */}
			{children}

			<FloatingPortal id={id}>
				<AnimatePresence>
					{open && (
						<motion.div
							ref={refs.setFloating}
							className='z-[51]'
							style={{
								position: strategy,
								top: y ?? 0,
								left: x ?? 0,
								width: 'max-content',
								transformOrigin: `${middlewareData.arrow?.x}px top`
							}}
							initial={{ opacity: 0, transform: 'scale(0)' }}
							animate={{ opacity: 1, transform: 'scale(1)' }}
							exit={{ opacity: 0, transform: 'scale(0)' }}
							transition={{ duration: 0.2 }}
						>
							<span
								ref={arrowRef}
								className='border-stroke absolute left-12 top-[-6px] z-[1] hidden h-3 w-3 rotate-45 rounded-sm border-l border-t bg-white lg:block '
								style={{
									top: middlewareData.arrow?.y,
									left: middlewareData.arrow?.x
								}}
							></span>
							{renderPopover}
						</motion.div>
					)}
				</AnimatePresence>
			</FloatingPortal>
		</Element>
	)
}

export default Popover
