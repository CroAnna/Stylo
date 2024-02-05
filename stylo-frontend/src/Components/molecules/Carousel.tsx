import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import { FC } from "react";
import { CarouselProps } from "../../common/types";
import NoImage from "../../assets/images/no-image.jpg";

const Carousel: FC<CarouselProps> = ({ images }) => {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.onerror = null; // prevents looping
    event.currentTarget.src = NoImage;
  };

  return (
    <div>
      <ReactCarousel>
        {images.map((el, index) => (
          <div key={index}>
            <img src={el} alt={`image-${index}`} onError={handleError} />
          </div>
        ))}
      </ReactCarousel>
    </div>
  );
};

export default Carousel;
