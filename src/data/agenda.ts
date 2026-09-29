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
  { vi: { tab: 'Khung chương trình tổng thể', title: 'Chương trình dự kiến', subtitle: 'Diễn đàn Doanh nghiệp Phát triển Bền vững Việt Nam 2026', theme: 'Tăng trưởng bứt phá – Phát triển bền vững: Hai mục tiêu, một hành trình', date: 'Thứ Hai, 05/10/2026 · Phòng Sông Hồng, Khách sạn Sheraton Hà Nội', rows: [
    S('PHIÊN TOÀN THỂ (7h45 – 11h30)'),
    ['7h45 – 8h15', 'Đăng ký đại biểu', ''],
    ['8h15 – 8h20', 'Video clip', ''],
    ['8h20 – 8h30', 'Giới thiệu chương trình và khách mời', ''],
    ['8h30 – 8h40', 'Phát biểu khai mạc', 'Ông Hồ Sỹ Hùng, Chủ tịch Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI)'],
    ['8h40 – 8h55', 'Tham luận 1: “Đổi mới mô hình phát triển của Việt Nam: Từ mục tiêu tăng trưởng hai con số đến vai trò của doanh nghiệp kinh doanh bền vững”', 'Diễn giả: GS. TS. Nguyễn Xuân Thắng, Ủy viên Bộ Chính trị khóa XIII, Chủ tịch Hội đồng Lý luận Trung ương'],
    ['8h55 – 9h10', 'Bài trình bày 2: “Nâng cao năng suất, thúc đẩy đổi mới sáng tạo hướng tới nền kinh tế tự cường, bền vững: Khuyến nghị cho Việt Nam”', 'Diễn giả: Ông Bùi Minh Giáp, Chuyên gia Kinh tế trưởng, Ngân hàng Phát triển Châu Á (ADB)'],
    ['9h10 – 9h25', 'Tham luận 3: “Đồng kiến tạo tăng trưởng bền vững: Vai trò của địa phương trong hiện thực hóa mục tiêu quốc gia”', 'Diễn giả: Ông Bùi Văn Khắng, Phó Bí thư Thành ủy, Chủ tịch UBND Thành phố Quảng Ninh'],
    ['9h25 – 9h40', 'Bài trình bày 4: “Kiến tạo lợi thế cạnh tranh cho Việt Nam — Hành trình từ nông trại vươn ra thế giới”', 'Diễn giả: Ông Binu Jacob, Tổng giám đốc Nestlé Việt Nam, Đồng Chủ tịch VBCSD'],
    ['9h40 – 9h55', 'Bài trình bày 5: “Từ tăng trưởng của doanh nghiệp đến tăng trưởng của quốc gia: Đòn bẩy từ thực hành kinh doanh có trách nhiệm”', 'Diễn giả: Ông James Crampton, Giám đốc Ngoại vụ cấp cao, Công ty HEINEKEN Việt Nam, Phó Chủ tịch VBCSD'],
    ['9h55 – 10h10', 'Bài trình bày 6: “Đột phá trong ứng dụng khoa học công nghệ và đổi mới sáng tạo trong hoạt động kinh doanh bền vững tại doanh nghiệp”', 'Diễn giả: Ông Lê Hoàng Minh, Giám đốc điều hành Sản xuất, Công ty CP Sữa Việt Nam (Vinamilk)'],
    ['10h10 – 11h05', 'Thảo luận cấp cao: “Chính sách kết nối – Doanh nghiệp đồng hành: Hướng tới nền kinh tế tự cường, bền vững”', 'Thành phần diễn giả (dự kiến):\nCục Môi trường - Bộ Nông nghiệp và Môi trường\nTS. Nguyễn Đắc Bình Minh, Phó Viện trưởng, Viện Đổi mới sáng tạo Quốc gia – Bộ Khoa học và Công nghệ\nBà Nguyễn Thị Thu Hằng, Giám đốc Đối ngoại khu vực Mekong, Tập đoàn Maersk\nÔng Lê Hùng Cường, Tổng giám đốc FPT Digital, Tập đoàn FPT\nÔng Lee Chio Lim Larry, Phó Tổng giám đốc phụ trách Tài sản Chiến lược, SABECO\nBà Beate Dippmar, Giám đốc khối các chương trình về giáo dục nghề nghiệp, thị trường lao động và chuyển dịch lao động, Tổ chức GIZ\nĐiều phối viên: Bà Trần Thúy Ngọc, Phó Tổng giám đốc Deloitte Việt Nam, Phó Chủ tịch VBCSD'],
    ['11h05 – 11h30', 'Phát biểu chỉ đạo', 'Phó Thủ tướng Chính phủ Hồ Quốc Dũng'],
    ['11h30 – 11h40', 'Phát biểu tiếp thu và bế mạc Phiên toàn thể VCSF 2026', 'Lãnh đạo VCCI'],
    ['11h40', 'Tiệc trưa', ''],
    S('PHIÊN CHUYÊN ĐỀ (13h30 – 15h45)'),
    ['13h15 – 13h30', 'Đăng ký đại biểu', ''],
    ['13h30 – 15h45', 'Chủ đề 1: “Đổi mới sáng tạo: Bệ phóng cho phát triển bền vững doanh nghiệp”', ''],
    ['13h30 – 15h45', 'Chủ đề 2: “Tài chính xanh: Mở nguồn vốn mới cho doanh nghiệp chuyển đổi bền vững”', ''],
    ['15h45 – 16h00', 'Bốc thăm trúng thưởng', ''],
  ] }, en: { tab: 'Overall programme', title: 'Tentative agenda', subtitle: 'Vietnam Corporate Sustainability Forum 2026', theme: 'Accelerating growth – Advancing sustainability: Two goals, one shared journey', date: 'Monday, 5 October 2026 · Hong River Ballroom, Sheraton Hanoi Hotel', rows: [
    S('PLENARY SESSION (7h45 – 11h30)'),
    ['7h45 – 8h15', 'Guest registration', ''],
    ['8h15 – 8h20', 'Video clip', ''],
    ['8h20 – 8h30', 'Agenda and guest introduction', ''],
    ['8h30 – 8h40', 'Opening Remarks', 'Mr. Ho Sy Hung, Chairman of the Vietnam Chamber of Commerce and Industry (VCCI)'],
    ['8h40 – 8h55', 'Presentation 1: “Transforming Viet Nam’s development model: From the double-digit growth target to the role of sustainable businesses”', 'Speaker: Prof. Dr. Nguyen Xuan Thang, Member of the 13th Politburo, Chairman of the Central Theoretical Council'],
    ['8h55 – 9h10', 'Presentation 2: “Enhancing productivity and fostering innovation towards a self-reliant, sustainable economy: Recommendations for Viet Nam”', 'Speaker: Mr. Bui Minh Giap, Principal Economist, Asian Development Bank - Vietnam'],
    ['9h10 – 9h25', 'Presentation 3: “Co-creating sustainable growth: Role of localities in realizing national goals”', 'Speaker: Mr. Bui Van Khang, Deputy Secretary of Quang Ninh Provincial Party Committee and Chairman of Quang Ninh Provincial People\'s Committee'],
    ['9h25 – 9h40', 'Presentation 4: “Building Vietnam\'s Competitive Advantage from Farm to World”', 'Speaker: Mr. Binu Jacob, CEO of Nestlé Vietnam, VBCSD Co-Chair'],
    ['9h40 – 9h55', 'Presentation 5: “From business growth to national growth: Impetus from responsible business practices”', 'Speaker: Mr. James Crampton, Corporate Affairs Director of HEINEKEN Vietnam, VBCSD Vice-Chair'],
    ['9h55 – 10h10', 'Presentation 6: “Breakthroughs in the application of science, technology and innovation in sustainable business practices”', 'Speaker: Mr. Le Hoang Minh, Executive Director – Production, Vinamilk'],
    ['9h55 – 10h55', 'High-Level Dialogue: “Policy and Business in Partnership: Advancing a Self-Reliant and Sustainable Economy”', 'Tentative panelists:\nEnvironmental Agency – Ministry of Agriculture and Environment\nDr. Nguyen Dac Binh Minh, Deputy Director, National Academy for Advanced Technology and Innovation – Ministry of Science and Technology\nMs. Nguyen Thi Thu Hang, Regional Head of Government and Public Affairs, Mekong Area, A.P. Moller – Maersk\nMr. Le Hung Cuong, CEO of FPT Digital, FPT Group\nMr. Lee Chio Lim Larry, Deputy General Director in charge of Strategic Assets\nMs. Beate Dippmar, Cluster Coordinator TVET, Labour Market and Labour Mobility; Programme Manager ‘Programme Reform of TVET in Viet Nam – GIZ Viet Nam\nModerator: Ms. Tran Thuy Ngoc, Deputy CEO of Deloitte Vietnam, Vice Chair of VBCSD'],
    ['10h55 – 11h15', 'Keynote speech', 'Deputy Prime Minister Ho Quoc Dung'],
    ['11h15 – 11h30', 'Closing and Response Remarks – VCSF 2026 Plenary Session', 'Leader of VCCI'],
    ['11h30', 'Luncheon', ''],
    S('BREAKOUT SESSION (13h30 – 15h45)'),
    ['13h15 – 13h30', 'Guest registration', ''],
    ['13h30 – 15h45', 'Topic 1: “Innovation: A launchpad for sustainable business growth”', ''],
    ['13h30 – 15h45', 'Topic 2: “Green finance: Unlocking new sources of capital for sustainable business transformation”', ''],
    ['15h45 – 16h00', 'Lucky draw', ''],
  ] } },
  { vi: { tab: 'Phiên chuyên đề', title: 'Chương trình dự kiến Phiên chuyên đề', subtitle: 'Diễn đàn Doanh nghiệp Phát triển Bền vững Việt Nam (VCSF) 2026', theme: 'Tăng trưởng bứt phá – Phát triển bền vững: Hai mục tiêu, một hành trình', date: '13h15 – 16h40 · Thứ Hai, 05/10/2026', rows: [
    ['13h15 – 13h30', 'Đăng ký đại biểu', ''],
    ['13h30 – 13h35', 'Giới thiệu chương trình', ''],
    ['13h35 – 13h40', 'Phát biểu khai mạc', 'Đại diện Ban Điều hành VBCSD-VCCI'],
    S('Phần 1: Đổi mới sáng tạo: Bệ phóng cho phát triển bền vững doanh nghiệp'),
    ['13h40 – 14h00', 'Bài trình bày 1: Đại diện Cục Khoa học, Công nghệ và Chuyển đổi số - Bộ Công thương (dự kiến)', 'Đề xuất nội dung:\nCập nhật khung khổ chính sách trong nước về đổi mới sáng tạo\nĐổi mới sáng tạo là tất yếu để phát triển bền vững doanh nghiệp'],
    ['14h00 – 14h20', 'Bài trình bày 2: Đại diện Công ty Cổ phần Mondelez Kinh Đô Việt Nam (dự kiến)', 'Đề xuất nội dung:\nChuyển đổi, ứng dụng công nghệ số để tối ưu nguồn lực/nâng cao năng suất/giảm phát thải/giảm chất thải\nĐổi mới quy trình sản xuất/Xây dựng chuỗi cung ứng bền vững/Đổi mới sản phẩm góp phần chia sẻ giá trị lợi ích cho cộng đồng, xã hội'],
    ['14h20 – 15h00', 'Tọa đàm: “Thúc đẩy đổi mới sáng tạo trong chuyển đổi bền vững doanh nghiệp: Từ ý tưởng đến triển khai”', 'Điều phối tọa đàm:\nBà Huỳnh Thị Xuân Liên, Giám đốc cao cấp – Đối ngoại và Phát triển Bền vững, Công ty CP vàng bạc đá quý Phú Nhuận – PNJ\nCác diễn giả (dự kiến): đại diện đến từ tổ chức, doanh nghiệp\nTrung tâm Đổi mới sáng tạo Quốc gia (NIC)\nCông ty Cổ phần Tập đoàn PAN/ Công ty CP Traphaco\nCông ty TNHH AEON Việt Nam\nCông ty Tài chính TNHH Một thành viên Home Credit Việt Nam\nĐề xuất nội dung:\nXây dựng văn hóa đổi mới, sáng tạo trong doanh nghiệp; cơ chế khuyến khích và quản trị rủi ro cho các sáng kiến mới;\nNhững vấn đề liên quan tới đầu tư cho đổi mới sáng tạo\nCân bẳng giữa chỉ tiêu kinh tế ngắn hạn và giá trị bền vững dài hạn\nMô hình thành công từ đổi mới sáng tạo tại doanh nghiệp'],
    S('Phần 2: Tài chính xanh: Mở nguồn vốn mới cho doanh nghiệp chuyển đổi bền vững'),
    ['15h00 – 15h20', 'Bài trình bày 1: “Khơi thông dòng vốn cho chuyển đổi xanh: Các công cụ tài chính và điều kiện tiếp cận đối với doanh nghiệp”', 'Diễn giả: Đại diện Ngân hàng TMCP Phát triển Tp.Hồ Chí Minh (HDBank) – đề xuất: Ông Văn Công Bình, Giám đốc môi trường và xã hội/Ngân hàng Doanh nghiệp\nĐề xuất nội dung:\nGiới thiệu/làm rõ một số công cụ tài chính tiêu biểu/nổi bật nhất mà các doanh nghiệp chuyển đổi bền vững cần lưu ý để tiếp cận sao cho phù hợp với nhu cầu thực tế của DN (vd: Khi nào nên sử dụng green loan, green bond, sustainability-linked finance hay transition finance?...)\nĐưa ra góc nhìn từ yêu cầu của ngân hàng/tổ chức tín dụng: đâu là những DN có thể dễ dàng tiếp cận nguồn tài chính chuyển đổi, từ đó đưa ra khuyến nghị liên quan cho DN'],
    ['15h20 – 15h40', 'Bài trình bày 2: “Từ nhu cầu chuyển đổi xanh đến nhu cầu vốn: Doanh nghiệp cần chuẩn bị gì để trở nên ‘finance-ready’?”', 'Diễn giả: Công ty CP Greenfeed Việt Nam\nĐề xuất nội dung:\nChia sẻ kinh nghiệm cụ thể của DN trong việc tiếp cận và triển khai thành công các khoản tài chính/ vốn đầu tư hỗ trợ hoạt động sản xuất-kinh doanh của doanh nghiệp\nĐưa ra khuyến nghị: doanh nghiệp cần chuẩn bị gì để có thể tiếp cận nguồn vốn phù hợp'],
    ['15h40 – 16h20', 'Tọa đàm: “Từ tham vọng xanh đến nguồn vốn xanh: Làm thế nào để doanh nghiệp tiếp cận nguồn vốn cho chuyển đổi bền vững hiệu quả hơn?”', 'Diễn giả (dự kiến):\nĐại diện Công ty Cổ phần Tập đoàn PAN/ Công ty CP Greenfeed Việt Nam\nĐại diện Jardine Matheson\nĐại diện Ngân hàng TMCP Phát triển Tp.Hồ Chí Minh (HDBank) – đề xuất: Ông Văn Công Bình, Giám đốc môi trường và xã hội/Ngân hàng Doanh nghiệp\nWWF\nĐiều phối viên: Viện Chiến lược và Chính sách kinh tế - tài chính (Bộ Tài chính)\nĐề xuất nội dung:\nThị trường tài chính xanh Việt Nam đang chuyển từ xây dựng nền tảng chính sách sang huy động và phân bổ vốn như thế nào?\nDoanh nghiệp cần chuẩn bị những dữ liệu/tài liệu gì trước khi tiếp cận ngân hàng hoặc nhà đầu tư?\nYếu tố nào tạo ra khác biệt giữa một \'green idea\' và một dự án có thể được tài trợ?\nNhà đầu tư cần những bằng chứng nào để đánh giá tính khả thi, rủi ro và tác động của dự án?\nGreen Taxonomy và ESG data đang được sử dụng như thế nào trong quá trình thẩm định và ra quyết định tài chính?\nLàm thế nào để ESG reporting trở thành công cụ hỗ trợ tiếp cận vốn thay vì chỉ là một yêu cầu tuân thủ?'],
    ['16h20 – 16h40', 'Bốc thăm trúng thưởng', 'Bế mạc'],
  ] }, en: { tab: 'Breakout session', title: 'Tentative agenda – Breakout session', subtitle: 'Vietnam Corporate Sustainability Forum (VCSF) 2026', theme: 'Accelerating growth – Advancing sustainability: Two goals, one shared journey', date: '13h15 – 16h40 · Monday, 5 October 2026', note: 'Unofficial translation — the official English agenda for this session has not been provided yet. Please refer to the Vietnamese version.', rows: [
    ['13h15 – 13h30', 'Guest registration', ''],
    ['13h30 – 13h35', 'Programme introduction', ''],
    ['13h35 – 13h40', 'Opening remarks', 'Representative of the VBCSD-VCCI Executive Board'],
    S('Part 1: Innovation: A launchpad for sustainable business growth'),
    ['13h40 – 14h00', 'Presentation 1: Representative of the Agency of Science, Technology and Digital Transformation – Ministry of Industry and Trade (tentative)', 'Proposed content:\nUpdate on the domestic policy framework for innovation\nInnovation as a necessity for sustainable business development'],
    ['14h00 – 14h20', 'Presentation 2: Representative of Mondelez Kinh Do Vietnam JSC (tentative)', 'Proposed content:\nDigital transformation and technology adoption to optimise resources, raise productivity and reduce emissions and waste\nInnovating production processes, building sustainable supply chains and innovating products to share value with communities and society'],
    ['14h20 – 15h00', 'Panel discussion: “Driving innovation in corporate sustainability transformation: From idea to implementation”', 'Moderator:\nMs. Huynh Thi Xuan Lien, Senior Director – External Affairs and Sustainable Development, Phu Nhuan Jewelry JSC – PNJ\nTentative speakers: representatives of organisations and businesses\nNational Innovation Center (NIC)\nPAN Group JSC / Traphaco JSC\nAEON Vietnam Co., Ltd.\nHome Credit Vietnam Finance Company Limited\nProposed content:\nBuilding a culture of innovation within businesses; incentive mechanisms and risk management for new initiatives;\nIssues related to investment in innovation\nBalancing short-term economic targets with long-term sustainable value\nSuccessful business models driven by innovation'],
    S('Part 2: Green finance: Unlocking new sources of capital for sustainable business transformation'),
    ['15h00 – 15h20', 'Presentation 1: “Unlocking capital for the green transition: Financial instruments and access conditions for businesses”', 'Speaker: Representative of Ho Chi Minh City Development Joint Stock Commercial Bank (HDBank) – proposed: Mr. Van Cong Binh, Director of Environment and Social / Corporate Banking\nProposed content:\nIntroducing and clarifying the most prominent financial instruments that businesses in sustainability transition should consider, matched to their actual needs (e.g. when to use a green loan, green bond, sustainability-linked finance or transition finance?)\nThe perspective of banks and credit institutions: which businesses can most easily access transition finance, and related recommendations for businesses'],
    ['15h20 – 15h40', 'Presentation 2: “From green transition needs to capital needs: What must businesses prepare to become ‘finance-ready’?”', 'Speaker: Greenfeed Vietnam JSC\nProposed content:\nSharing concrete experience in accessing and successfully deploying financing and investment capital to support production and business operations\nRecommendations: what businesses need to prepare to access suitable capital'],
    ['15h40 – 16h20', 'Panel discussion: “From green ambition to green capital: How can businesses access finance for sustainable transformation more effectively?”', 'Tentative speakers:\nRepresentative of PAN Group JSC / Greenfeed Vietnam JSC\nRepresentative of Jardine Matheson\nRepresentative of Ho Chi Minh City Development Joint Stock Commercial Bank (HDBank) – proposed: Mr. Van Cong Binh, Director of Environment and Social / Corporate Banking\nWWF\nModerator: Institute of Economic and Financial Strategy and Policy (Ministry of Finance)\nProposed content:\nHow is Vietnam’s green finance market moving from building a policy foundation to mobilising and allocating capital?\nWhat data and documents should businesses prepare before approaching banks or investors?\nWhat distinguishes a ‘green idea’ from a bankable project?\nWhat evidence do investors need to assess a project’s feasibility, risks and impact?\nHow are the Green Taxonomy and ESG data being used in appraisal and financing decisions?\nHow can ESG reporting become a tool for accessing capital rather than merely a compliance requirement?'],
    ['16h20 – 16h40', 'Lucky draw', 'Closing'],
  ] } },
];
