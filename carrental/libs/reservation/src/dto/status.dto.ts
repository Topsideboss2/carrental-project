import { ReservationStatus } from "@prisma/client";
import { IsInt, IsString } from "class-validator";

export class ReservationStatusDto {
  @IsInt()
  reservationId = 0;

  @IsString()
  status = "" as ReservationStatus;

}
