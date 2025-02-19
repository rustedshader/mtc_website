import { siteConfig } from "@/config/site";
import { Copyright, CopyrightIcon } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-grid py-6 mt-auto w-full">
      <div className="container px-4">
        <div className="flex flex-col items-center space-y-8 md:flex-row md:justify-between md:space-y-0">
          {/* Contact Us Section */}
          <div className="text-center md:text-left pl-4">
            <div className="text-white font-semibold text-lg mb-4">
              Contact Us
            </div>
            <div className="text-muted-foreground text-sm space-y-2">
              <div>
                <strong>Location:</strong> {siteConfig.location}
              </div>
              <div>
                <strong>Mobile:</strong> {siteConfig.contact_number}
              </div>
              <div>
                <strong>Email:</strong> {siteConfig.email}
              </div>
            </div>
          </div>
          <div className="text-sm text-center flex md:text-center gap-2">
            <Copyright className="h-4 w-4" />
            <span>
              {new Date().getUTCFullYear()} {siteConfig.name}. All rights
              reserved.
            </span>
          </div>

          {/* Socials Section */}
          <div className="text-center md:text-left">
            <div className="text-white font-semibold text-lg mb-4">Socials</div>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:gap-4">
              <div className="flex flex-row items-center gap-2">
                <svg
                  data-testid="geist-icon"
                  height="16"
                  strokeLinejoin="round"
                  style={{ color: "currentcolor" }}
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
                    fill="currentColor"
                  ></path>
                </svg>
                <Link href={siteConfig.instagram}>Instagram</Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <svg
                  data-testid="geist-icon"
                  height="16"
                  strokeLinejoin="round"
                  style={{ color: "currentcolor" }}
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 2C2.67157 2 2 2.67157 2 3.5V12.5C2 13.3284 2.67157 14 3.5 14H12.5C13.3284 14 14 13.3284 14 12.5V3.5C14 2.67157 13.3284 2 12.5 2H3.5ZM4.74556 5.5C5.21057 5.5 5.5 5.16665 5.5 4.75006C5.49133 4.3241 5.21057 4 4.75438 4C4.29824 4 4 4.3241 4 4.75006C4 5.16665 4.28937 5.5 4.73687 5.5H4.74556ZM5.5 6.5V12H4V6.5H5.5ZM7 12H8.5V8.89479C8.5 8.89479 8.60415 7.78962 9.55208 7.78962C10.5 7.78962 10.5 9.02275 10.5 9.02275V12H12V8.8133C12 7.13837 11.25 6.5025 10.125 6.5025C9 6.5025 8.5 7.27778 8.5 7.27778V6.5025H7.00005C7.02383 7.01418 7 12 7 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <Link href={siteConfig.linkedin}>Linkedin</Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <svg
                  data-testid="geist-icon"
                  height="16"
                  strokeLinejoin="round"
                  style={{ color: "currentcolor" }}
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.4695 3.39273C14.0722 3.55407 14.5459 4.02773 14.7073 4.63046C14.9988 5.72183 15 8.00023 15 8.00023C15 8.00023 15 10.2786 14.7073 11.37C14.5459 11.9728 14.0722 12.4464 13.4695 12.6077C12.3782 12.9005 7.99998 12.9005 7.99998 12.9005C7.99998 12.9005 3.62183 12.9005 2.53045 12.6077C1.92773 12.4464 1.45407 11.9728 1.29272 11.37C1 10.2786 1 8.00023 1 8.00023C1 8.00023 1 5.72183 1.29272 4.63046C1.45407 4.02773 1.92773 3.55407 2.53045 3.39273C3.62183 3.10001 7.99998 3.10001 7.99998 3.10001C7.99998 3.10001 12.3782 3.10001 13.4695 3.39273ZM10.2362 8.00046L6.59906 10.1002V5.90068L10.2362 8.00046Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <Link href={siteConfig.youtube}>Youtube</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
