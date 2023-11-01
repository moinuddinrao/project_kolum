import React from "react";

interface ImageProps {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ className, alt, src, ...rest }) => {
  return (
    <div>
      <img {...rest} alt={alt} src={src} className={className} />
    </div>
  );
};

export default Image;
