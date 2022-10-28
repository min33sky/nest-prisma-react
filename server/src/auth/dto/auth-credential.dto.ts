import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  /**
   * print password regexp
   * console.log(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.toString())
   */
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,20})/, {
    message:
      '소문자, 대문자, 숫자, 특수문자를 포함한 6~20자리의 비밀번호를 입력해주세요.',
  })
  password: string;
}
