import { VerifyBusinessNumberDTO } from "../api/dto/business-verify-token-DTO";
import { VerifyBusinessNumber } from "../model/business-verify-token";

export function mapBusinessNumberVerifyToken(
  dto: VerifyBusinessNumberDTO
): VerifyBusinessNumber {
  return {
    company: dto.company,
    owner: dto.owner,
    businessNumberVerifyToken: dto.businessNumberVerifyToken,
  };
}
