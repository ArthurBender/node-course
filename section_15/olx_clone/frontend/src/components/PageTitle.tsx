import { useNavigate } from "react-router";

import { IoMdArrowBack } from "react-icons/io";

interface PageTitleProps {
  children: React.ReactNode
  className?: string,
  backButton?: boolean,
  customButton?: React.ReactNode
}

const PageTitle = ({ children, className, backButton = true, customButton }: PageTitleProps) => {
  const navigate = useNavigate();

  return (
    <div className="page-title-container">
      <h1 className={`page-title ${className}`}>{children}</h1>

      {(backButton && !customButton) && <button onClick={() => navigate(-1)} className="button circular secondary text-xl!"><IoMdArrowBack /></button>}

      {customButton}
    </div>
  )
}

export default PageTitle;