import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    onClose: () => void
}

const Alert = ({children = <div>default</div>, onClose}: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible fade show" role="alert">
    {children}
    <button type="button" className="btn-close" onClick={onClose}>
  </button>
    </div>
  )
}

export default Alert