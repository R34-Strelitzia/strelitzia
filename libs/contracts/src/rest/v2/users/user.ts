import { IsEmail, Length } from "class-validator";

export class User {
  @Length(4, 20)
  username: string;

  @IsEmail()
  email: string;
}
