import { UserInfoDTO } from "../api/dto/user-info-DTO";
import { UserInfo } from "../model/user-info";

export function mapUserInfo(dto: UserInfoDTO): UserInfo {
  return {
    businessNumber: dto.businessNumber,
    companyName: dto.companyName,
  };
}
