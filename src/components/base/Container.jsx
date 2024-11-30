import styles from './styles/Container.module.css'

function Container({children, direction, gap, className}) {
    return <div className={`${className} ${styles.Container} ${direction === 'row' ? styles.DirectionRow : styles.DirectionColumn }`}
    style={{gap: `${gap}px`}}>
        {children}
    </div>
}

export default Container