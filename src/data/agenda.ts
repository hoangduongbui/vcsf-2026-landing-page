// Programme — copied verbatim from the design reference (the two tabs it shows).
// A row is [time, activity, speaker] or a { section } divider.
// Speaker text may contain "\n" line breaks.

import type { Locale } from './content'

export type AgendaRow = [string, string, string] | { section: string }

export interface AgendaSession {
  tab: string
  title: string
  subtitle: string
  theme: string
  date: string
  note?: string
  rows: AgendaRow[]
}

const S = (section: string) => ({ section })

export const AGENDA: Record<Locale, AgendaSession>[] = [
  { vi: { tab: "Khung chương trình tổng thể", title: "Chương trình dự kiến", subtitle: "Diễn đàn Doanh nghiệp Phát triển Bền vững Việt Nam 2026", theme: "Tăng trưởng bứt phá – Phát triển bền vững: Hai mục tiêu, một hành trình", date: "Thứ Hai, 05/10/2026 · Phòng Sông Hồng, Khách sạn Sheraton Hà Nội", rows: [
    S("PHIÊN TOÀN THỂ (7h45 – 11h30)"),
    ["7h45 – 8h15", "Đăng ký đại biểu", ""],
    ["8h15 – 8h20", "Video clip", ""],
    ["8h20 – 8h30", "Giới thiệu chương trình và khách mời", ""],
    ["8h30 – 8h40", "Phát biểu khai mạc", "Ông Hồ Sỹ Hùng, Chủ tịch Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI)"],
    ["8h40 – 8h55", "Tham luận 1: “Đổi mới mô hình phát triển của Việt Nam: Từ mục tiêu tăng trưởng hai con số đến vai trò của doanh nghiệp kinh doanh bền vững”", "Diễn giả: GS. TS. Nguyễn Xuân Thắng, Ủy viên Bộ Chính trị khóa XIII, Chủ tịch Hội đồng Lý luận Trung ương"],
    ["8h55 – 9h10", "Bài trình bày 2: “Nâng cao năng suất, thúc đẩy đổi mới sáng tạo hướng tới nền kinh tế tự cường, bền vững: Khuyến nghị cho Việt Nam”", "Diễn giả: Ông Bùi Minh Giáp, Chuyên gia Kinh tế trưởng, Ngân hàng Phát triển Châu Á (ADB)"],
    ["9h10 – 9h25", "Tham luận 3: “Đồng kiến tạo tăng trưởng bền vững: Vai trò của địa phương trong hiện thực hóa mục tiêu quốc gia”", "Diễn giả: Ông Bùi Văn Khắng, Phó Bí thư Thành ủy, Chủ tịch UBND Thành phố Quảng Ninh"],
    ["9h25 – 9h40", "Bài trình bày 4: “Kiến tạo lợi thế cạnh tranh cho Việt Nam - Hành trình từ nông trại vươn ra thế giới”", "Diễn giả: Ông Binu Jacob, Tổng giám đốc Nestlé Việt Nam, Đồng Chủ tịch VBCSD"],
    ["9h40 – 9h55", "Bài trình bày 5: “Phát triển bền vững - Động lực tăng trưởng: Từ doanh nghiệp đến quốc gia”", "Diễn giả: Ông James Crampton, Giám đốc Ngoại vụ cấp cao, Công ty HEINEKEN Việt Nam, Phó Chủ tịch VBCSD"],
    ["9h55 – 10h10", "Bài trình bày 6: “Tạo tác động vượt ra ngoài doanh nghiệp: Hành trình lan tỏa phát triển bền vững đến cộng đồng của Vinamilk”", "Diễn giả: Ông Lê Hoàng Minh, Giám đốc điều hành Sản xuất, Công ty CP Sữa Việt Nam (Vinamilk)"],
    ["10h10 – 11h10", "Thảo luận cấp cao: “Chính sách kết nối – Doanh nghiệp đồng hành: Hướng tới nền kinh tế tự cường, bền vững”", "Thành phần diễn giả:\nÔng Hồ Kiên Trung, Phó Cục trưởng, Cục Môi trường - Bộ Nông nghiệp và Môi trường\nTS. Nguyễn Đắc Bình Minh, Phó Viện trưởng, Viện Đổi mới sáng tạo Quốc gia – Bộ Khoa học và Công nghệ\nÔng Lee Chio Lim Larry, Phó Tổng giám đốc phụ trách Tài sản Chiến lược, SABECO\nBà Nguyễn Thị Thu Hằng, Giám đốc Đối ngoại khu vực Mekong, Tập đoàn Maersk\nÔng Lê Hùng Cường, Tổng giám đốc FPT Digital, Tập đoàn FPT\nBà Beate Dippmar, Giám đốc khối các chương trình về giáo dục nghề nghiệp, thị trường lao động và chuyển dịch lao động, Tổ chức GIZ\nĐiều phối viên: Bà Trần Thúy Ngọc, Phó Tổng giám đốc Deloitte Việt Nam, Phó Chủ tịch VBCSD"],
    ["11h10 – 11h15", "Tặng hoa đại diện doanh nghiệp chúc mừng Ngày Doanh nhân Việt Nam 13/10", ""],
    ["11h15 – 11h35", "Phát biểu chỉ đạo", "Phó Thủ tướng Chính phủ Hồ Quốc Dũng"],
    ["11h35 – 11h40", "Phát biểu tiếp thu và bế mạc Phiên toàn thể VCSF 2026", "Ông Nguyễn Quang Vinh, Phó Chủ tịch VCCI, Chủ tịch VBCSD"],
    ["11h40", "Tiệc trưa", ""],
    S("PHIÊN CHUYÊN ĐỀ (13h30 – 15h45)"),
    ["13h15 – 13h30", "Đăng ký đại biểu", ""],
    ["13h30 – 15h45", "Chủ đề 1: “Đổi mới sáng tạo: Bệ phóng cho phát triển bền vững doanh nghiệp”", ""],
    ["13h30 – 15h45", "Chủ đề 2: “Tài chính xanh: Mở nguồn vốn mới cho doanh nghiệp chuyển đổi bền vững”", ""],
    ["15h45 – 16h00", "Bốc thăm trúng thưởng", ""],
  ] }, en: { tab: "Overall programme", title: "Tentative agenda", subtitle: "Vietnam Corporate Sustainability Forum 2026", theme: "Accelerating growth – Advancing sustainability: Two goals, one shared journey", date: "Monday, 5 October 2026 · Hong River Ballroom, Sheraton Hanoi Hotel", rows: [
    S("PLENARY SESSION (7h45 – 11h30)"),
    ["7h45 – 8h15", "Guest registration", ""],
    ["8h15 – 8h20", "Video clip", ""],
    ["8h20 – 8h30", "Agenda and guest introduction", ""],
    ["8h30 – 8h40", "Opening Remarks", "Mr. Ho Sy Hung, Chairman of the Vietnam Chamber of Commerce and Industry (VCCI)"],
    ["8h40 – 8h55", "Presentation 1: “Transforming Viet Nam’s development model: From the double-digit growth target to the role of sustainable businesses”", "Speaker: Prof. Dr. Nguyen Xuan Thang, Member of the 13th Politburo, Chairman of the Central Theoretical Council"],
    ["8h55 – 9h10", "Presentation 2: “Enhancing productivity and fostering innovation towards a self-reliant, sustainable economy: Recommendations for Viet Nam”", "Speaker: Mr. Bui Minh Giap, Principal Economist, Asian Development Bank - Vietnam"],
    ["9h10 – 9h25", "Presentation 3: “Co-creating sustainable growth: Role of localities in realizing national goals”", "Speaker: Mr. Bui Van Khang, Deputy Secretary of Quang Ninh Party Committee, Chairman of Quang Ninh People’s Committee"],
    ["9h25 – 9h40", "Presentation 4: “Building Vietnam's competitive advantage from farm to world”", "Speaker: Mr. Binu Jacob, CEO of Nestlé Vietnam, VBCSD Co-Chair"],
    ["9h40 – 9h55", "Presentation 5: “Sustainability: From corporate growth to national growth”", "Speaker: Mr. James Crampton, Corporate Affairs Director of HEINEKEN Vietnam, VBCSD Vice-Chair"],
    ["9h55 – 10h10", "Presentation 6: “Creating impact beyond business: Vinamilk's journey to advance sustainable development across communities”", "Speaker: Mr. Le Hoang Minh, Executive Director – Production, Vinamilk"],
    ["10h10 – 11h10", "High-Level Dialogue: “Policy and Business in Partnership: Advancing a Self-Reliant and Sustainable Economy”", "Panelists:\nMr. Ho Kien Trung, Deputy Director of Vietnam Environment Agency – Ministry of Agriculture and Environment\nDr. Nguyen Dac Binh Minh, Deputy Director, National Academy for Advanced Technology and Innovation – Ministry of Science and Technology\nMr. Lee Chio Lim Larry, Deputy General Director in charge of Strategic Assets, SABECO\nMs. Nguyen Thi Thu Hang, Regional Head of Government and Public Affairs, Mekong Area, A.P. Moller – Maersk\nMr. Le Hung Cuong, CEO of FPT Digital, FPT Group\nMs. Beate Dippmar, Cluster Coordinator TVET, Labour Market and Labour Mobility; Programme Manager ‘EU-Viet Nam TVET Programme’ – GIZ Viet Nam\nModerator: Ms. Tran Thuy Ngoc, Deputy CEO of Deloitte Vietnam, Vice Chair of VBCSD"],
    ["11h10 – 11h15", "Presenting flowers to business representatives in celebration of Vietnamese Entrepreneurs’ Day (13 October)", ""],
    ["11h15 – 11h35", "Keynote speech", "Deputy Prime Minister Ho Quoc Dung"],
    ["11h35 – 11h40", "Response Remarks and Closing of VCSF 2026 Plenary Session", "Mr. Nguyen Quang Vinh, VCCI Vice Chairman, VBCSD Chairman"],
    ["11h40", "Luncheon", ""],
    S("BREAKOUT SESSION (13h30 – 16h30)"),
    ["13h15 – 13h30", "Guest registration", ""],
    ["13h30 – 16h30", "Topic 1: “Innovation: A launchpad for sustainable business growth”", ""],
    ["13h30 – 16h30", "Topic 2: “Green finance: Unlocking new sources of capital for sustainable business transformation”", ""],
    ["16h30", "Closing", ""],
  ] } },
  { vi: { tab: "Phiên chuyên đề", title: "Chương trình dự kiến Phiên chuyên đề", subtitle: "Diễn đàn Doanh nghiệp Phát triển Bền vững Việt Nam (VCSF) 2026", theme: "Tăng trưởng bứt phá – Phát triển bền vững: Hai mục tiêu, một hành trình", date: "13h15 – 16h20 · Thứ Hai, 05/10/2026", rows: [
    ["13h15 – 13h30", "Đăng ký đại biểu", ""],
    ["13h30 – 13h35", "Giới thiệu chương trình", ""],
    ["13h35 – 13h40", "Phát biểu khai mạc", "Bà Hà Thu Thanh, Chủ tịch Viện Thành viên Hội đồng Quản trị Việt Nam (VIOD), Ủy viên Ban chấp hành VCCI, Thành viên Ban điều hành Hội đồng Doanh nghiệp vì sự phát triển bền vững Việt Nam (VBCSD-VCCI)"],
    S("Phần 1: Đổi mới sáng tạo: Bệ phóng cho phát triển bền vững doanh nghiệp"),
    ["13h40 – 14h00", "Bài trình bày 1", "Diễn giả: TS. Nguyễn Đắc Bình Minh, Phó Viện trưởng, Viện Đổi mới sáng tạo Quốc gia, Bộ Khoa học và Công nghệ"],
    ["14h00 – 14h20", "Bài trình bày 2", "Diễn giả: Ông Trần Ngọc Nam – Giám đốc nhà máy, Công ty Cổ phần Mondelez Kinh Đô Việt Nam"],
    ["14h20 – 15h00", "Tọa đàm: “Thúc đẩy đổi mới sáng tạo trong chuyển đổi bền vững doanh nghiệp: Từ ý tưởng đến triển khai”", "Điều phối tọa đàm: Bà Huỳnh Thị Xuân Liên, Giám đốc cao cấp – Đối ngoại và Phát triển Bền vững, Công ty CP Vàng bạc đá quý Phú Nhuận (PNJ)\nDiễn giả:\nÔng Đỗ Tiến Thịnh – Phó Giám đốc Trung tâm Đổi mới sáng tạo Quốc gia (NIC)\nBà Đào Thúy Hà – Thành viên Hội đồng quản trị, Tổng Giám đốc - Công ty CP Traphaco\nÔng Pham Ngoc Khang - Giám đốc Chiến lược Kinh doanh và Trưởng Ban chỉ đạo ESG, Công ty Tài chính TNHH Một thành viên Home Credit Việt Nam\nÔng Arghya Mandal, Tổng Giám đốc, Công ty Cổ phần Sữa TH"],
    S("Phần 2: Tài chính xanh: Mở nguồn vốn mới cho doanh nghiệp chuyển đổi bền vững"),
    ["15h00 – 15h20", "Bài trình bày 1: “Khơi thông dòng vốn cho chuyển đổi xanh: Các công cụ tài chính và điều kiện tiếp cận đối với doanh nghiệp”", "Diễn giả: Bà Lê Mai, Giám đốc Quan hệ Khách hàng kiêm Giám đốc Phụ trách Tài chính bền vững, Ngân hàng Standard Chartered Bank Việt Nam"],
    ["15h20 – 15h40", "Bài trình bày 2: “Từ nhu cầu chuyển đổi xanh đến nhu cầu vốn: Doanh nghiệp cần chuẩn bị gì để trở có thể tiếp cận nguồn vốn?”", "Diễn giả: Ông Phạm Tuấn Anh, Giám đốc Phát triển bền vững, Tập đoàn GREENFEED"],
    ["15h40 – 16h20", "Tọa đàm: “Từ tham vọng xanh đến nguồn vốn xanh: Làm thế nào để doanh nghiệp tiếp cận nguồn vốn cho chuyển đổi bền vững hiệu quả hơn?”", "Điều phối viên: TS. Nguyễn Minh Thảo, Phó Trưởng ban phụ trách, Ban Phát triển doanh nghiệp và Môi trường kinh doanh, Viện Chiến lược và Chính sách kinh tế - tài chính (Bộ Tài chính)\nDiễn giả:\nÔng Nirukt Sapru, Chủ tịch Tập đoàn Jardine Matheson tại Việt Nam\nÔng Phạm Tuấn Anh, Giám đốc Phát triển bền vững, Tập đoàn GREENFEED\nBà Lê Mai, Giám đốc Quan hệ Khách hàng kiêm Giám đốc Phụ trách Tài chính bền vững, Ngân hàng Standard Chartered Bank Việt Nam\nÔng Phạm Hoàng Hải, Giám đốc phụ trách đối tác doanh nghiệp, Tổ chức WWF-Việt Nam"],
    ["16h20", "Bế mạc", ""],
  ] }, en: { tab: "Thematic session", title: "Tentative agenda – Thematic session", subtitle: "Vietnam Corporate Sustainability Forum (VCSF) 2026", theme: "Accelerating growth – Advancing sustainability: Two goals, one shared journey", date: "13:15 – 16:20 · Monday, 5 October 2026", rows: [
    ["13:15 – 13:30", "Delegate Registration", ""],
    ["13:30 – 13:35", "Introduction to the Programme", ""],
    ["13:35 – 13:40", "Opening Remarks", "Ms. Ha Thu Thanh, Vietnam Institute of Director Chairperson, VCCI Executive Committee Member, Executive Board Member of Vietnam Business Council for Sustainable Development (VBCSD-VCCI)"],
    S("Part 1: “Innovation - A Catalyst for Sustainable Business Growth”"),
    ["13:40 – 14:00", "Presentation 1", "Speaker: Dr. Nguyen Dac Binh Minh, Deputy Director, National Academy for Advanced Technology and Innovation – Ministry of Science and Technology"],
    ["14:00 – 14:20", "Presentation 2", "Speaker: Mr. Tran Ngoc Nam, Plant Director, Mondelez Kinh Do Vietnam Joint Stock Company"],
    ["14:20 – 15:00", "Panel Discussion: “Fostering Innovation for Sustainable Business Transformation: From Ideas to Implementation”", "Moderator: Ms. Huynh Thi Xuan Lien, Senior Director – External Affairs and Sustainability, Phu Nhuan Jewelry Joint Stock Company (PNJ)\nSpeakers:\nMr. Do Tien Thinh – Deputy Director Vietnam National Innovation Center (NIC)\nMs. Dao Thuy Ha – Member of the Board of Directors, General Director - Traphaco JSC\nMr. Pham Ngoc Khang - Chief Strategy Officer & Chairperson of ESG Steering Group, Home Credit Vietnam Finance Company Limited\nMr. Arghya Mandal, General Director, TH Milk Joint Stock Company"],
    S("Part 2: “Green Finance: Unlocking New Sources of Capital for Sustainable Business Transformation”"),
    ["15:00 – 15:20", "Presentation 1: “Unlocking Capital for Green Transformation: Financial Instruments and Access Requirements for Businesses”", "Speaker: Ms. Le Mai, Director, Relationship Management cum Sustainable Finance Country Lead, Standard Chartered Bank Vietnam"],
    ["15:20 – 15:40", "Presentation 2: “From Green Transformation Needs to Capital Needs: What Do Businesses Need to Prepare to Become ‘Finance-Ready’?”", "Speaker: Mr. Pham Tuan Anh, Sustainability Director, GREENFEED Group"],
    ["15:40 – 16:20", "Panel Discussion: “From Green Ambitions to Green Capital: How Can Businesses Access Capital More Effectively for Sustainable Transformation?”", "Moderator: Dr. Nguyen Minh Thao, Deputy Head in charge of the Business Development and Business Environment Division at the National Institute for Economics and Finance (Ministry of Finance of Vietnam)\nSpeakers:\nMr. Nirukt Sapru, Country Chairman for Vietnam – Jardine Matheson\nMr. Pham Tuan Anh, Sustainability Director, GREENFEED Group\nMs. Le Mai, Director, Relationship Management cum Sustainable Finance Country Lead, Standard Chartered Bank Vietnam\nMr. Pham Hoang Hai, Corporate Partnership Head, WWF-Vietnam"],
    ["16:20", "Closing", ""],
  ] } },
];
