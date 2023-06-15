import "./style.css";

const Button = ({ text, onClick, disabled }) => {
  return (
    <div className="custom-btn" onClick={onClick} disabled={disabled}>
      {text}
    </div>
  );
};
export default Button;
