'use client'
import Link from 'next/link'
import '../../assets/nav.css'
import { useState } from 'react'

// sysmbols ->https://fonts.google.com/icons?hl=es-419

const NavBar = ({routes}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
		<nav className={`sidebar ${isOpen ? 'open' : ''}`}>
			<div className="sidebar-inner">
				<header className="sidebar-header">
					<button
						type="button"
						className="sidebar-burger"
						onClick={() => setIsOpen(!isOpen)}>
						<span className="material-symbols-outlined">
							{isOpen ? 'close' : 'menu'}
						</span>
					</button>
				</header>
				<nav className="sidebar-menu">
					{routes.map((el, i) => (
						<button key={'navbar' + i}
								onClick={() => { setIsOpen(!isOpen) }}>
							<Link href={el.path}
								className="sidebar-button">
								<div className='inner-btn'>	
									<span className="material-symbols-outlined">{el.symbol}</span>
									<p>{el.name}</p>
								</div>
							</Link>
						</button>
					))}
				</nav>
			</div>
		</nav>
  )
}
export default NavBar
