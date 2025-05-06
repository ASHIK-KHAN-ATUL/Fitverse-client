import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/Banner/banner1.png'
import img2 from '../../../assets/Banner/banner2.png'
import img3 from '../../../assets/Banner/banner3.png'

const Banner = () => {
    return (
            <Carousel showArrows={true} autoPlay={true} >
                <div >
                    <img  src={img1} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img2} />
                </div>
            </Carousel>
    );
};

export default Banner;