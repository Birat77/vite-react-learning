import styles from './Button.module.css';

const ButtonTypes = ['primary', 'secondary', 'success', 'danger','light','dark'] as const

interface Props {
    type: typeof ButtonTypes[number],
    children : string,
    onClick: () => void
}

const Button = ({type, children, onClick}: Props) => {
  return (
    <button type="button" className={[styles.btn, styles['btn-'+type]].join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button