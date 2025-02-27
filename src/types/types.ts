export type IconProps = {
  className?: string;
};

export type AnimatedIconProps = {
  className?: string;
  isHover?: boolean;
};

export type ProductCardProps = {
  index?: number;
  title: string;
  image: string;
  bgColor: string;
  imageHeight?: number;
  textColor?: "#E6E6E6" | "#171719";
};
