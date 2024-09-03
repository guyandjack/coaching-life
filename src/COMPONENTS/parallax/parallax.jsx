// eslint-disable-next-line no-unused-vars
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";


import "../../style/CSS/parallax.css";


function Parallax() {
    return (
        <div>
      <ParallaxBanner
        layers={[{ image: "../assets/image/page-index/montage-index.jpg", speed: -15 }]}
                className="aspect-[2/1] parallax"
               
      />
            merde2
        </div>
    );
}

export {Parallax}