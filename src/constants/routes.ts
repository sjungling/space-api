export const HOME_PAGE_LINK = "/";
export const ABOUT_PAGE_LINK = "/about";
export const MISSION_DETAIL_LINK = "/mission/:mission_id";
export const CREATE_MISSION_DETAIL_LINK = (id: number | string): string =>
  `/mission/${id}`;
export const ASTRONAUT_DETAIL_LINK = "/astronaut/:astronaut_id";
export const CREATE_ASTRONAUT_DETAIL_LINK = (id: number | string): string =>
  `/astronaut/${id}`;
