import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    id: 1,
    title: "Home",
    cName: "sidebar-item",
    icon: <FaIcons.FaHome />,
    path: "/",
  },
  {
    id: 2,
    title: "Products",
    cName: "sidebar-item",
    icon: <FaIcons.FaCartPlus />,
    path: "/products",
    dropdown: [
      {
        id: 4,
        title: "Product 1",
        path: "/products/product1"
      },
      {
        id: 5,
        title: "Product 2",
        path: "/products/product2"
      }
    ]
  }
];
