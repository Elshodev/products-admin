import { MenuItem } from "@/constants/sidebar";

const getActiveLabel = (
  menu: MenuItem[],
  pathname: string,
  t: (key: string) => string
): string => {
  for (const item of menu) {
    if (item.path === pathname) {
      return t(item.translationKey);
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.path === pathname) {
          return t(child.translationKey);
        }
      }
    }
  }
  return "";
};

export { getActiveLabel };
