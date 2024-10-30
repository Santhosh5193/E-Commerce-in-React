import CarouselDefault from "./CarouselDefault";
import Flahsales from "./Flahsales";

function Home() {
  return (
    <div>
      <div className="flex gap-24 px-10 py-5 ">
        <div className="border-r-2 pr-28">
          <ul className="listfont leading-9 text-nowrap">
            <li className="">Men's Fashion</li>
            <li className="">Women's Fashion</li>
            <li className="">Electronics</li>
            <li className="">Home & Lifestyle</li>
            <li className="">Medicine</li>
            <li className="">Sports & Outdoor</li>
            <li className="">Baby's & Toys</li>
            <li className="">Geoceries & Pets</li>
            <li className="">Health & Beauty</li>
          </ul>
        </div>
        <div>
          <CarouselDefault />
        </div>
      </div>
      <Flahsales />
    </div>
  );
}

export default Home;
