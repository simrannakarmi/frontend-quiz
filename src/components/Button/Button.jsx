// import './Button.css'

const Button = (props) => {
  const { type, onClick, disabled, text, className } = props;

  const combinedClassName = `${
    className ||
    "btn btn-primary text-white m-2 w-40 h-12 hover:bg-white hover:text-primary"
  }`;

  return (
    <button
      className={combinedClassName}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
