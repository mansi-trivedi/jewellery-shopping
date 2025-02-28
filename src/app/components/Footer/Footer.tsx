import React from "react";
import Link from "next/link";

const footerLinks = [
  {
    label: "new arrival",
    href: "/",
  },
  {
    label: "earrings",
    href: "/",
  },
  {
    label: "necklaces",
    href: "/",
  },
  {
    label: "bracelets",
    href: "/",
  },
  {
    label: "bangles",
    href: "/",
  },
  {
    label: "rings",
    href: "/",
  },
  {
    label: "anklets",
    href: "/",
  },
];

const Footer = () => {
  return (
    <footer className="py-8 border-t border-lightBlue border-opacity-15">
      <div className="container mx-auto px-4 text-center">
        <nav className="flex justify-center space-x-4 mb-4 flex-wrap">
          {footerLinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className=" text-darkBlue hover:text-gray-800 text-fluid-base leading-fluid-base capitalize font-quickSand tracking-wider font-semibold"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className=" hover:text-gray-800">
            {/* Replace with your GitHub icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.32a1 1 0 0 0-.41-.81c-.15-.12-.39-.29-.94-.43-1.42-.52-2.42-.92-3.42-1.32C8.07 10.34 8 10 8 9.36V9a1 1 0 0 0-1-1h-1c-1.03 0-2.03.39-2.85 1.03A6 6 0 0 0 3 14c0 1.39.77 2.28 1.94 2.94a9.45 9.45 0 0 0-1 1.79m9-4v-1a2.67 2.67 0 0 0-.67-1.85 3.8 3.8 0 0 0 1.02-2.12c-.08-.85-.4-1.6-.83-2.12a3.87 3.87 0 0 0-.76-1.01 3.61 3.61 0 0 0-1.06-.21"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            {/* Replace with your Twitter icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            {/* Replace with your Instagram icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>

        <p className=" text-darkBlue text-fluid-base leading-fluid-base font-semibold">
          © {new Date().getFullYear()} Brand Name
        </p>
      </div>
    </footer>
  );
};

export default Footer;
