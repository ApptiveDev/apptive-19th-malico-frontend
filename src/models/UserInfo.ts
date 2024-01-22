export interface UserInfo {
  nickname: string,
  profileImage?: string,
  isStylist?: boolean,
}

export interface DetailedStylistInfo extends StylistInfo {
  stylistIntroduction: string,
  city: string,
  state: string,
  chat_link: string,
  careerDtoList: CareerDto[]
}

export interface StylistInfo extends UserInfo {
  stylistId: number,
  profileImage?: string,
  onLineIntroduction?: string,
  stageName: string,
}

interface CareerDto {
  organizationName: string,
  content: string,
  startYear: string,
  endYear: string,
}
