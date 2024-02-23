import { useState, useEffect } from 'react';
import './App.css';
import ScrollButtons from './ScrollButtons';
import IndexButtons from './IndexButtons';
const sources = [
  '../images/fushiguro.webp',
  '../images/inumaki.webp',
  '../images/itadori.webp',
  '../images/kugisaki.webp',
  '../images/panda.webp',
  '../images/zen-in.webp',
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  let timer: any = null;
  const resetTime = () => {
    clearTimeout(timer);
    timer = setTimeout(handleRightButtonClick, 3000);
  };

  useEffect(() => {
    resetTime();

    return () => clearTimeout(timer);
  } );

  function handleLeftButtonClick() {
    if (currentIndex === 0) {
      setCurrentIndex(sources.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    resetTime();
  }

  function handleRightButtonClick() {
    if (currentIndex === sources.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    resetTime();
  }

  function handleIndexButtonClick(e: any) {
    resetTime();

    setCurrentIndex(Number(e.target.closest('button').dataset.id));
  }
  return (
    <div className="row">
      <div className="content-view-row">
        {' '}
        <ScrollButtons
          onLeftButtonClick={handleLeftButtonClick}
          onRightButtonClick={handleRightButtonClick}
          src={sources[currentIndex]}
        />
      </div>
      <div className="index-button-row">
        <IndexButtons
          currentIndex={currentIndex}
          indices={sources.length}
          onCustomClick={handleIndexButtonClick}
        />
      </div>
    </div>
  );
}

export default App;
