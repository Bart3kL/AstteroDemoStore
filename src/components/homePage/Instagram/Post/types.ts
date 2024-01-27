import type { InstagramPropss } from "../types";

export type PostProps = InstagramPropss["posts"][0] & { idx: number };
