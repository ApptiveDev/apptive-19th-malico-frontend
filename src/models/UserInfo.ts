export interface UserInfo {
  nickname: string,
  profileImage?: string,
  isStylist?: boolean,
}

export interface DetailedStylistInfo {
  stageName: string,
  oneLineIntroduction: string,
  stylistIntroduction: string,
  city: string,
  state: string,
  chat_link: string,
  profileImage: string,
  careerDtoList: CareerDto[],
  styleDtoList: StyleDto[],
  stylistServiceDtoList: StylistServiceDto[]
}

export interface StylistInfo extends UserInfo {
  stylistId: number,
  profileImage?: string,
  oneLineIntroduction?: string,
  stageName: string,
}

export interface StylistSearchInfo {
  style_id: number,
  img: string,
}

interface StylistServiceDto {
  service_id: number,
  serviceName: string,
  serviceDescription: string,
  serviceCategoryDto: ServiceCategoryDto,
  price: number,
}

interface ServiceCategoryDto {
  serviceType: string,
  connectionType: string,
  categoryDescription: string
}

interface StyleDto {
  style_id: number,
  image: string,
  category: string,
}

interface CareerDto {
  organizationName: string,
  content: string,
  startYear: string,
  endYear: string,
}
