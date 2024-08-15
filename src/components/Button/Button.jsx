// import './Button.css'

const Button = (props) => {
    return (
        <button 
            className="btn btn-primary text-white m-2 w-40 h-12 hover:bg-white hover:text-primary"
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    )
}

export default Button