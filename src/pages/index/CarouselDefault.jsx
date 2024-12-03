import { useEffect, useState } from "react";
import Frame1 from "../../assets/images/Frame1.webp";
import Frame2 from "../../assets/images/Frame2.webp";
import Frame3 from "../../assets/images/Frame3.webp";
import Frame4 from "../../assets/images/Frame4.webp";
import Frame5 from "../../assets/images/Frame5.webp";

function CarouselDefault() {
  const images = [Frame1, Frame2, Frame3, Frame4, Frame5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 0));
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  return (
    <div className="relative flex justify-center items-end">
      <div>
        <img
          src={images[currentIndex]}
          alt="Image description"
          className="h-full w-full"
        />
      </div>
      <div className="flex gap-3 absolute sm:bottom-5 bottom-2 ">
        <button
          onClick={() => setCurrentIndex(0)}
          className={`${
            currentIndex === 0 ? "carouselButtonFill" : "carouselbutton"
          }`}
        ></button>
        <button
          onClick={() => setCurrentIndex(1)}
          className={`${
            currentIndex === 1 ? "carouselButtonFill" : "carouselbutton"
          }`}
        ></button>
        <button
          onClick={() => setCurrentIndex(2)}
          className={`${
            currentIndex === 2 ? "carouselButtonFill" : "carouselbutton"
          }`}
        ></button>
        <button
          onClick={() => setCurrentIndex(3)}
          className={`${
            currentIndex === 3 ? "carouselButtonFill" : "carouselbutton"
          }`}
        ></button>
        <button
          onClick={() => setCurrentIndex(4)}
          className={`${
            currentIndex === 4 ? "carouselButtonFill" : "carouselbutton"
          }`}
        ></button>
      </div>
    </div>
  );
}

export default CarouselDefault;
