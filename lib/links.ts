export const MERCAV_HREF = "https://mercav.lat";

export const CONNECT_LINKS = [
  {
    id: "github",
    href: "https://github.com/invertilo",
    host: "github.com/invertilo",
  },
  {
    id: "instagram",
    href: "https://instagram.com/vini.ltc",
    host: "instagram.com/vini.ltc",
  },
  {
    id: "telegram",
    href: "https://t.me/invertilo",
    host: "t.me/invertilo",
  },
  {
    id: "email",
    href: "mailto:vini@askforvini.pw",
    host: "vini@askforvini.pw",
  },
] as const;

export type ConnectId = (typeof CONNECT_LINKS)[number]["id"];
