import "./Header.css";

//구조분해 할당을 이용하여 설정함
const Header = ({ title, leftChild, rightChild }) => {
  return (
    <header className="header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightChild}</div>
    </header>
  );
};

export default Header;
