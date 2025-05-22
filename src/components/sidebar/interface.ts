export interface SidebarContentType {
  id?: any;
  link?: string;
  title: string;
  children?: SidebarContentType[];
  icon?: string;
  iconColor?: string;
}

export const sidebarData: SidebarContentType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: "ic:baseline-dashboard",
    children: [
      {
        title: "Home",
        // icon: "material-symbols:circle",
        link: "/",
      },
      {
        title: "Main",
        // icon: "material-symbols:circle-outline",
        children: [
          {
            title: "Other",
            // icon: "material-symbols:circle",
            link: "/main",
          },
        ],
      },
    ],
  },
];
