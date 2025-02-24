import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const HeroSliderOneSingle = () => {
  return (
    <div className="single-slider slider-height-1 bg-purple">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content slider-animated-1">
              <h3 className="animated">Title</h3>
              <h1 className="animated">Sub Title</h1>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                 to ="#"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-single-img slider-animated-1">
              <img
                className="animated img-fluid"
                src="/assets/img/slider/single-slide-hm1-2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default HeroSliderOneSingle;
