import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Roboto, Quicksand, Open_Sans } from "next/font/google";

export const quickSand: NextFontWithVariable = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quickSand",
});

export const openSans: NextFontWithVariable = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--open-sans",
});

export const robFont: NextFontWithVariable = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--roboto",
});
