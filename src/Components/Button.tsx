import "../Components/Styles/button-style.css";

interface ButtonProps {
  onClick: () => void;
  buttonText: string;
}

export default function Button({ onClick, buttonText }: ButtonProps) {
  return (
    <div className='button-container'>
      <div className='button-wrapper'>
        <button onClick={onClick}>{buttonText}</button>
      </div>
    </div>
  );
}
