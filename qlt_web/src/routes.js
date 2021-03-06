import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
import {ROLES} from './constants';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Role = React.lazy(() => import('./views/Roles/Roles'));
const SettingNav = React.lazy(() => import('./views/SettingNav'));
const Account = React.lazy(() => import('./views/Account'));
const Branch = React.lazy(() => import('./views/Branch'));
const Shop = React.lazy(() => import('./views/Shop/Shop'));
const Employee = React.lazy(() => import('./views/Employee'));
const CreateProduct = React.lazy(() => import('./views/Product/CreateProduct'));
const SearchProduct = React.lazy(() => import('./views/Product/SearchProduct'));
const ExportCreateBill = React.lazy(() => import('./views/Export/CreateBill'));
const ExportSearchBill = React.lazy(() => import('./views/Export/SearchBill'));
const ImportCreateBill = React.lazy(() => import('./views/Import/CreateBill'));
const ImportSearchBill = React.lazy(() => import('./views/Import/SearchBill'));
const Request = React.lazy(() => import('./views/Request/Request/'));
const Accept = React.lazy(() => import('./views/Request/Accept'));
const SearchRequest = React.lazy(() => import('./views/Request/SearchRequest'));
const SearchAccept = React.lazy(() => import('./views/Request/SearchAccept'));
const SpecLevelBranch = React.lazy(() => import('./views/SpecLevelBranch/'));
const ShopOfDirector = React.lazy(() => import('./views/ShopOfDirector/'));
const EmployeeOfBranch = React.lazy(() => import('./views/EmployeeOfBranch'));
const BranchReport = React.lazy(() => import('./views/BranchReport'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {path: '/', exact: true, name: 'Home', component: DefaultLayout},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard, roles: [ROLES.ROLE_DIRECTOR]},
  {path: '/theme', exact: true, name: 'Theme', component: Colors},
  {path: '/theme/colors', name: 'Colors', component: Colors},
  {path: '/theme/typography', name: 'Typography', component: Typography},
  {path: '/base', exact: true, name: 'Base', component: Cards},
  {path: '/base/cards', name: 'Cards', component: Cards},
  {path: '/base/forms', name: 'Forms', component: Forms, roles: [ROLES.ROLE_DIRECTOR]},
  {path: '/base/switches', name: 'Switches', component: Switches},
  {path: '/base/tables', name: 'Tables', component: Tables},
  {path: '/base/tabs', name: 'Tabs', component: Tabs},
  {path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs},
  {path: '/base/carousels', name: 'Carousel', component: Carousels},
  {path: '/base/collapses', name: 'Collapse', component: Collapses},
  {path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns},
  {path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons},
  {path: '/base/list-groups', name: 'List Groups', component: ListGroups},
  {path: '/base/navbars', name: 'Navbars', component: Navbars},
  {path: '/base/navs', name: 'Navs', component: Navs},
  {path: '/base/paginations', name: 'Paginations', component: Paginations},
  {path: '/base/popovers', name: 'Popovers', component: Popovers},
  {path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar},
  {path: '/base/tooltips', name: 'Tooltips', component: Tooltips},
  {path: '/buttons', exact: true, name: 'Buttons', component: Buttons},
  {path: '/buttons/buttons', name: 'Buttons', component: Buttons},
  {path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns},
  {path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups},
  {path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons},
  {path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons},
  {path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons},
  {path: '/icons/flags', name: 'Flags', component: Flags},
  {path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome},
  {path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons},
  {path: '/notifications', exact: true, name: 'Notifications', component: Alerts},
  {path: '/notifications/alerts', name: 'Alerts', component: Alerts},
  {path: '/notifications/badges', name: 'Badges', component: Badges},
  {path: '/notifications/modals', name: 'Modals', component: Modals},
  {path: '/widgets', name: 'Widgets', component: Widgets},
  {path: '/charts', name: 'Charts', component: Charts},
  {path: '/users', exact: true, name: 'Users', component: Users},
  {path: '/users/:id', exact: true, name: 'User Details', component: User},
  {path: '/admin/role', exact: true, name: 'Quyền Tài Khoản', component: Role, roles: [ROLES.ROLE_ADMIN]},
  {
    path: '/admin/setting-menu',
    exact: true,
    name: 'Cài đặt Danh Mục',
    component: SettingNav,
    roles: [ROLES.ROLE_ADMIN]
  },
  {path: '/admin/account', exact: true, name: 'Tài Khoản', component: Account, roles: [ROLES.ROLE_ADMIN]},
  {path: '/shop/branch', exact: true, name: 'Chi Nhánh', component: Branch, roles: [ROLES.ROLE_DIRECTOR]},
  {path: '/admin/shop', exact: true, name: 'Cửa Hàng', component: Shop, roles: [ROLES.ROLE_ADMIN]},
  {path: '/director/branch', exact: true, name: 'Chi Nhánh', component: Branch, roles: [ROLES.ROLE_DIRECTOR]},
  {path: '/director/employee', exact: true, name: 'Nhân Viên', component: Employee, roles: [ROLES.ROLE_DIRECTOR]},
  {
    path: '/director/shop',
    exact: true,
    name: 'Thông Tin Cửa Hàng',
    component: ShopOfDirector,
    roles: [ROLES.ROLE_DIRECTOR]
  },
  {
    path: '/product/create',
    exact: true,
    name: 'Tạo Sản Phẩm',
    component: CreateProduct,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_EMPLOYEE_EXPORT, ROLES.ROLE_LEADER]
  },
  {
    path: '/product/search',
    exact: true,
    name: 'Tra Cứu',
    component: SearchProduct,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_EMPLOYEE_EXPORT, ROLES.ROLE_LEADER]
  },
  {
    path: '/export/create-bill',
    exact: true,
    name: 'Lập Hóa Đơn',
    component: ExportCreateBill,
    roles: [ROLES.ROLE_EMPLOYEE_EXPORT, ROLES.ROLE_LEADER],
  },
  {
    path: '/export/search-bill',
    exact: true,
    name: 'Tra Cứu Hóa Đơn',
    component: ExportSearchBill,
    roles: [ROLES.ROLE_EMPLOYEE_EXPORT, ROLES.ROLE_LEADER],
  },
  {
    path: '/import/create-bill',
    exact: true,
    name: 'Lập Hóa Đơn',
    component: ImportCreateBill,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_LEADER],
    isMainBranch: true
  },
  {
    path: '/import/search-bill',
    exact: true,
    name: 'Tra Cứu Hóa Đơn',
    component: ImportSearchBill,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_LEADER],
    isMainBranch: true
  },
  {
    path: '/request/request-product',
    exact: true,
    name: 'Lập Phiếu Yêu Cầu',
    component: Request,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_LEADER],
    isMainBranch: false
  },
  {
    path: '/request/search-request-product',
    exact: true,
    name: 'Tra Cứu Phiếu Yêu Cầu',
    component: SearchRequest,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_LEADER],
    isMainBranch: false
  },
  {
    path: '/request/accept-request-product',
    exact: true,
    name: 'Xác Nhận Yêu Cầu',
    component: Accept,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_LEADER],
    isMainBranch: true
  },
  {
    path: '/request/search-accept-product',
    exact: true,
    name: 'Tra Cứu Xác Nhận',
    component: SearchAccept,
    roles: [ROLES.ROLE_EMPLOYEE_IMPORT, ROLES.ROLE_LEADER],
    isMainBranch: true
  },
  {
    path: '/level-spec-branch',
    exact: true,
    name: 'Bản Quy Định Cấp Độ Chi Nhánh',
    component: SpecLevelBranch,
    roles: [ROLES.ROLE_DIRECTOR]
  },
  {
    path: '/control-branch/employee',
    exact: true,
    name: 'Quản Lý Nhân Viên',
    component: EmployeeOfBranch,
    roles: [ROLES.ROLE_LEADER]
  },{
    path: '/control-branch/report',
    exact: true,
    name: 'Thông kê Chi Nhánh',
    component: BranchReport,
    roles: [ROLES.ROLE_LEADER]
  }
];


export default routes;
