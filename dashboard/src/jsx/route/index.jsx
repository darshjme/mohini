import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Routes, Route, Outlet } from "react-router-dom";
// Mohini Custom Pages
import AgentOrchestration from "../pages/AgentOrchestration";
import MemoryExplorer from "../pages/MemoryExplorer";
import SkillRegistry from "../pages/SkillRegistry";
import HandsMonitor from "../pages/HandsMonitor";
import ChannelHub from "../pages/ChannelHub";
import Nav from "../layouts/nav";
import Footer from "../layouts/Footer";
// dashboard 
import Home from "../pages/dashboard/Home";
import DashboardDark from "../pages/dashboard/DashboardDark";
import Dashboard2 from "../pages/dashboard/dashboard-2";
import Projectpage from "../pages/dashboard/project-page";
import Contact from "../pages/dashboard/contact";
import Kanban from "../pages/dashboard/kanban";
import Message from "../pages/dashboard/message";
// CMS 
import Content from '../pages/cms/content'
import ContentAdd from "../pages/cms/content-add";
import Menu from "../pages/cms/menu";
import EmailTemplate from "../pages/cms/email-template";
import AddEmail from "../pages/cms/add-email";
import Blog from "../pages/cms/blog";
import AddBlog from "../pages/cms/add-blog";
import BlogCategory from "../pages/cms/blog-category";
// Profile 
import ProfileOverview from "../pages/profile/profile-overview";
import ProfileProjects from "../pages/profile/profile-projects";
import ProfileProjectsDetails from "../pages/profile/profile-projects-details";
import ProfileCampaigns from "../pages/profile/profile-campaigns";
import ProfileDocuments from "../pages/profile/profile-documents";
import ProfileFollowers from "../pages/profile/profile-followers";
import ProfileActivity from "../pages/profile/profile-activity";
// Account 
import AccountOverview from "../pages/account/account-overview";
import AccountSettings from "../pages/account/account-settings";
import AccountSecurity from "../pages/account/account-security";
import AccountActivity from "../pages/account/account-activity";
import AccountBilling from "../pages/account/account-billing";
import AccountStatements from "../pages/account/account-statements";
import AccountReferrals from "../pages/account/account-referrals";
import AccountApiKeys from "../pages/account/acount-apikeys";
import AccountLogs from "../pages/account/account-logs";
// AIKIT 
import AutoWrite from "../pages/aikit/auto-write";
import Scheduled from "../pages/aikit/scheduled";
import Repurpose from "../pages/aikit/repurpose";
import RSS from "../pages/aikit/rss";
import Chatbot from "../pages/aikit/chatbot";
import FineTuneModels from "../pages/aikit/fine-tune-models";
import Prompt from "../pages/aikit/prompt";
import Setting from "../pages/aikit/setting";
import Import from "../pages/aikit/import";
// USER 
import AppProfile from "../pages/apps/app-profile";
import EditProfile from "../pages/apps/edit-profile";
import PostDetails from "../pages/apps/post-details";
// blog 
import BlogPost from "../pages/blog/blog-post";
import BlogHome from "../pages/blog/blog-home";
// pricing 
import Pricing from "../pages/pricing";
// ecommers categories
import CategoryTable from "../pages/ecommerce/categories/category-table";
import AddCategory from "../pages/ecommerce/categories/add-categary";
import EditCategory from "../pages/ecommerce/categories/edit-categary";
// ecommers products
import ProductTable from "../pages/ecommerce/products/product-table";
import AddProduct from "../pages/ecommerce/products/add-product";
import EditProduct from "../pages/ecommerce/products/edit-product";
// ecommers shop
import ProductGrid from "../pages/ecommerce/shop/ecom-product-grid";
import ProductList from "../pages/ecommerce/shop/ecom-product-list";
import ProductDetail from "../pages/ecommerce/shop/ecom-product-detail";
import ProductOrder from "../pages/ecommerce/shop/ecom-product-order";
import Checkout from "../pages/ecommerce/shop/ecom-checkout";
import Invoice from "../pages/ecommerce/shop/ecom-invoice";
import Customers from "../pages/ecommerce/shop/ecom-customers";
// projects
import ProjectList from "../pages/projects/project-list";
import AddProject from "../pages/projects/add-project";
import ProjectCard from "../pages/projects/project-card";
// notes
import Notes from "../pages/note";
// file manager
import FileManager from "../pages/file-manager";
// contacts 
import ContactList from "../pages/contacts/contact-list";
import ContactCard from "../pages/contacts/contact-card";
// inbox 
import EmailCompose from "../pages/email/email-compose";
import EmailInbox from "../pages/email/email-inbox";
import EmailRead from "../pages/email/email-read";
// calender
import Calendar from "../pages/calender";
// charts 
import SparklineChart from "../pages/charts/Sparkline";
import ChartJs from "../pages/charts/Chartjs";
import RechartJs from "../pages/charts/rechart";
import ApexChart from "../pages/charts/apexcharts";
// bootstrap 
import UiAccordion from "../components/bootstrap/Accordion";
import UiAlert from "../components/bootstrap/Alert";
import UiBadge from "../components/bootstrap/Badge";
import UiButton from "../components/bootstrap/Button";
import UiModal from "../components/bootstrap/Modal";
import UiButtonGroup from "../components/bootstrap/ButtonGroup";
import UiListGroup from "../components/bootstrap/ListGroup";
import UiCards from "../components/bootstrap/Cards";
import UiCarousel from "../components/bootstrap/Carousel";
import UiDropDown from "../components/bootstrap/DropDown";
import UiPopOver from "../components/bootstrap/PopOver";
import UiProgressBar from "../components/bootstrap/ProgressBar";
import UiTab from "../components/bootstrap/Tab";
import UiTypography from "../components/bootstrap/Typography";
import UiPagination from "../components/bootstrap/Pagination";
import UiGrid from "../components/bootstrap/Grid";
// plugins 
import Select2 from "../pages/plugins/Select2/Select2";
import NouiSlider from "../pages/plugins/NouiSlider/MainNouiSlider";
import MainSweetAlert from "../pages/plugins/SweetAlert/SweetAlert";
import MainToastr from "../pages/plugins/Toastr/Toastr";
import Lightgallery from "../pages/plugins/Lightgallery/Lightgallery";
import Widget from "../pages/widget/Widget";
// forms 
import Element from "../pages/forms/Element/Element";
import Wizard from "../pages/forms/Wizard/Wizard";
import CkEditor from "../pages/forms/CkEditor/CkEditor";
import Pickers from "../pages/forms/Pickers/Pickers";
import FormValidation from "../pages/forms/FormValidation/FormValidation";
// table 
import BootstrapTable from "../pages/table/BootstrapTable";
import DataTable from "../pages/table/DataTable";
// pages 
import LockScreen from "../pages/error/LockScreen";
import Error400 from "../pages/error/Error400";
import Error403 from "../pages/error/Error403";
import Error404 from "../pages/error/Error404";
import Error500 from "../pages/error/Error500";
import Error503 from "../pages/error/Error503";
import EmptyPage from "../pages/error/emptypage";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import ScrollToTop from "../element/scrolltotop";

const Markup = () => {
    const menu = [
        { path: '/', element: <Home /> },
        { path: 'dashboard', element: <Home /> },
        // Mohini Custom Routes
        { path: 'agent-orchestration', element: <AgentOrchestration /> },
        { path: 'memory-explorer', element: <MemoryExplorer /> },
        { path: 'skill-registry', element: <SkillRegistry /> },
        { path: 'hands-monitor', element: <HandsMonitor /> },
        { path: 'channel-hub', element: <ChannelHub /> },
        { path: 'dashboard-dark', element: <DashboardDark /> },
        { path: 'dashboard-2', element: <Dashboard2 /> },
        { path: 'project-page', element: <Projectpage /> },
        { path: 'contact', element: <Contact /> },
        { path: 'kanban', element: <Kanban /> },
        { path: 'message', element: <Message /> },
        { path: 'content', element: <Content /> },
        { path: 'content-add', element: <ContentAdd /> },
        { path: 'menu', element: <Menu /> },
        { path: 'email-template', element: <EmailTemplate /> },
        { path: 'add-email', element: <AddEmail /> },
        { path: 'blog', element: <Blog /> },
        { path: 'add-blog', element: <AddBlog /> },
        { path: 'blog-category', element: <BlogCategory /> },
        { path: 'profile-overview', element: <ProfileOverview /> },
        { path: 'profile-projects', element: <ProfileProjects /> },
        { path: 'profile-projects-details', element: <ProfileProjectsDetails /> },
        { path: 'profile-campaigns', element: <ProfileCampaigns /> },
        { path: 'profile-documents', element: <ProfileDocuments /> },
        { path: 'profile-followers', element: <ProfileFollowers /> },
        { path: 'profile-activity', element: <ProfileActivity /> },
        { path: 'account-overview', element: <AccountOverview /> },
        { path: 'account-settings', element: <AccountSettings /> },
        { path: 'account-security', element: <AccountSecurity /> },
        { path: 'account-activity', element: <AccountActivity /> },
        { path: 'account-billing', element: <AccountBilling /> },
        { path: 'account-statements', element: <AccountStatements /> },
        { path: 'account-referrals', element: <AccountReferrals /> },
        { path: 'account-apikeys', element: <AccountApiKeys /> },
        { path: 'account-logs', element: <AccountLogs /> },
        { path: 'auto-write', element: <AutoWrite /> },
        { path: 'scheduled', element: <Scheduled /> },
        { path: 'repurpose', element: <Repurpose /> },
        { path: 'rss', element: <RSS /> },
        { path: 'chatbot', element: <Chatbot /> },
        { path: 'fine-tune-models', element: <FineTuneModels /> },
        { path: 'prompt', element: <Prompt /> },
        { path: 'setting', element: <Setting /> },
        { path: 'import', element: <Import /> },
        { path: 'app-profile', element: <AppProfile /> },
        { path: 'edit-profile', element: <EditProfile /> },
        { path: 'post-details', element: <PostDetails /> },
        { path: 'blog-post', element: <BlogPost /> },
        { path: 'blog-home', element: <BlogHome /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'category-table', element: <CategoryTable /> },
        { path: 'add-category', element: <AddCategory /> },
        { path: 'edit-category', element: <EditCategory /> },
        { path: 'product-table', element: <ProductTable /> },
        { path: 'add-product', element: <AddProduct /> },
        { path: 'edit-product', element: <EditProduct /> },
        { path: 'ecom-product-grid', element: <ProductGrid /> },
        { path: 'ecom-product-list', element: <ProductList /> },
        { path: 'ecom-product-detail', element: <ProductDetail /> },
        { path: 'ecom-product-order', element: <ProductOrder /> },
        { path: 'ecom-checkout', element: <Checkout /> },
        { path: 'ecom-invoice', element: <Invoice /> },
        { path: 'ecom-customers', element: <Customers /> },
        { path: 'project-list', element: <ProjectList /> },
        { path: 'add-project', element: <AddProject /> },
        { path: 'project-card', element: <ProjectCard /> },
        { path: 'note', element: <Notes /> },
        { path: 'file-manager', element: <FileManager /> },
        { path: 'contact-list', element: <ContactList /> },
        { path: 'contact-card', element: <ContactCard /> },
        { path: 'email-compose', element: <EmailCompose /> },
        { path: 'email-inbox', element: <EmailInbox /> },
        { path: 'email-read', element: <EmailRead /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'chart-sparkline', element: <SparklineChart /> },
        { path: 'chart-chartjs', element: <ChartJs /> },
        { path: 'chart-rechart', element: <RechartJs /> },
        { path: 'chart-apexchart', element: <ApexChart /> },
        { path: 'ui-accordion', element: <UiAccordion /> },
        { path: 'ui-alert', element: <UiAlert /> },
        { path: 'ui-badge', element: <UiBadge /> },
        { path: 'ui-button', element: <UiButton /> },
        { path: 'ui-modal', element: <UiModal /> },
        { path: 'ui-button-group', element: <UiButtonGroup /> },
        { path: 'ui-list-group', element: <UiListGroup /> },
        { path: 'ui-card', element: <UiCards /> },
        { path: 'ui-carousel', element: <UiCarousel /> },
        { path: 'ui-dropdown', element: <UiDropDown /> },
        { path: 'ui-popover', element: <UiPopOver /> },
        { path: 'ui-progressbar', element: <UiProgressBar /> },
        { path: 'ui-tab', element: <UiTab /> },
        { path: 'ui-typography', element: <UiTypography /> },
        { path: 'ui-pagination', element: <UiPagination /> },
        { path: 'ui-grid', element: <UiGrid /> },
        { path: 'uc-select2', element: <Select2 /> },
        { path: 'uc-noui-slider', element: <NouiSlider /> },
        { path: 'uc-sweetalert', element: <MainSweetAlert /> },
        { path: 'uc-toastr', element: <MainToastr /> },
        { path: 'uc-lightgallery', element: <Lightgallery /> }, 
        { path: 'form-element', element: <Element /> },
        { path: 'form-wizard', element: <Wizard /> },
        { path: 'form-ckeditor', element: <CkEditor /> },
        { path: 'form-pickers', element: <Pickers /> },
        { path: 'form-validation', element: <FormValidation /> },
        { path: 'table-bootstrap-basic', element: <BootstrapTable /> },
        { path: 'table-datatable-basic', element: <DataTable /> },
        { path: 'lock-screen', element: <LockScreen /> },
        { path: 'error-400', element: <Error400 /> },
        { path: 'error-403', element: <Error403 /> },
        { path: 'error-404', element: <Error404 /> },
        { path: 'error-500', element: <Error500 /> },
        { path: 'error-503', element: <Error503 /> },
        { path: 'empty-page', element: <EmptyPage /> },
        { path: 'login', element: <Login /> },
        { path: 'registration', element: <Registration /> },
        { path: 'widget-basic', element: <Widget /> },
    ]

    return (
        <>
            <Routes>
                <Route path='page-lock-screen' element={<LockScreen />} />
                <Route path='page-error-400' element={<Error400 />} />
                <Route path='page-error-403' element={<Error403 />} />
                <Route path='page-error-404' element={<Error404 />} />
                <Route path='page-error-500' element={<Error500 />} />
                <Route path='page-error-503' element={<Error503 />} />
                <Route path='page-login' element={<Login />} />
                <Route path='page-register' element={<Registration />} />
                <Route element={<MainLayout />}>
                    {menu.map((item, index) => (
                        <Route key={index} path={item.path} element={item.element} />
                    ))}
                </Route>
            </Routes>
            <ScrollToTop />
        </>
    );
};

function MainLayout() {
    const { menuToggle, sidebariconHover } = useContext(ThemeContext);
    return (
        <>
            <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`} >
                <Nav />
                <div className="content-body" style={{ minHeight: "849px" }}>
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );
}

export default Markup;