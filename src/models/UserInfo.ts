export interface UserInfo {
  nickname: string,
  profile_image: string,
  isStylist?: boolean,
}

export interface StylistInfo extends UserInfo {
  oneLineIntroduction: string,
  stylistIntroduction: string,
  city: string,
  state: string,
  chat_link: string,
  careerDtoList: CareerDto[]
}

interface CareerDto {
  organizationName: string,
  content: string,
  startYear: string,
  endYear: string,
}
