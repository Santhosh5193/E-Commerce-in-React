// import { useEffect, useRef } from "react";

// const useHorizontalScroll = () => {
//   const ref = useRef(null);

//   const getScrollAmount = () => {
//     // Adjust the scroll amount based on screen width
//     return window.innerWidth <= 768 ? 150 : 300; // Smaller scroll for mobile
//   };

//   const scrollLeft = () => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     const handleWheel = (event) => {
//       if (ref.current && event.deltaY !== 0) {
//         const scrollAmount = getScrollAmount();
//         const isHorizontalScroll =
//           Math.abs(event.deltaY) > Math.abs(event.deltaX);

//         if (isHorizontalScroll) {
//           event.preventDefault(); // Prevent vertical scroll from triggering
//           ref.current.scrollBy({
//             left: event.deltaY > 0 ? scrollAmount : -scrollAmount,
//             behavior: "smooth",
//           });
//         }
//       }
//     };

//     const currentRef = ref.current;

//     if (currentRef) {
//       currentRef.addEventListener("wheel", handleWheel, { passive: false });
//     }

//     return () => {
//       if (currentRef) {
//         currentRef.removeEventListener("wheel", handleWheel);
//       }
//     };
//   }, []);

//   return { ref, scrollLeft, scrollRight };
// };

// export default useHorizontalScroll;
