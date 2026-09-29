// Sponsors by tier — copied verbatim from the design reference.
// Logo file: /images/partners/<id>.png. `hf` = logo height inside its tile
// (per-logo optical sizing, since the artwork has different padding).

export interface PartnerLogo {
  id: string
  vi: string
  en: string
  hf: string
}

export interface PartnerTier {
  vi: string
  en: string
  logos: PartnerLogo[]
}

export const PARTNERS: PartnerTier[] = [{"vi":"Nhà tài trợ Chiến lược","en":"Strategic Sponsors","logos":[{"id":"coca-cola","vi":"Công ty TNHH Nước giải khát Coca-Cola Việt Nam","en":"Coca-Cola Beverages Vietnam Ltd.","hf":"52%"},{"id":"heineken","vi":"Công ty TNHH Nhà Máy Bia Heineken Việt Nam","en":"HEINEKEN Vietnam Brewery Co., Ltd.","hf":"52%"},{"id":"nestle","vi":"Công ty TNHH Nestlé Việt Nam","en":"Nestlé Vietnam Ltd.","hf":"89%"},{"id":"sabeco","vi":"Tổng công ty CP Bia - Rượu - Nước giải khát Sài Gòn (SABECO)","en":"Saigon Beer - Alcohol - Beverage Corporation (SABECO)","hf":"88%"}]},{"vi":"Nhà tài trợ Bạch Kim","en":"Platinum Sponsors","logos":[{"id":"cp-vietnam","vi":"Công ty Cổ phần Chăn nuôi C.P. Việt Nam","en":"C.P. Vietnam Corporation","hf":"100%"}]},{"vi":"Nhà tài trợ Vàng","en":"Gold Sponsors","logos":[{"id":"aeon","vi":"Công ty TNHH AEON Việt Nam","en":"AEON Vietnam Co., Ltd.","hf":"50%"},{"id":"bat","vi":"Công ty British American Tobacco","en":"British American Tobacco (BAT)","hf":"54%"},{"id":"dksh","vi":"Công ty DKSH Việt Nam","en":"DKSH Vietnam","hf":"60%"},{"id":"mondelez","vi":"Công ty Mondelez Kinh Đô Việt Nam","en":"Mondelez Kinh Do Vietnam","hf":"57%"},{"id":"sasco","vi":"Công ty Cổ phần Dịch vụ hàng không Sân bay Tân Sơn Nhất (SASCO)","en":"Southern Airports Services JSC (SASCO)","hf":"53%"},{"id":"vinamilk","vi":"Công ty CP Sữa Việt Nam (Vinamilk)","en":"Vietnam Dairy Products JSC (Vinamilk)","hf":"52%"}]},{"vi":"Nhà tài trợ Đồng","en":"Bronze Sponsors","logos":[{"id":"bidv","vi":"Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)","en":"Joint Stock Commercial Bank for Investment and Development of Vietnam (BIDV)","hf":"60%"},{"id":"pnj","vi":"Công ty CP Vàng bạc Đá quý Phú Nhuận (PNJ)","en":"Phu Nhuan Jewelry JSC (PNJ)","hf":"100%"},{"id":"scg","vi":"Công ty TNHH SCG Việt Nam","en":"SCG Vietnam Co., Ltd.","hf":"54%"},{"id":"home-credit","vi":"Công ty Tài chính TNHH MTV Home Credit Việt Nam","en":"Home Credit Vietnam Finance Company Ltd.","hf":"60%"},{"id":"carlsberg","vi":"Công ty Bia Carlsberg Việt Nam","en":"Carlsberg Vietnam","hf":"63%"}]}];
