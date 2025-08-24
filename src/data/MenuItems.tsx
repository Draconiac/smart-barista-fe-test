import homeIcon from "../assets/home.svg";
import orderIcon from "../assets/basket-plus.svg";
import menu from "../assets/file-dots.svg";
import tableIcon from "../assets/desk.svg";
import discountIcon from "../assets/rosette-discount.svg"


export const menuItems = [
  { label: "mainpage", path: "/", iconPath: homeIcon },
  { label: "menu", path: "/menu", iconPath: menu },
  {
    label: "definitions",
    path: "/tanimlamalar",
    iconPath: homeIcon,
    children: [
      {
        label: "tableandareas",
        path: "/tanimlamalar/masabolgeler",
        iconPath: tableIcon,
      },
      {
        label: "menuandproducts",
        path: "/tanimlamalar/menuurunler",
        iconPath: homeIcon,
      },
      {
        label: "stocks",
        path: "/tanimlamalar/stok",
        iconPath: homeIcon,
      },
      {
        label: "discounts",
        path: "/tanimlamalar/indirimler",
        iconPath: discountIcon,
      },
    ],
  },
  {
    label: "orders",
    path: "/siparis",
    iconPath: orderIcon,
  },

  { label: "operations", path: "/islemler", iconPath: homeIcon },
  { label: "reports", path: "/raporlar", iconPath: homeIcon },
  { label: "users", path: "/kullanicilar", iconPath: homeIcon },
  { label: "settings", path: "/ayarlar", iconPath: homeIcon },
  { label: "logout", path: "/cikis", iconPath: homeIcon },
];
