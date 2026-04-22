import logo from '../assets/logo.svg'
import { Link } from "react-router";

interface PanelProps {
  children: React.ReactNode,
  className?: string
  showLogo?: boolean,
}

const Panel = ({ children, className, showLogo = false }: PanelProps) => {
  return (
    <div className={`panel ${className}`}>
      {showLogo && <Link to="/"><img src={logo} alt="OLX Clone" className="panel-logo" /></Link>}

      {children}
    </div>
  )
}

export default Panel;