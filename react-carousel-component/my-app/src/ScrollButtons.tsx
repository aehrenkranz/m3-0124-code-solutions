import ImageView from './ImageView';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import './App.css'
type Types={
  onLeftButtonClick:()=>void
  onRightButtonClick:()=>void
  src:string
}
export default function ScrollButtons({
  onLeftButtonClick,
  onRightButtonClick,
  src,
}:Types) {
  return (
    <>
      <button onClick={onLeftButtonClick}><FaChevronLeft /></button>
      <ImageView src={src} />
      <button onClick={onRightButtonClick}><FaChevronRight /></button>
    </>
  );
}
