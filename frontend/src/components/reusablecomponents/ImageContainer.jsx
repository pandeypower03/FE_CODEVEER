import React from 'react';

const ImageContainer = ({ imgSrc, side }) => {
  const imgClass = side === 'left' ? 'left-img w-[300px] h-[350px]' : 'right-img w-[250px] h-[250px]';

  return (
    <div className={`${side}-img-container h-[300px] flex items-end`}>
      <img className={`${imgClass} relative`} src={imgSrc} alt={side} />
    </div>
  );
};

export default ImageContainer;
