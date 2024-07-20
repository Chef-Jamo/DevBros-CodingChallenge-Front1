import "../Components/Styles/button-style.css";

interface ButtonProps {
  onClick: () => void;
}

export default function Button({ onClick }: ButtonProps) {
  return (
    <div className='button-container'>
      <div className='button-wrapper'>
        <button onClick={onClick}>Clear Search</button>
      </div>
    </div>
  );
}
