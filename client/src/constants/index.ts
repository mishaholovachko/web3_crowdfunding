import { Theme } from "@thirdweb-dev/react";
import {
  createCampaign,
  dashboard,
  withdraw,
  payment,
  profile,
  logout,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];

export const ConnectWalletBtnProps: Theme = {
  type: "dark",
  colors: {
    primaryButtonBg: "#8c6dfd",
    primaryText: "",
    secondaryText: "",
    accentText: "",
    danger: "",
    success: "",
    modalOverlayBg: "",
    accentButtonBg: "",
    accentButtonText: "",
    primaryButtonText: "",
    secondaryButtonBg: "",
    secondaryButtonText: "",
    secondaryButtonHoverBg: "",
    modalBg: "#8c6dfd",
    tooltipBg: "",
    tooltipText: "",
    inputAutofillBg: "",
    scrollbarBg: "",
    walletSelectorButtonHoverBg: "",
    separatorLine: "",
    secondaryIconColor: "",
    secondaryIconHoverBg: "",
    secondaryIconHoverColor: "",
    borderColor: "",
    skeletonBg: "",
    selectedTextColor: "",
    selectedTextBg: "",
    connectedButtonBg: "",
    connectedButtonBgHover: "",
  },
  fontFamily: "",
};
