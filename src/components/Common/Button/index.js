import "./style.css";

const Button = ({ text, onClick }) => {
  return <div className="custom-btn"
  onClick={onClick}>{text}</div>;
};
export default Button;
