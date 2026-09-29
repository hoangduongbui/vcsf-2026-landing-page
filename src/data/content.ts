// UI copy (VI/EN) and live-stream settings — copied verbatim from the design reference.

export type Locale = 'vi' | 'en'

export const LIVE = {
  start: '2026-10-05T07:30:00+07:00', end: '2026-10-05T17:30:00+07:00',
  vi: { badge: 'Đang phát trực tiếp', aria: 'Phát trực tiếp VCSF 2026', title: 'Theo dõi trực tiếp Diễn đàn VCSF 2026', desc: 'Toàn bộ phiên toàn thể và các phiên chuyên đề được phát trực tiếp trên kênh YouTube của VBCSD.', time: '8:00 – 17:00 · Thứ Hai, 05/10/2026', venue: 'Khách sạn Sheraton Hanoi West Lake, Hà Nội', open: 'Xem trên YouTube', cta: 'Xem trực tiếp sự kiện', soon: 'Luồng phát trực tiếp sẽ bắt đầu lúc 8:00' },
  en: { badge: 'Live now', aria: 'VCSF 2026 live stream', title: 'Watch VCSF 2026 live', desc: 'The plenary and all breakout sessions are streamed live on the VBCSD YouTube channel.', time: '8:00 – 17:00 · Monday, 5 October 2026', venue: 'Sheraton Hanoi West Lake Hotel, Hanoi', open: 'Watch on YouTube', cta: 'Watch the event live', soon: 'The live stream starts at 8:00' },
};

/** Extract a YouTube video id from a URL or bare id. */
export const ytId = (u: string): string => { if (!u) return ''; const m = String(u).match(/(?:youtu\.be\/|v=|\/live\/|\/embed\/)([\w-]{11})/); return m ? m[1] : (/^[\w-]{11}$/.test(u.trim()) ? u.trim() : ''); };

export const L = {
  vi: {
    eyebrow: 'VÌ MỘT VIỆT NAM THỊNH VƯỢNG VÀ BỀN VỮNG',
    heroLine: 'DIỄN ĐÀN DOANH NGHIỆP PHÁT TRIỂN BỀN VỮNG VIỆT NAM 2026',
    theme: 'Tăng trưởng bứt phá – Phát triển bền vững:', themeSecond: 'Hai mục tiêu, một hành trình',
    eventDate: 'Hà Nội, 05/10/2026', countdownBefore: 'Sự kiện sẽ diễn ra trong', countdownAfter: 'ngày',
    countdownToday: 'Sự kiện diễn ra hôm nay', countdownEnded: 'Sự kiện đã kết thúc',
    menu: 'Mở menu', closeMenu: 'Đóng menu', home: 'Trang chủ',
    history: 'VCSF qua các năm', historyKicker: 'DẤU ẤN QUA TỪNG NĂM',
    historyIntro: 'Một hành trình đối thoại, kết nối và thúc đẩy hành động vì phát triển bền vững.', historyOpen: 'Tìm hiểu thêm',
    about: 'Giới thiệu chung',
    aboutParagraphs: [
      'Được tổ chức thường niên từ năm 2014 bởi Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) thông qua đầu mối là Hội đồng Doanh nghiệp vì sự phát triển bền vững Việt Nam (VBCSD), Diễn đàn Doanh nghiệp Phát triển Bền vững Việt Nam (VCSF) là sự kiện trao đổi, đối thoại hiệu quả giữa các cơ quan quản lý nhà nước, các tổ chức đối tác trong nước, quốc tế và cộng đồng doanh nghiệp về các định hướng và thực tiễn phát triển bền vững.',
      'Trải qua hơn 10 năm tổ chức, VCSF đã luôn nhận được sự quan tâm, đánh giá cao của lãnh đạo Đảng, Nhà nước, thu hút sự tham gia của đại diện các cơ quan, tổ chức trong nước và quốc tế cùng đông đảo cộng đồng doanh nghiệp. Các kỳ Diễn đàn VCSF đã đóng góp nhiều kiến nghị có giá trị, làm đầu vào cho các chính sách quan trọng về thúc đẩy phát triển bền vững doanh nghiệp đã được Chính phủ ban hành trong những năm qua.',
      'Năm 2026, Diễn đàn VCSF với chủ đề “Tăng trưởng bứt phá – Phát triển bền vững: Hai mục tiêu, một hành trình” sẽ được tổ chức vào:\nThời gian: 8:00 – 17:00 ngày 05 tháng 10 năm 2026 (thứ Hai)\nĐịa điểm: Phòng Hội nghị Khách sạn Sheraton Tây Hồ, Hà Nội',
      '',
    ],
    aboutImageAlt: 'Minh họa ý niệm về không gian diễn đàn và kiến trúc bền vững', aboutImageNote: 'Hình minh họa ý niệm · VCSF 2026',
    speakers: 'Diễn giả', spUpdating: 'Đang cập nhật', spDraft: 'NHÁP', speakerBio: 'Tiểu sử', speakerClose: 'Đóng tiểu sử', speakerPrev: 'Diễn giả trước', speakerNext: 'Diễn giả tiếp theo', speakerSearch: 'Tìm diễn giả theo tên', speakerNone: 'Không tìm thấy diễn giả phù hợp.',
    agenda: 'Khung chương trình', agendaArchive: 'Chương trình VCSF 2025 dự kiến, có thể thay đổi · Nội dung 2026 sẽ được cập nhật',
    agendaTime: 'Thời gian', agendaActivity: 'Nội dung', agendaSpeaker: 'Diễn giả / Đơn vị',
    library: 'Thư viện', libraryAside: 'NHỮNG KHOẢNH KHẮC LAN TỎA CẢM HỨNG', libraryAlbumLink: 'Album ảnh', libraryVideoList: 'Danh sách Video',
    documents: 'Tài liệu', documentsAside: 'TRI THỨC KIẾN TẠO HÀNH ĐỘNG', documentsOpen: 'Mở thư mục', download: 'Tải xuống', close: 'Đóng', expand: 'Phóng to',
    libraryPhotos: 'Ảnh', libraryVideos: 'Video', videoSoon: 'Đang cập nhật',
    docs: ['Phiên toàn thể', 'Hội thảo 01', 'Hội thảo 02'],
    partners: 'Đối tác đồng hành', tiers: ['Nhà tài trợ Chiến lược', 'Nhà tài trợ Bạch Kim', 'Nhà tài trợ Vàng', 'Nhà tài trợ Đồng'],
    address: 'Tầng 4, số 9 Đào Duy Anh, Phường Kim Liên, Hà Nội', social: 'Mạng xã hội',
    copyright: 'Bản quyền 2026', council: 'Hội đồng Doanh nghiệp vì sự Phát triển Bền vững Việt Nam (VBCSD)',
    developed: 'Phát triển bởi Hemera Media & Hemera Tech',
  },
  en: {
    eyebrow: 'FOR A PROSPEROUS AND SUSTAINABLE VIETNAM',
    heroLine: 'VIETNAM CORPORATE SUSTAINABILITY FORUM 2026',
    theme: 'Accelerating growth – Sustainable development:', themeSecond: 'Two goals, one journey',
    eventDate: 'Hanoi, 05 October 2026', countdownBefore: 'The event begins in', countdownAfter: 'days',
    countdownToday: 'The event is today', countdownEnded: 'The event has ended',
    menu: 'Open menu', closeMenu: 'Close menu', home: 'Home',
    history: 'VCSF through the years', historyKicker: 'A LEGACY IN MOTION',
    historyIntro: 'A continuing journey of dialogue, connection and action for sustainable development.', historyOpen: 'Learn more',
    about: 'About the forum',
    aboutParagraphs: [
      'Held annually since 2014 by the Vietnam Chamber of Commerce and Industry (VCCI) through its focal point, the Vietnam Business Council for Sustainable Development (VBCSD), the Vietnam Corporate Sustainability Forum (VCSF) is an effective platform for exchange and dialogue between state management agencies, domestic and international partner organisations and the business community on sustainable development directions and practices.',
      'Over more than 10 years, VCSF has consistently received the attention and high appreciation of Party and State leaders, attracting representatives of domestic and international agencies and organisations as well as a large business community. Each edition of the Forum has contributed many valuable recommendations, serving as input for important policies promoting corporate sustainable development issued by the Government in recent years.',
      'In 2026, the VCSF, themed “Accelerating growth – Advancing sustainability: Two goals, one shared journey”, will be held on:\nTime: 8:00 – 17:00, Monday, 5 October 2026\nVenue: Conference Hall, Sheraton Hanoi West Lake Hotel, Hanoi',
      'The Forum is expected to comprise a Plenary Session in the morning and breakout sessions in the afternoon, focusing on issues of major importance to Vietnam’s development in the new period, such as: promoting economic growth coupled with higher productivity; renewing the growth model and business models; fostering innovation and the green transition; and improving resource efficiency and business competitiveness.',
    ],
    aboutImageAlt: 'Conceptual illustration of a forum venue and sustainable architecture', aboutImageNote: 'Concept illustration · VCSF 2026',
    speakers: 'Speakers', spUpdating: 'Updating', spDraft: 'DRAFT', speakerBio: 'Biography', speakerClose: 'Close biography', speakerPrev: 'Previous speaker', speakerNext: 'Next speaker', speakerSearch: 'Search speakers by name', speakerNone: 'No matching speakers found.',
    agenda: 'Programme', agendaArchive: 'Tentative VCSF 2025 programme for reference · 2026 details to be updated',
    agendaTime: 'Time', agendaActivity: 'Session', agendaSpeaker: 'Speaker / Organisation',
    library: 'Library', libraryAside: 'MOMENTS THAT INSPIRE CHANGE', libraryAlbumLink: 'Photo album', libraryVideoList: 'Video list',
    documents: 'Documents', documentsAside: 'KNOWLEDGE THAT DRIVES ACTION', documentsOpen: 'Open folder', download: 'Download', close: 'Close', expand: 'Expand',
    libraryPhotos: 'Photos', libraryVideos: 'Videos', videoSoon: 'Updating',
    docs: ['Plenary session', 'Workshop 01', 'Workshop 02'],
    partners: 'Our partners', tiers: ['Strategic Sponsors', 'Platinum Sponsors', 'Gold Sponsors', 'Bronze Sponsors'],
    address: '4th floor, 9 Dao Duy Anh Street, Kim Lien Ward, Hanoi', social: 'Social media',
    copyright: 'Copyright 2026', council: 'Vietnam Business Council for Sustainable Development (VBCSD)',
    developed: 'Developed by Hemera Tech & Hemera Media',
  },
} as const

export type Strings = (typeof L)[Locale]

// --- SDG strip (under the hero) ---
// Display order i = SDG i+1. SDG_FILE[i] is the icon file number for that goal.
/** Brand colour per icon file (index = file number - 1). */
export const SDG_COLOR = ["#FE7B34","#009937","#01C2DA","#FDA100","#BE0840","#FD4C04","#FF0078","#FF8800","#F87A09","#03CBE3","#71CF5E","#125D8C","#2B8CBB","#3E7F45","#FF354B","#CF041D","#FF1E3F"];
export const SDG_FILE = [15, 1, 2, 16, 17, 3, 4, 5, 6, 7, 8, 9, 14, 10, 11, 13, 12];
/** Optical-size factor per icon file (/60), keeps the artwork visually even. */
export const SDG_SCALE = [64, 69, 68, 64, 69, 60, 77, 68, 83, 83, 64, 60, 84, 84, 80, 72, 82];
export const SDG_TEXT: Record<Locale, [string, string][]> = {
  vi: [['Xóa nghèo', 'Chấm dứt mọi hình thức nghèo ở mọi nơi.'], ['Không còn nạn đói', 'Xóa đói, bảo đảm an ninh lương thực, cải thiện dinh dưỡng và thúc đẩy nông nghiệp bền vững.'], ['Sức khỏe và cuộc sống tốt', 'Bảo đảm cuộc sống khỏe mạnh và nâng cao phúc lợi cho mọi người ở mọi lứa tuổi.'], ['Giáo dục có chất lượng', 'Bảo đảm giáo dục có chất lượng, công bằng, toàn diện và cơ hội học tập suốt đời.'], ['Bình đẳng giới', 'Đạt được bình đẳng giới, trao quyền cho phụ nữ và trẻ em gái.'], ['Nước sạch và vệ sinh', 'Bảo đảm đầy đủ và quản lý bền vững tài nguyên nước và hệ thống vệ sinh.'], ['Năng lượng sạch, giá hợp lý', 'Bảo đảm tiếp cận năng lượng bền vững, đáng tin cậy và có khả năng chi trả.'], ['Việc làm tốt và tăng trưởng kinh tế', 'Thúc đẩy tăng trưởng kinh tế bền vững, bao trùm và việc làm đầy đủ, thỏa đáng.'], ['Công nghiệp, đổi mới và hạ tầng', 'Xây dựng hạ tầng bền vững, thúc đẩy công nghiệp hóa bao trùm và đổi mới sáng tạo.'], ['Giảm bất bình đẳng', 'Giảm bất bình đẳng trong mỗi quốc gia và giữa các quốc gia.'], ['Thành phố và cộng đồng bền vững', 'Phát triển đô thị, nông thôn an toàn, bền vững và có khả năng chống chịu.'], ['Tiêu dùng và sản xuất có trách nhiệm', 'Bảo đảm mô hình sản xuất và tiêu dùng bền vững.'], ['Hành động về khí hậu', 'Ứng phó kịp thời, hiệu quả với biến đổi khí hậu và thiên tai.'], ['Tài nguyên và môi trường biển', 'Bảo tồn và sử dụng bền vững đại dương, biển và nguồn lợi biển.'], ['Tài nguyên và môi trường đất liền', 'Bảo vệ hệ sinh thái, quản lý rừng bền vững, chống sa mạc hóa và mất đa dạng sinh học.'], ['Hòa bình, công lý và thể chế vững mạnh', 'Xây dựng xã hội hòa bình, công bằng với thể chế hiệu quả và có trách nhiệm.'], ['Quan hệ đối tác vì các mục tiêu', 'Tăng cường quan hệ đối tác toàn cầu và phương thức thực hiện vì phát triển bền vững.']],
  en: [['No poverty', 'End poverty in all its forms everywhere.'], ['Zero hunger', 'End hunger, achieve food security, improve nutrition and promote sustainable agriculture.'], ['Good health and well-being', 'Ensure healthy lives and promote well-being for all at all ages.'], ['Quality education', 'Ensure inclusive, equitable quality education and lifelong learning for all.'], ['Gender equality', 'Achieve gender equality and empower all women and girls.'], ['Clean water and sanitation', 'Ensure availability and sustainable management of water and sanitation.'], ['Affordable and clean energy', 'Ensure access to affordable, reliable, sustainable and modern energy.'], ['Decent work and economic growth', 'Promote sustained, inclusive growth and decent work for all.'], ['Industry, innovation and infrastructure', 'Build resilient infrastructure, inclusive industrialisation and innovation.'], ['Reduced inequalities', 'Reduce inequality within and among countries.'], ['Sustainable cities and communities', 'Make cities and settlements inclusive, safe, resilient and sustainable.'], ['Responsible consumption and production', 'Ensure sustainable consumption and production patterns.'], ['Climate action', 'Take urgent action to combat climate change and its impacts.'], ['Life below water', 'Conserve and sustainably use the oceans, seas and marine resources.'], ['Life on land', 'Protect ecosystems, manage forests, combat desertification and halt biodiversity loss.'], ['Peace, justice and strong institutions', 'Promote peaceful, inclusive societies with effective, accountable institutions.'], ['Partnerships for the goals', 'Strengthen global partnership and the means of implementation.']],
};
