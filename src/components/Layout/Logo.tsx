// import Image from 'next/image'
import React from "react";

import Image from "../Image";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 100, height = 100 }: LogoProps) => {
  return (
    <div>
      <Image
        alt="Kolum Logo"
        src="https://www.kolum.earth/img/logo.svg"
        width={width}
        height={height}
      />
    </div>
  );
};

export default Logo;
