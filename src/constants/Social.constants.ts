import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Globe } from "lucide-react";

export const SOCIAL_LINKS = [
    {
        name: "Twitter",
        url: "https://x.com/ma_3llim_007",
        icon: FaTwitter,
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/ma_3llim_007/",
        icon: FaInstagram,
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mohdsameer-dev/",
        icon: FaLinkedin,
    },
    {
        name: "Portfolio",
        url: "https://mohdsameer.info",
        icon: Globe,
    },
] as const;
