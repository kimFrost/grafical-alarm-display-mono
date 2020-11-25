
import React, { useEffect} from 'react';

interface IProps {
    onClick?: () => void
    disabled?: boolean
    outline?: boolean
    active?: boolean
    type?: string
}

const Button: React.FC<IProps> = ({ onClick, children, disabled, active, outline, type }) => {
    const buttonProps: any = {}
    if (type) {
        buttonProps['type'] = type;
    }

    useEffect(() => {
        console.log('')
    }, [])

    return (
        <button
            {...buttonProps}
            className="button"
            onClick={onClick} disabled={disabled}>
            {children} cxzc
        </button>
    )
}

Button.defaultProps = {
    onClick: () => void (0),
    disabled: false,
    outline: false,
    active: false
}

export default Button