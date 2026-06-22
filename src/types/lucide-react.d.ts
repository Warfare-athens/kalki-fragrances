declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";

  export type LucideIcon = ComponentType<
    SVGProps<SVGSVGElement> & {
      size?: number | string;
      strokeWidth?: number | string;
      absoluteStrokeWidth?: boolean;
    }
  >;

  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Check: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronDownIcon: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronLeftIcon: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronRightIcon: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Circle: LucideIcon;
  export const GripVertical: LucideIcon;
  export const Compass: LucideIcon;
  export const Home: LucideIcon;
  export const Minus: LucideIcon;
  export const MoreHorizontal: LucideIcon;
  export const Package: LucideIcon;
  export const PanelLeft: LucideIcon;
  export const Search: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const User: LucideIcon;
  export const X: LucideIcon;
}
