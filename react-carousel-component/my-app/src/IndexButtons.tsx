import { FaCircle } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa';
import './App.css';
type Types = {
  indices: number;
  onCustomClick: (e: any) => void;
  currentIndex: number;
};
export default function IndexButtons({
  indices,
  onCustomClick,
  currentIndex,
}: Types) {
  const buttons = [];
  for (let i = 0; i < indices; i++) {
    if (currentIndex === i) {
      buttons.push(
        <button
          className="index-button"
          onClick={onCustomClick}
          key={i}
          data-id={i}>
          <FaCircle />
        </button>
      );
    } else {
      buttons.push(
        <button
          className="index-button"
          onClick={onCustomClick}
          key={i}
          data-id={i}>
          <FaRegCircle />
        </button>
      );
    }
  }
  return <> {buttons}</>;
}
