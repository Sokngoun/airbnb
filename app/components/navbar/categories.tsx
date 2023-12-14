"use client";
import Container from "../container";
// icons
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBoatFishing, GiIsland, GiWindmill,GiCastle,GiCampingTent,GiSnowflake1 ,GiDesert  } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { useSearchParams } from "next/navigation";
import { FaSkiingNordic } from "react-icons/fa";


export const categoires = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },  {
    label: "Countrysize",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiingNordic,
    description: "This property has skiing activities!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property in castle!",
  },
  {
    label: "Camping",
    icon: GiCampingTent,
    description: "This property has camping activities! ",
  },
  {
    label: "Arctic",
    icon: GiSnowflake1 ,
    description: "This property is close to snow area!",
  },
  {
    label: "Desert",
    icon: GiDesert ,
    description: "This property is around desert!",
  },
];

const Categories = () => {
  const params = useSearchParams()
  const category = params.get('category')

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categoires.map((item) => (
          <CategoryBox
          selected={category === item.label.toLowerCase()}
            key={item.label}
            label={item.label}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
