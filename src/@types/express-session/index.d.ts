import "express-session";

type SortBy = "published" | "updated" | "views" | "comments";

declare module "express-session" {
  interface SessionData {
    selections?: SortBy[];
  }
}
