import { SidebarContentType } from "../sidebar/interface";

export const sidebarContents: SidebarContentType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: "ic:baseline-dashboard",
    children: [
      {
        title: "Home",
        // icon: "material-symbols:circle",
        link: "/home",
      },
    ],
  },
  {
    id: 2,
    title: "Paragraph",

    link: "/#paragraph",
  },
  {
    id: 3,
    title: "Button",
    link: "/#button",
  },
  {
    id: 4,
    title: "Input",
    link: "/#input",
  },
  {
    id: 5,
    title: "Textarea",
    link: "/#textarea",
  },
  {
    id: 6,
    title: "popover",
    link: "/#popover",
  },
  {
    id: 7,
    title: "modal",
    link: "/#modal",
  },
  {
    id: 8,
    title: "Sidebar",
    link: "/#sidebar",
  },
];
