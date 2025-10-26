import { LoginTokenDTO } from "../api/dto/login-token-DTO";
import { LoginToken } from "../model/login-token";

export function mapLoginToken(
  dto: LoginTokenDTO
): LoginToken {
  return {
    accessToken: dto.accessToken,
    refreshToken: dto.refreshToken,
    accessTokenExpiresIn: dto.accessTokenExpiresIn,
    refreshTokenExpiresIn: dto.refreshTokenExpiresIn
  };
}
