import React from "react";
import { ConstellationHeading } from "./ConstellationHeading";

export const HeroTitle: React.FC = () => {
  return (
    <ConstellationHeading
      line1="The Collegium"
      line2="of Minds"
      line1ClassName="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-center"
      line2ClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 sm:mt-4 font-light italic tracking-wide text-center"
      className="mb-6"
      cursorRadius={105}
      as="h1"
    />
  );
};
