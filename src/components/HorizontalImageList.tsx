import React from "react";
import style from "../components/HorizontalImageList.module.scss";

type ImageItem = {
  src: string;
  label: string;
};

type Props = {
  items: ImageItem[];
};

const HorizontalImageList: React.FC<Props> = ({ items }) => {
  return (
    <div className={style.container}>
    <div className={style.titleElegant}>
      <p className="display-4">Why Us?</p>
    </div>
    <div className={style.imageView}>
      {items.map((item, index) => (
        <div key={index} className="image-card">
          <img src={item.src} alt={item.label} className="image" />
          {/* <p className="image-label">{item.label}</p> */}
        </div>
      ))}
    </div>
    </div>
  );
};

export default HorizontalImageList;
