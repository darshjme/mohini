import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "./theme";

// dashboard 
export const countrylistprogressbar = [
    { img: IMAGES.countryindia, name: "India", width: "50%", },
    { img: IMAGES.countrycanada, name: "Canada", width: "30%", },
    { img: IMAGES.countryrussia, name: "Russia", width: "20%", },
    { img: IMAGES.countryuk, name: "United Kingdom", width: "40%", },
    { img: IMAGES.countryaus, name: "Australia", width: "60%", },
    { img: IMAGES.countryusa, name: "United States", width: "20%", },
    { img: IMAGES.countrypak, name: "Pakistan", width: "20%", },
    { img: IMAGES.countrygermany, name: "Germany", width: "80%", },
    { img: IMAGES.countryuae, name: "UAE", width: "30%", },
    { img: IMAGES.countrychina, name: "China", width: "40%", },
]
export const swipershirtdata = [
    { image: IMAGES.swipershirt2, },
    { image: IMAGES.swipershirt1, },
    { image: IMAGES.swipershirt3, },
    { image: IMAGES.swipershirt4, },
    { image: IMAGES.swipershirt1, },
]
export const contactdataa = [
    { image: <img className="avatar avatar-lg avatar-circle mb-2" src={IMAGES.avtar1} />, name: "Jordana Niclany", email: "jordan@mail.com" },
    { image: <div className="avatar avatar-label avatar-lg bg-success-light text-success avatar-circle mb-2 mx-auto">KD</div>, name: "Jacob Jack", email: "jordan@mail.com" },
    { image: <img className="avatar avatar-lg avatar-circle mb-2" src={IMAGES.avtar3} />, name: "Sammy Nico", email: "jordan@mail.com", class: "bg-purple-light" },
    { image: <img className="avatar avatar-lg avatar-circle mb-2" src={IMAGES.avtar4} />, name: "Gibs Gibsy", email: "jordan@mail.com", class: "bg-cream-light" },
    { image: <img className="avatar avatar-lg avatar-circle mb-2" src={IMAGES.avtar5} />, name: "Sam Sammy", email: "jordan@mail.com" },
    { image: <img className="avatar avatar-lg avatar-circle mb-2" src={IMAGES.avtar6} />, name: "Corey Core", email: "jordan@mail.com" },
]
export const hometabledata = [
    { id: 129361171, client: 'Rolex leo', payment: <span className="text-success">$376.24</span>, status: <span className="badge badge-primary light border-0">Completed</span>, },
    { id: 129361178, client: 'Jaction leo', payment: <span className="text-success">$376.24</span>, status: <span className="badge badge-primary light border-0">Completed</span>, },
    { id: 129361179, client: 'Rolex leo', payment: <span className="text-warning">$254.24</span>, status: <span className="badge badge-warning light border-0">Inprogress</span>, },
    { id: 129361179, client: 'Meview Otis', payment: <span className="text-danger">$254.24</span>, status: <span className="badge badge-danger light border-0">Pending</span>, },
    { id: 129361171, client: 'Rolex leo', payment: <span className="text-success">$376.24</span>, status: <span className="badge badge-primary light border-0">Completed</span>, },
    { id: 129361178, client: 'Jaction leo', payment: <span className="text-success">$376.24</span>, status: <span className="badge badge-primary light border-0">Completed</span>, },
]
// dashboard2 
export const navtabdata1 = [
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'Jakob Vetrovs', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-info light badge-sm text-info">ON PROGRESS</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'Jakob Vetrovs', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-info light badge-sm text-info">ON PROGRESS</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
]
export const navtabdata2 = [
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-info light badge-sm text-info">ON PROGRESS</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'James Jr.', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-info light badge-sm text-info">ON PROGRESS</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-info light badge-sm text-info">ON PROGRESS</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'James Jr.', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-info light badge-sm text-info">ON PROGRESS</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-info light badge-sm text-info">ON PROGRESS</Link> },
]
export const navtabdata3 = [
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'James Jr.', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'James Jr.', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-warning light badge-sm text-warning">PENDING</Link> },
]
export const navtabdata4 = [
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-danger light badge-sm text-danger">Closed</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'James Jr.', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-danger light badge-sm text-danger">Closed</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-danger light badge-sm text-danger">Closed</Link> },
    { title: 'Create UseCase Diagram of Fillow..', name: 'James Jr.', image: IMAGES.customers44, image2: IMAGES.customers33, action: <Link to={"#"} className="badge badge-danger light badge-sm text-danger">Closed</Link> },
    { title: 'Redesign Owlio Landing Page Web..', name: 'James Jr.', image: IMAGES.customers11, image2: IMAGES.customers22, action: <Link to={"#"} className="badge badge-danger light badge-sm text-danger">Closed</Link> },
]
// contact 
export const contactcarddata = [
    { id: 1, name: "James Press", image: IMAGES.pic1, },
    { id: 2, name: "Alice Press", image: IMAGES.pic2, },
    { id: 3, name: "Lionel Messi", image: IMAGES.pic3, },
    { id: 4, name: "Kylian Mbappe", image: IMAGES.pic4, },
    { id: 5, name: "Harry Kane", image: IMAGES.pic5, },
    { id: 6, name: "Thierry Henry", image: IMAGES.pic6, },
    { id: 7, name: "Tiana Lubin", image: IMAGES.pic1, },
    { id: 8, name: "Luka Modrić", image: IMAGES.pic2, },
    { id: 9, name: "Jeff Bezos", image: IMAGES.pic3, },
    { id: 10, name: "Bill Gates", image: IMAGES.pic4, },
    { id: 11, name: "Larry Page", image: IMAGES.pic5, },
    { id: 12, name: "Steve Ballmer", image: IMAGES.pic1, },
    { id: 13, name: "Warren Buffett", image: IMAGES.pic6, },
    { id: 14, name: "Harold Hamm", image: IMAGES.pic2, },
    { id: 15, name: "Lazarus", image: IMAGES.pic3, },
    { id: 16, name: "Alan Gerry", image: IMAGES.pic4, },
]
// massege 
export const navdata2 = [
    { title: "All", eventkey: "home-tab" },
    { title: "Social", eventkey: "profile-tab" },
    { title: "Update", eventkey: "contact-tab" }
]
// cms content 
export const tableData = [
    { number: "1", title: "About us" },
    { number: "2", title: "Faq" },
    { number: "3", title: "Pricing" },
    { number: "4", title: "Schedule" },
    { number: "5", title: "Under Maintenance" },
];
// add content 
export const screenOption = [
    { id: "1", title: 'Page Attributes', series: '14' },
    { id: "2", title: 'Featured Image', series: '15' },
    { id: "3", title: 'Excerpt', series: '16' },
    { id: "4", title: 'Custom Fields', series: '17' },
    { id: "5", title: 'Discussion', series: '19' },
    { id: "6", title: 'Slug', series: '13' },
    { id: "7", title: 'Author', series: '11' },
    { id: "8", title: 'Page Type', series: '18' },
    { id: "9", title: 'Seo', series: '12' }
];
// email template 
export const tableData2 = [
    { number: "1", title: "User Registration", status: <span className="badge badge-success light">Active</span> },
    { number: "2", title: "User Forgot Password", status: <span className="badge badge-danger light">Inactive</span> },
    { number: "3", title: "User Activation", status: <span className="badge badge-success light">Active</span> },
    { number: "4", title: "User Login", status: <span className="badge badge-success light">Active</span> },
    { number: "5", title: "User Account Locked", status: <span className="badge badge-danger light">Inactive</span> },
];
//blog 
export const tableData3 = [
    { number: "1", title: "Title of first blog post entry" },
    { number: "2", title: "Why Go For A VFX Course?" },
    { number: "3", title: "Reasons To Choose Animation Courses" },
    { number: "4", title: "Blue Screen Vs. Green Screen For VFX" },
    { number: "5", title: "All About Animation" },
];
// add blog 
export const foodOptions = [
    { value: "orange", label: "orange", color: "#FF8B00" },
    { value: "white", label: "white", color: "#FFC400" },
    { value: "purple", label: "purple", color: "#36B37E" },
];
// blog category 
export const tableData4 = [
    { sr: '1', title: 'Beauty' },
    { sr: '2', title: 'Fashion' },
    { sr: '3', title: 'Lifestyle' },
    { sr: '4', title: 'Food' },
    { sr: '5', title: 'Beauty' },
    { sr: '6', title: 'Fashion' },
    { sr: '7', title: 'Lifestyle' },
    { sr: '8', title: 'Food' },
    { sr: '9', title: 'Lifestyle' },
    { sr: '10', title: 'Food' },
    { sr: '11', title: 'Fashion' },
    { sr: '12', title: 'Lifestyle' },
];
// profile projects
export const profileProjectCard = [
    { id: '1', logo: IMAGES.figma, title: 'Figma Design', progress: '60%', status: 'In Progress', statuscolor: 'primary' },
    { id: '2', logo: IMAGES.github, title: 'Github Repository', progress: '69%', status: 'Pending', statuscolor: 'danger' },
    { id: '3', logo: IMAGES.spotify, title: 'Music App', progress: '75%', status: 'Complete', statuscolor: 'success' },
    { id: '4', logo: IMAGES.twitch, title: 'Banking System', progress: '92%', status: 'Testing', statuscolor: 'warning' },
    { id: '5', logo: IMAGES.dropbox, title: 'Cloud Store', progress: '68%', status: 'Pending', statuscolor: 'danger' },
    { id: '6', logo: IMAGES.html, title: 'HTML Design', progress: '68%', status: 'Complete', statuscolor: 'success' },
    { id: '7', logo: IMAGES.amazon, title: 'eCommerce Theme', progress: '86%', status: 'Testing', statuscolor: 'warning' },
    { id: '8', logo: IMAGES.slack, title: 'Music App', progress: '65%', status: 'Complete', statuscolor: 'success' },
];
// profile campaigns
export const adsCradBlog = [
    { logo: IMAGES.largetwitch, title: 'Twitch Ads', digit: '$450.00', percent: '+32.40%', status: 'success', subtitle: 'more spending' },
    { logo: IMAGES.largetwitter, title: 'Twitter Ads', digit: '750K', percent: '+8.80%', status: 'success', subtitle: 'folowers growth' },
    { logo: IMAGES.largespotify, title: 'Spotify Listerners', digit: '1,125', percent: '-10%', status: 'danger', subtitle: 'less comments than usual' },
    { logo: IMAGES.largetelegram, title: 'Telegram Posts', digit: '580', percent: '+25%', status: 'success', subtitle: 'more spending' },
    { logo: IMAGES.largepinterest, title: 'Pintrest Posts', digit: '120', percent: '+58.32%', status: 'success', subtitle: 'more posts' },
    { logo: IMAGES.largegithub, title: 'Github Contributes', digit: '2,250', percent: '-12.50%', status: 'danger', subtitle: 'less contributes than usual' },
    { logo: IMAGES.largeyoutube, title: 'Youtube Subscribers', digit: '350', percent: '+5.50%', status: 'success', subtitle: 'subscribewrs growth' },
    { logo: IMAGES.largereddit, title: 'Reddit Awards', digit: '1.5M', percent: '+5.52%', status: 'success', subtitle: 'folowers growth' },
];
// profie documents
export const fileExtension = [
    { name: 'CRUD Invoices', image: IMAGES.folderfile, status: '12 files', status2: '7 files', },
    { name: 'Tower Hill Docs', image: IMAGES.folderfile, status: '17 files', status2: '3 files', },
    { name: 'Mivy App', image: IMAGES.folderfile, status: '12 files', status2: '25 files', },
    { name: 'Leaf CRM API Co..', image: IMAGES.folderfile, status: '21 days ago', status2: '2 days ago', },
    { name: 'Tower Hill bilboa..', image: IMAGES.csvfile, status: '34 days ago', status2: '2 days ago', },
    { name: 'Orders backup', image: IMAGES.cssfile, status: '03 days ago', status2: '2 days ago', },
    { name: 'Avionica Tech.', image: IMAGES.pdffile, status: '04 days ago', status2: '2 days ago', },
    { name: '9 Degree CRUD.', image: IMAGES.htmlfile, status: '10 days ago', status2: '2 days ago', },
    { name: 'User CRUD Styles', image: IMAGES.pptfile, status: '78 days ago', status2: '2 days ago', },
    { name: 'Craft Logo', image: IMAGES.mp3file, status: '65 days ago', status2: '2 days ago', },
];
// profile followers 
export const artCardData = [
    { name: 'Lawrence', image: IMAGES.avatar5, },
    { name: 'Sean Bean', text: true, textbg: 'info', textalpha: 'S', },
    { name: 'Alan Johnson', image: IMAGES.avatar5 },
    { name: 'Peter Marcus', text: true, textbg: 'purple', textalpha: 'P', },
    { name: 'Harvey', image: IMAGES.avatar5, },
    { name: 'Johnson', image: IMAGES.avatar6, },
    { name: 'Marshall', text: true, textbg: 'warning', textalpha: 'A', },
    { name: 'McDonald', text: true, textbg: 'success', textalpha: 'N', },
];
// account overview 
export const basicDetail = [
    { title: 'Full Name', subtitle: 'Brad Dennis' },
    { title: 'Company', subtitle: 'DexignLab' },
    { title: 'Contact Phone', subtitle: '123 456 7890' },
    { title: 'Company Site', subtitle: 'dexignlab.com' },
    { title: 'Country', subtitle: 'United States' },
    { title: 'Communication', subtitle: 'Email, Phone' },
    { title: 'Allow Changes', subtitle: 'Yes' },
];
export const tableData5 = [
    { itemname: 'AudioEngine HD3', productid: '#PXF-578', added: 'Nov 01, 2024', status: 'In Stock', statuscolor: 'success', price: '$1,120', qty: '58 PCS' },
    { itemname: 'Google Pixel 6 Pro', productid: '#XGY-356', added: 'Sep 27, 2024', status: 'Out of Stock', statuscolor: 'danger', price: '$440', qty: '14 PCS' },
    { itemname: 'Dell 32 UltraSharp', productid: '#SRR-678', added: 'Jul 09, 2024', status: 'Out of Stock', statuscolor: 'danger', price: '$4,720', qty: '58 PCS' },
    { itemname: 'Google Pixel 6 Pro', productid: '#XGY-356', added: 'May 14, 2024', status: 'In Stock', statuscolor: 'success', price: '$120', qty: '11 PCS' },
    { itemname: 'AudioEngine HD3', productid: '#XGY-356', added: 'Dec 30, 2024', status: 'In Stock', statuscolor: 'success', price: '$503', qty: '58 PCS' },
    { itemname: 'Google Pixel 6 Pro', productid: '#SRR-678', added: 'Oct 25, 2024', status: 'Out of Stock', statuscolor: 'danger', price: '$102', qty: '96 PCS' },
];
// account settings 
export const notificationBlog = [
    { id: '1', inputid: 111, title: 'Notifications' },
    { id: '2', inputid: 112, title: 'Billing Updates' },
    { id: '3', inputid: 113, title: 'New Team Members' },
    { id: '4', inputid: 114, title: 'Completed Projects' },    
];
// account billing 
export const paymentBlog = [
    { image: IMAGES.card1, title: 'Marcus Morris', cardname: 'Card expires at 09/28', cardnumber: 'Visa **** 1679', expire: '', },
    { image: IMAGES.card1, title: 'Marcus Morris', cardname: 'Card expires at 09/27', cardnumber: 'Visa **** 1679', expire: '', },
    { image: IMAGES.card2, title: 'Jason Davis', cardname: 'Card expires at 02/26', cardnumber: 'Mastercard **** 2704', expire: '', },
    { image: IMAGES.card2, title: 'Jason Davis', cardname: 'Card expires at 02/26', cardnumber: 'Mastercard **** 2704', expire: '', },
];
export const addressBlog = [
    { id: 1111, name: 'Address 2', },
    { id: 1112, name: 'Address 3', },
    { id: 1113, name: 'Address 4', },
];
// account refferrls
export const balanceSheet = [
    { amount: "$62,250.0", label: "Net Earnings", bgColor: "bg-purple-light", textColor: "text-purple" },
    { amount: "$7,325.00", label: "Balance", bgColor: "bg-success-light", textColor: "text-success" },
    { amount: "$5,500.00", label: "Avg Deal Size", bgColor: "bg-danger-light", textColor: "text-danger" },
    { amount: "$780.00", label: "Referral Signups", bgColor: "bg-primary-light", textColor: "text-primary" }
];
// account apikey 
export const TableDataEntries = [
    { name: "none set", code: "hhhhhh5782516nsdzjvn54", date: "Nov 01, 2024", status: "Active", statusClass: "success" },
    { name: "Navitare", code: "hhhhhh5782516nsdzjvn54", date: "Sep 27, 2024", status: "Review", statusClass: "info" },
    { name: "Docs API Key", code: "hhhhhh5782516nsdzjvn54", date: "Jul 09, 2024", status: "Inactive", statusClass: "danger" },
    { name: "Identity Key", code: "jk076590ygghgh324vd3568", date: "May 14, 2024", status: "Active", statusClass: "success" },
    { name: "Remore Interface", code: "nzsdvnn584948941", date: "Dec 30, 2024", status: "Active", statusClass: "success" },
    { name: "none set", code: "nzsdvnn584948941", date: "Oct 25, 2024", status: "Inactive", statusClass: "danger" },
    { name: "Test App", code: "nzsdvnn584948941", date: "Apr 03, 2024", status: "Active", statusClass: "success" }
];
// account logs 
export const logsTable = [
    { status: "OK", statusClass: "success", action: "POST/project/WorldNIC/5482344/not_found", dateTime: "20 Dec 2024, 2:40 pm" },
    { status: "ERROR", statusClass: "danger", action: "POST/project/WorldNIC/5482344/invalid", dateTime: "25 Jul 2024, 5:30 pm" },
    { status: "ERROR", statusClass: "danger", action: "POST/project/WorldNIC/5482344/payment", dateTime: "20 Dec 2024, 2:40 pm" },
    { status: "OK", statusClass: "success", action: "POST/project/WorldNIC/5482344/not_found", dateTime: "21 Feb 2024, 2:40 pm" },
    { status: "OK", statusClass: "success", action: "POST/project/WorldNIC/5482344/not_found", dateTime: "25 Jul 2024, 5:30 pm" },
    { status: "ERROR", statusClass: "danger", action: "POST/project/WorldNIC/5482344/not_found", dateTime: "20 Dec 2024, 2:40 pm" },
    { status: "OK", statusClass: "success", action: "POST/project/WorldNIC/5482344/payment", dateTime: "20 Dec 2024, 2:40 pm" }
];
// aikit sheduled 
export const schedulerTable = [
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
];
// aikit repurpose 
export const schedulerTable2 = [
    { keyword: 'lion' },
    { keyword: 'Tegr' },
    { keyword: 'Fres' },
    { keyword: 'Tiney' },
    { keyword: 'lion' },
    { keyword: 'Tegr' },
    { keyword: 'Fres' },
    { keyword: 'Tiney' },
    { keyword: 'lion' },
    { keyword: 'Tegr' },
    { keyword: 'Fres' },
    { keyword: 'Tiney' },
    { keyword: 'Tegr' },
    { keyword: 'Fres' },
    { keyword: 'Tiney' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'lion' },
    { keyword: 'Tegr' },
    { keyword: 'Fres' },
];
// user profile 
export const galleryBlog = [
    { image: IMAGES.profile03 }, { image: IMAGES.profile04 },
    { image: IMAGES.profile02 }, { image: IMAGES.profile04 },
    { image: IMAGES.profile03 }, { image: IMAGES.profile02 },
];
export const followersgrid = [
    { title: 'Alan Green', para: 'UI Designer', image: <img src={IMAGES.userspic1} alt="" className="rounded-circle" />, },
    { title: 'Angela Moss', para: 'Redblue Studios', image: <span className="icon-placeholder bgl-success rounded-circle text-success">am</span>, },
    { title: 'Brian Samuel', para: 'Team Management', image: <img src={IMAGES.userspic2} alt="" className="rounded-circle" />, },
    { title: 'Benny Chagur', para: 'Highspeed Inc.', image: <span className="icon-placeholder bgl-primary rounded-circle text-primary">Bc</span>, },
    { title: 'Chyntia Lawra', para: 'Zero Two Studios', image: <img src={IMAGES.userspic3} alt="" className="rounded-circle" />, },
    { title: 'Benny Chagur', para: 'Highspeed Inc.', image: <span className="icon-placeholder bgl-primary rounded-circle text-primary">Bc</span>, },
]
export const projectgrid = [
    { image: IMAGES.logopic1, class: 'bg-info', btn: <span className="badge badge-success d-sm-inline-block d-none">Compeleted</span>, },
    { image: IMAGES.logopic2, class: 'bg-danger', btn: <span className="badge badge-info d-sm-inline-block d-none">Compeleted</span>, },
    { image: IMAGES.logopic1, class: 'bg-info', btn: <span className="badge badge-danger d-sm-inline-block d-none">Incompleted</span>, },
    { image: IMAGES.logopic2, class: 'bg-danger', btn: <span className="badge badge-warning d-sm-inline-block d-none">Pending</span>, },
]
// blog 
export const blogpostdata = [
    { image: IMAGES.blog2, name: 'Yatin xarma', btn: 'Business', image2: IMAGES.blog2, },
    { image: IMAGES.blog2, name: 'Almash Khan', btn: 'Software', image2: IMAGES.blog3, },
    { image: IMAGES.blog3, name: 'Yatin xarma', btn: 'Business', image2: IMAGES.blog4, },
    { image: IMAGES.blog3, name: 'Almash Khan', btn: 'Software', image2: IMAGES.blog3, },
];
// pricing 
export const companyswiperdata = [
    { image: IMAGES.companieslogo1 },
    { image: IMAGES.companieslogo2 },
    { image: IMAGES.companieslogo3 },
    { image: IMAGES.companieslogo4 },
    { image: IMAGES.companieslogo5 },
    { image: IMAGES.companieslogo6 },
    { image: IMAGES.companieslogo1 },
    { image: IMAGES.companieslogo2 },
]
export const pricingdata = [
    {
        span: <span className="badge badge-info light border-0">Standard</span>,
        price: "$12",
        price2: "$08",
        className: 'col-xl-4 col-lg-4 col-sm-6',
        list: <ul className="prise-list">
            <li> User Dashboard </li>
            <li> Post 3 Ads per week </li>
            <li className="disable">Program reviews 1x a month</li>
            <li className="disable">Program reviews 1x a month</li>
            <li className="disable">CPM Overage: Unlimited</li>
            <li className="disable">Assisted onboarding support</li>
            <li className="disable">CPM Overage: Unlimited</li>
        </ul>,
        list2: <ul className="prise-list">
            <li> User Dashboard </li>
            <li> Post 3 Ads per week </li>
            <li className="disable">Program reviews 1x a month</li>
            <li className="disable">CPM Overage: Unlimited</li>
            <li className="disable">Assisted onboarding support</li>
            <li className="disable">CPM Overage: Unlimited</li>
        </ul>,
    },
    {
        span: <span className="badge badge-success light border-0">Premium</span>,
        price: "$25",
        price2: "$20",
        className: 'col-xl-4 col-lg-4 col-sm-6',
        list: <ul className="prise-list">
            <li> User Dashboard </li>
            <li> Post 3 Ads per week </li>
            <li> Multiple images &amp; videos </li>
            <li> Basic customer support </li>
            <li> Featured ads </li>
            <li className="disable">Program reviews 1x a month</li>
            <li className="disable">CPM Overage: Unlimited</li>
        </ul>,
        list2: <ul className="prise-list">
            <li> User Dashboard </li>
            <li> Post 3 Ads per week </li>
            <li> Multiple images &amp; videos </li>
            <li> Basic customer support </li>
            <li> Featured ads </li>
        </ul>,
    },
    {
        span: <span className="badge badge-warning light border-0">Business</span>,
        price: "$200",
        price2: "$50",
        className: 'col-xl-4 col-lg-4',
        list: <ul className="prise-list">
            <li> User Dashboard </li>
            <li> Post 3 Ads per week </li>
            <li> Multiple images &amp; videos </li>
            <li> Basic customer support </li>
            <li> Featured ads </li>
            <li> Special ads badge </li>
            <li> Call to Action in Every Ads </li>
        </ul>,
        list2: <ul className="prise-list">
            <li> User Dashboard </li>
            <li> Post 3 Ads per week </li>
            <li> Multiple images &amp; videos </li>
            <li> Basic customer support </li>
            <li> Featured ads </li>
            <li> Special ads badge </li>
            <li> Call to Action in Every Ads </li>
        </ul>,
    },
]
// ecommers shoop 
export const productgriddata = [
    { image: IMAGES.productpic1, image2: IMAGES.product1 },
    { image: IMAGES.productpic2, image2: IMAGES.product2 },
    { image: IMAGES.productpic3, image2: IMAGES.product3 },
    { image: IMAGES.productpic4, image2: IMAGES.product4 },
    { image: IMAGES.productpic5, image2: IMAGES.product5 },
    { image: IMAGES.productpic6, image2: IMAGES.product6 },
    { image: IMAGES.productpic7, image2: IMAGES.product7 },
    { image: IMAGES.productpic1, image2: IMAGES.product1 },
]
export const productlistdata = [
    { image: IMAGES.product2, title: 'Smart Watch for Worldnic', },
    { image: IMAGES.product3, title: 'Smart Headphone for Worldnic', },
    { image: IMAGES.product3, title: 'Smart Headphone for Worldnic', },
    { image: IMAGES.product7, title: 'Smart Charger for Worldnic', },
    { image: IMAGES.product6, title: 'Smart Wallet for Worldnic', },
    { image: IMAGES.product4, title: 'Smart Earbuds for Worldnic', },
]
export const productordertabeldata = [
    {
        checkbox: 'checkbox-success',
        order: '#181',
        name: 'Ricky Antony',
        mail: 'ricky@example.com',
        date: '20/04/2025',
        address: 'Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149',
        address2: 'Via Flat Rate',
        status: <span className="badge badge-success"> Completed <span className="ms-1 fa fa-check" /> </span>,
        amount: '$99',
    },
    {
        order: '#182',
        name: 'Kin Rossow',
        mail: 'kin@example.com',
        date: '20/04/2025',
        address: 'Kin Rossow, 1 Hollywood Blvd,Beverly Hills, California 90210',
        address2: 'Via Free Shipping',
        status: <span className="badge badge-primary"> Processing <span className="ms-1 fa fa-redo" /> </span>,
        amount: '$120',
    },
    {
        checkbox: 'checkbox-secondary',
        order: '#183',
        name: 'Merry Diana',
        mail: 'merry@example.com',
        date: '30/04/2025',
        address: 'Merry Diana, 1 Infinite Loop, Cupertino, California 90210',
        address2: 'Via Link Road',
        status: <span className="badge badge-secondary"> On Hold <span className="ms-1 fa fa-ban" /> </span>,
        amount: '$70',
    },
    {
        checkbox: 'checkbox-warning',
        order: '#184',
        name: 'Bucky Robert',
        mail: 'bucky@example.com',
        date: '30/04/2025',
        address: 'Bucky Robert, 2392 Main Avenue, Penasauka, New Jersey 02149',
        address2: 'Via Free Shipping',
        status: <span className="badge badge-warning"> Pending <span className="ms-1 fas fa-stream" /> </span>,
        amount: '$92',
    },
    {
        checkbox: 'checkbox-secondary',
        order: '#185',
        name: 'Rocky Zampa',
        mail: 'rocky@example.com',
        date: '30/04/2025',
        address: 'Rocky Zampa, 2392 Main Avenue, Penasauka, New Jersey 02149',
        address2: 'Via Free Road',
        status: <span className="badge badge-secondary"> On Hold <span className="ms-1 fa fa-ban" /> </span>,
        amount: '$120',
    },
    {
        order: '#186',
        name: 'Ricky John',
        mail: 'ricky@example.com',
        date: '30/04/2025',
        address: 'Ricky John, 2392 Main Avenue, Penasauka, New Jersey 02149',
        address2: 'Via Free Shipping',
        status: <span className="badge badge-primary"> Processing <span className="ms-1 fa fa-redo" /> </span>,
        amount: '$145',
    },
    {
        checkbox: 'checkbox-success',
        order: '#187',
        name: 'Cristofer Henric',
        mail: 'cristofer@example.com',
        date: '30/04/2025',
        address: 'Cristofer Henric, 2392 Main Avenue, Penasauka, New Jersey 02149',
        address2: 'Via Flat Rate',
        status: <span className="badge badge-success"> Completed <span className="ms-1 fa fa-check" /> </span>,
        amount: '$55',
    },
    {
        checkbox: 'checkbox-secondary',
        order: '#188',
        name: 'Brate Lee',
        mail: 'brate@example.com',
        date: '29/04/2025',
        address: 'Brate Lee, 2392 Main Avenue, Penasauka, New Jersey 02149',
        address2: 'Via Flat Rate',
        status: <span className="badge badge-secondary"> On Hold <span className="ms-1 fa fa-ban" /> </span>,
        amount: '$99',
    },
    {
        order: '#189',
        name: ' Thomas Stephenson',
        mail: 'Stephenson@example.com',
        date: '29/04/2025',
        address: 'Thomas Stephenson, 116 Ballifeary Road, Bamff',
        address2: 'Via Flat Rate',
        status: <span className="badge badge-primary"> Processing <span className="ms-1 fa fa-redo" /> </span>,
        amount: '$52',
    },
    {
        checkbox: 'checkbox-success',
        order: '#190',
        name: 'Evie Singh',
        mail: 'eviewsing@example.com',
        date: '29/04/2025',
        address: 'Evie Singh, 54 Castledore Road, Tunstead',
        address2: 'Via Flat Rate',
        status: <span className="badge badge-success"> Completed <span className="ms-1 fa fa-check" /> </span>,
        amount: '$90',
    },
    {
        checkbox: 'checkbox-success',
        order: '#191',
        name: 'David Peters',
        mail: 'peter@example.com',
        date: '29/04/2025',
        address: 'David Peters, Rhyd Y Groes, Rhosgoch, LL66 0AT',
        address2: 'Via Link Road',
        status: <span className="badge badge-success"> Completed <span className="ms-1 fa fa-check" /> </span>,
        amount: '$69',
    },
    {
        order: '#192',
        name: 'Jennifer Johnson',
        mail: 'jennifer@example.com',
        date: '28/04/2025',
        address: 'Jennifer Johnson, Rhyd Y Groes, Rhosgoch, LL66 0AT',
        address2: 'Via Flat Rate',
        status: <span className="badge badge-primary"> Processing <span className="ms-1 fa fa-redo" /> </span>,
        amount: '$112',
    },
]
export const customerstabledata = [
    { image: IMAGES.avatarpng5, name: "Ricky Antony", phone: "(201) 200-1851", address: "2392 Main Avenue, Penasauka", joined: "30/03/2018" },
    { image: IMAGES.avatarpng1, name: "Emma Watson", phone: "(212) 228-8403", address: "2289 5th Avenue, New York", joined: "11/07/2017" },
    { image: IMAGES.avatarpng5, name: "Rowen Atkinson", phone: "(201) 200-1851", address: "112 Bostwick Avenue, Jersey City", joined: "05/04/2016" },
    { image: IMAGES.avatarpng1, name: "Antony Hopkins", phone: "(901) 324-3127", address: "3448 Ile De France St #242", joined: "05/04/2018" },
    { image: IMAGES.avatarpng1, name: "Jennifer Schramm", phone: "(828) 382-9631", address: "659 Hannah Street, Charlotte", joined: "17/03/2016" },
    { image: IMAGES.avatarpng5, name: "Raymond Mims", phone: "(562) 468-5646", address: "2298 Locust Court, Artesia", joined: "12/07/2014" },
    { image: IMAGES.avatarpng1, name: "Michael Jenkins", phone: "(302) 613-8829", address: "4678 Maud Street, Philadelphia", joined: "15/06/2014" },
    { image: IMAGES.avatarpng1, name: "Kristine Cadena", phone: "(317) 273-7814", address: "3412 Crestview Manor, Indianapolis", joined: "15/04/2015" },
    { image: IMAGES.avatarpng5, name: "Ricky Antony", phone: "(201) 200-1851", address: "2392 Main Avenue, Penasauka", joined: "30/03/2018" },
    { image: IMAGES.avatarpng1, name: "Emma Watson", phone: "(212) 228-8403", address: "2289 5th Avenue, New York", joined: "11/07/2017" },
    { image: IMAGES.avatarpng5, name: "Rowen Atkinson", phone: "(201) 200-1851", address: "112 Bostwick Avenue, Jersey City", joined: "05/04/2016" },
    { image: IMAGES.avatarpng1, name: "Antony Hopkins", phone: "(901) 324-3127", address: "3448 Ile De France St #242", joined: "05/04/2018" },
    { image: IMAGES.avatarpng1, name: "Jennifer Schramm", phone: "(828) 382-9631", address: "659 Hannah Street, Charlotte", joined: "17/03/2016" },
    { image: IMAGES.avatarpng5, name: "Raymond Mims", phone: "(562) 468-5646", address: "2298 Locust Court, Artesia", joined: "12/07/2014" },
    { image: IMAGES.avatarpng1, name: "Michael Jenkins", phone: "(302) 613-8829", address: "4678 Maud Street, Philadelphia", joined: "15/06/2014" },
    { image: IMAGES.avatarpng1, name: "Kristine Cadena", phone: "(317) 273-7814", address: "3412 Crestview Manor, Indianapolis", joined: "15/04/2015" },
];
// note 
export const notesdata = [
    { img: IMAGES.avatar1, name: "Yatin", para: "Meet with tailor", class: 'bgl-success', },
    { img: IMAGES.avatar3, name: "Michel", para: "Meet with Mukund", class: "bgl-warning", },
    { img: IMAGES.avatar2, name: "John", para: "Meet with Nitesh", class: "bgl-danger", },
    { img: IMAGES.avatar3, name: "Michel", para: "Meet with Mukund", class: "bgl-warning", },
    { img: IMAGES.avatar2, name: "John", para: "Meet with Nitesh", class: "bgl-danger", },
    { img: IMAGES.avatar1, name: "Yatin", para: "Meet with tailor", class: "bgl-success", },
]
// file manager 
export const filemanagerfolderdata = [
    { title: 'Foto Pantai', },
    { title: 'VIDic823.mp4', },
    { title: 'Foto Pantai', },
    { title: 'VIDic823.mp4', },
    { title: 'Foto Pantai', },
    { title: 'VIDic823.mp4', },
    { title: 'Foto Pantai', },
    { title: 'VIDic823.mp4', },
]
export const filemanagerfolderdata2 = [
    { title: 'VIDic823.mp4', },
    { title: 'yatin.dox', },
    { title: 'VIDic823.mp4', },
    { title: 'yatin.dox', },
]
// contact card 
export const contactcarddata2 = [
    { title: 'Alan Green', para: 'UI Designer', image: <img src={IMAGES.userspic1} alt="" className="rounded-circle" />, },
    { title: 'Angela Moss', para: 'Redblue Studios', image: <span className="icon-placeholder bgl-success rounded-circle text-success">am</span>, },
    { title: 'Brian Samuel', para: 'Team Management', image: <img src={IMAGES.userspic2} alt="" className="rounded-circle" />, },
    { title: 'Benny Chagur', para: 'Highspeed Inc.', image: <span className="icon-placeholder bgl-primary rounded-circle text-primary">Bc</span>, },
    { title: 'Chyntia Lawra', para: 'Zero Two Studios', image: <img src={IMAGES.userspic3} alt="" className="rounded-circle" />, },
    { title: 'Cloe Simatupang', para: 'Zero Two Studios', image: <img src={IMAGES.userspic4} alt="" className="rounded-circle" />, },
    { title: 'Engeline O’conner', para: 'Beep Beep Inc.', image: <img src={IMAGES.userspic5} alt="" className="rounded-circle" />, },
    { title: 'Franklin Jr.', para: 'Zero Two Studios', image: <span className="icon-placeholder bgl-info rounded-circle text-info">jr</span>, },
    { title: 'Geovanny', para: 'UI Designer', image: <img src={IMAGES.userspic6} alt="" className="rounded-circle" />, },
    { title: 'Henry Charlotte', para: 'UI Designer', image: <span className="icon-placeholder bgl-info rounded-circle text-info">hc</span>, },
    { title: 'Ivankov Shee', para: 'UI Designer', image: <img src={IMAGES.userspic7} alt="" className="rounded-circle" />, },
    { title: 'Nindy Leeacovic', para: 'UI Designer', image: <img src={IMAGES.userspic8} alt="" className="rounded-circle" />, },
]
// inbox email 
export const inboxdata = [
    { style: "style-1", subject: 'Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture', },
    { subject: 'Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.', },
    { style: "style-2", subject: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { subject: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { style: "style-3", subject: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { subject: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { subject: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { subject: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { subject: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { subject: 'Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture', },
    { subject: 'Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.', },
    { subject: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
    { subject: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of', },
]
// kanban 
export const kanbandata = [
    {
        maintitle: "To-Do List",
        titledata:24,
        content: [
            { title: "Create wireframe for landing page phase 1", span: <span className="sub-title"> {SVGICON.designerdot} Deisgner </span>, progessbar: "bg-design", },
            { title: "Visual Graphic for Presentation to Client", span: <span className="text-warning"> {SVGICON.importantdot} Important </span>, progessbar: "bg-warning", },
        ]
    },
    {
        maintitle: "Done",
        titledata:3,
        content: [
            { title: "Update information in footer section", span: <span className="text-danger"> {SVGICON.bugdot} BUGS FIXING </span>, progessbar: "bg-danger" },
            { title: "Update information in footer section", span: <span className="text-danger"> {SVGICON.bugdot} BUGS FIXING </span>, progessbar: "bg-danger" },
            { title: "Create wireframe for landing page phase 1", span: <span className="sub-title"> {SVGICON.designerdot} HTML </span>, progessbar: "bg-design" },
        ]
    },
    {
        maintitle: "On Progress",
        titledata:2,
        content: [
            { title: "Update information in footer section", span: <span className="sub-success"> {SVGICON.updatedot} UPDATE </span>, progessbar: "bg-success" },
            { title: "Update information in footer section", span: <span className="text-info"> {SVGICON.importantdot} Video </span>, progessbar: "bg-info" },
        ]
    },
    {
        maintitle: "Done",
        titledata:3,
        content: [
            { title: "Update information in footer section", span: <span className="text-danger"> {SVGICON.bugdot} BUGS FIXING </span>, progessbar: "bg-danger" },
            { title: "Update information in footer section", span: <span className="text-danger"> {SVGICON.bugdot} BUGS FIXING </span>, progessbar: "bg-danger" },
            { title: "Create wireframe for landing page phase 1", span: <span className="sub-title"> {SVGICON.designerdot} HTML </span>, progessbar: "bg-design" },
        ]
    }
]   
// file manager 
export const filetabledata = [
    { file: "VIDic823.mp4", category: "Video", size: "10 MB", lastmodified: "22,Nov 2024", class:"odd" },
    { file: "VIDic824.mp4", category: "Files", size: "15 MB", lastmodified: "23,Nov 2024", class:"even" },
    { file: "VIDic825.mp4", category: "Video", size: "10 MB", lastmodified: "22,Nov 2024", class:"odd" },
    { file: "VIDic826.mp4", category: "Files", size: "15 MB", lastmodified: "23,Nov 2024", class:"even" },
    { file: "VIDic827.mp4", category: "Video", size: "10 MB", lastmodified: "22,Nov 2024", class:"odd" },
]