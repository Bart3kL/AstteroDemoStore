import { type ShipmentProps } from "../types";
import { type OrdersProps } from "../../types";

export type ShipmentDetailsProps = ShipmentProps & OrdersProps["trackYourHistory"];
