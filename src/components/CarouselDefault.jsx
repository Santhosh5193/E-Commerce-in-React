import { useEffect, useState } from "react";
import Frame1 from "../assests/images/Frame1.png";
import Frame2 from "../assests/images/Frame2.png";
import Frame3 from "../assests/images/Frame3.png";
import Frame4 from "../assests/images/Frame4.png";
import Frame5 from "../assests/images/Frame5.png";

function CarouselDefault() {
  const images = [Frame1, Frame2, Frame3, Frame4, Frame5];
  const [currentIndex, setCurrentIndex] = useState(0);

  setTimeout(() => {
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, 3000);

  return (
    <div className="relative">
      <img src={images[currentIndex]} />
      <div className="flex gap-3 absolute bottom-5 pl-[40%]">
        <button
          onClick={() => setCurrentIndex(0)}
          className="carouselbutton"
        ></button>
        <button
          onClick={() => setCurrentIndex(1)}
          className="carouselbutton"
        ></button>
        <button
          onClick={() => setCurrentIndex(2)}
          className="carouselbutton"
        ></button>
        <button
          onClick={() => setCurrentIndex(3)}
          className="carouselbutton"
        ></button>
        <button
          onClick={() => setCurrentIndex(4)}
          className="carouselbutton"
        ></button>
      </div>
    </div>
  );
}

export default CarouselDefault;
