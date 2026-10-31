const iconPaths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  file: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"/><path d="M13 3v7h7"/>',
  checkSquare: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7 12 3 3 7-7"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  alert: '<path d="m12 3 9 17H3z"/><path d="M12 9v4m0 3h.01"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  tool: '<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 12l-3-3z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 3 6-7"/>',
  form: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  plusCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8m-4-4h8"/>',
  minusCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5m-5 5V3"/>',
  menu: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9m-1-11.8a4 4 0 0 1 0 7.8"/>',
  wallet: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 8h18M16 14h2"/>',
  briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  edit: '<path d="m16 4 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15z"/>'
};

const topDeals = [
  { name: 'Michael Jordan', email: 'michael.jordan@example.com', amount: '$2,893', initials: 'MJ', color: '#b4856e' },
  { name: 'Emige Kilenda', email: 'emige.kilenda@gmail.com', amount: '$4,289', initials: 'EK', color: '#ff9b66' },
  { name: 'Randy Origogo', email: 'randy.origogo@gmail.com', amount: '$6,347', initials: 'RO', color: '#263b4c' },
  { name: 'George Peterson', email: 'george.peterson@gmail.com', amount: '$3,894', initials: 'GP', color: '#9ad9c2' },
  { name: 'Kiara Advion', email: 'kiara.advion@gmail.com', amount: '$2,679', initials: 'KA', color: '#e7a4cc' }
];

const statistics = [
  { title: 'Total Customers', value: '102,890', trend: '+40%', icon: 'users', path: 'M1 12 9 8l9 4 8-7 9 6 8-5 9 5 8-7 9 4 9-2 8 4' },
  { title: 'Total Revenue', value: '$56,562', trend: '+25%', icon: 'wallet', path: 'M1 12 8 8l8 3 8-6 8 7 8-4 8 3 8-6 9 5' },
  { title: 'Conversion Ratio', value: '12.08%', trend: '-12%', icon: 'chart', path: 'M1 13 8 12l8-5 7 7 8-10 8 7 8-2 9 5' },
  { title: 'Total Deals', value: '2,543', trend: '+16%', icon: 'briefcase', path: 'M1 9 8 7l8 2 7 4 8-4 8 2 8-5 9 4' }
];

const sources = [
  { name: 'Mobile', value: '1,624' },
  { name: 'Desktop', value: '1,267' },
  { name: 'Laptop', value: '1,153' },
  { name: 'Tablet', value: '679' }
];

const dealStatuses = [
  { label: 'Successful Deals', value: '687 deals' },
  { label: 'Pending Deals', value: '1,073 deals' },
  { label: 'Rejected Deals', value: '1,659 deals' },
  { label: 'Upcoming Deals', value: '621 deals' }
];

const activities = [
  { title: 'Update of calendar events', detail: 'Added new events in next week.', time: '4.30PM' },
  { title: 'New theme for Nexora Website', detail: 'Completed', time: '3 hrs' },
  { title: 'Created a new Task today', detail: '', time: '11:22 AM' },
  { title: 'New member joined today', detail: '', time: 'Today' },
  { title: '32 New people joined summit.', detail: '', time: '22 hrs' },
  { title: 'Monthly sales report published', detail: 'Your report is ready to view.', time: 'Yesterday' },
  { title: 'New deal moved to negotiation', detail: 'Sales team updated the deal.', time: '2 days' }
];

const deals = [
  { name: 'Mayer Kofy', initials: 'MK', category: 'Manufacture', email: 'mayerkofy@gmail.com', location: 'Germany', date: 'Sep 15 - Oct 12, 2029', amount: 4299 },
  { name: 'Andrew Garfield', initials: 'AG', category: 'Development', email: 'andrewg@gmail.com', location: 'Canada', date: 'Apr 10 - Oct 12, 2023', amount: 2679 },
  { name: 'Simon Cowell', initials: 'SC', category: 'Service', email: 'simonc@gmail.com', location: 'Kenya', date: 'Sep 15 - Oct 12, 2029', amount: 6347 },
  { name: 'Michael Hen', initials: 'MH', category: 'Marketing', email: 'michaelhen@gmail.com', location: 'USA', date: 'Apr 14 - Dec 14, 2023', amount: 3894 },
  { name: 'Jacob Smith', initials: 'JS', category: 'Social Platform', email: 'jacobsmith@gmail.com', location: 'Singapore', date: 'Feb 25 - Nov 26, 2029', amount: 2893 }
];

const pageViews = {
  CRM: {
    description: 'Manage leads, contacts, and customer relationships.',
    action: 'Add lead',
    metrics: [['1,248', 'Total leads', '↑ 12.8%'], ['846', 'Qualified', '68% of leads'], ['32', 'Due today', 'Follow up'], ['$284k', 'Pipeline value', 'This month']],
    tableTitle: 'Recent leads',
    columns: ['Lead', 'Company', 'Source', 'Status'],
    rows: [['Olivia Rhye', 'Layers Studio', 'Website', 'Qualified'], ['Phoenix Baker', 'Circles', 'Referral', 'Contacted'], ['Lana Steiner', 'Catalog', 'LinkedIn', 'New'], ['Demi Wilkinson', 'Sisyphus', 'Campaign', 'Qualified'], ['Candice Wu', 'Quotient', 'Website', 'New']],
    sideTitle: 'Lead activity',
    sideItems: [['New leads today', '18'], ['Follow-ups due', '32'], ['Conversion rate', '12.8%']],
    chart: 'Leads over the last 7 days', type: 'table'
  },
  Ecommerce: {
    description: 'Monitor store performance, orders, and product activity.',
    action: 'Add product',
    metrics: [['$24,680', 'Gross sales', '↑ 8.2%'], ['384', 'Orders', 'This month'], ['1,842', 'Products', '12 low stock'], ['3.8%', 'Conversion', '↑ 0.6%']],
    tableTitle: 'Latest orders',
    columns: ['Order', 'Customer', 'Date', 'Total', 'Status'],
    rows: [['#NX-2048', 'Olivia Rhye', 'Oct 31, 2026', '$240.00', 'Paid'], ['#NX-2047', 'Phoenix Baker', 'Oct 30, 2026', '$128.50', 'Processing'], ['#NX-2046', 'Lana Steiner', 'Oct 30, 2026', '$86.00', 'Shipped'], ['#NX-2045', 'Demi Wilkinson', 'Oct 29, 2026', '$312.00', 'Paid']],
    sideTitle: 'Store summary',
    sideItems: [['Average order', '$64.27'], ['Refunds', '8 orders'], ['Cart abandonment', '21.4%']],
    chart: 'Orders this week', type: 'table'
  },
  Crypto: {
    description: 'A sample overview of digital assets and portfolio activity.',
    action: 'Add asset',
    metrics: [['$48,290', 'Portfolio value', '↑ 5.2%'], ['12', 'Assets held', 'Across 4 chains'], ['$2,840', '24h change', '+2.4%'], ['18', 'Transactions', 'This week']],
    tableTitle: 'Asset watchlist',
    columns: ['Asset', 'Symbol', 'Price', '24h change', 'Allocation'],
    rows: [['Bitcoin', 'BTC', '$67,240', '+2.8%', '42%'], ['Ethereum', 'ETH', '$3,420', '+1.4%', '28%'], ['Solana', 'SOL', '$178.20', '+4.2%', '16%'], ['USD Coin', 'USDC', '$1.00', '0.0%', '14%']],
    sideTitle: 'Market snapshot',
    sideItems: [['Market cap', '$2.42T'], ['24h volume', '$84.6B'], ['BTC dominance', '54.2%']],
    chart: 'Portfolio movement', type: 'table'
  },
  Jobs: {
    description: 'Track open roles, candidates, and hiring progress.',
    action: 'Post a job',
    metrics: [['24', 'Open positions', 'Across 6 teams'], ['186', 'Applicants', 'This month'], ['38', 'In interview', '12 scheduled'], ['12', 'Offers sent', '8 accepted']],
    tableTitle: 'Open positions',
    columns: ['Position', 'Department', 'Applicants', 'Location', 'Status'],
    rows: [['Product Designer', 'Design', '42', 'Remote', 'Active'], ['Frontend Engineer', 'Engineering', '36', 'New York', 'Active'], ['Marketing Manager', 'Marketing', '28', 'London', 'Review'], ['People Partner', 'People', '19', 'Remote', 'Active']],
    sideTitle: 'Hiring progress',
    sideItems: [['Screening', '46 candidates'], ['Interview', '38 candidates'], ['Final round', '12 candidates']],
    chart: 'Applications this month', type: 'table'
  },
  NFT: {
    description: 'Explore a demo portfolio of digital collectibles.',
    action: 'Add collectible',
    metrics: [['128', 'Collectibles', 'Across 9 collections'], ['14.8 ETH', 'Portfolio value', '↑ 3.1%'], ['9', 'Collections', '4 favorites'], ['6', 'Listed items', '2 new offers']],
    tableTitle: 'Featured collectibles',
    columns: ['Collectible', 'Collection', 'Floor price', 'Last activity', 'Status'],
    rows: [['Neon Horizon #204', 'Nexora Worlds', '1.8 ETH', '2 hours ago', 'Owned'], ['Pixel Garden #091', 'Garden Club', '0.6 ETH', 'Yesterday', 'Listed'], ['Orbit 08', 'Orbital', '2.4 ETH', 'Oct 28, 2026', 'Owned'], ['Golden Hour #17', 'Sunset Society', '1.2 ETH', 'Oct 27, 2026', 'Offer']],
    sideTitle: 'Collection overview',
    sideItems: [['Top collection', 'Nexora Worlds'], ['Items listed', '6 of 128'], ['Offers received', '3 active']],
    chart: 'Collection activity', type: 'table'
  },
  Sales: {
    description: 'Review pipeline health, revenue targets, and recent deals.',
    action: 'Create deal',
    metrics: [['$186.4k', 'Pipeline', '↑ 14.2%'], ['42', 'Open deals', 'Across 5 stages'], ['$52.8k', 'Won this month', '12 deals'], ['28.4%', 'Win rate', '↑ 3.6%']],
    tableTitle: 'Sales pipeline',
    columns: ['Deal', 'Account', 'Owner', 'Value', 'Stage'],
    rows: [['Atlas renewal', 'Atlas Co.', 'Mayer Kofy', '$18,400', 'Negotiation'], ['Studio expansion', 'Layers Studio', 'Andrew Garfield', '$12,800', 'Proposal'], ['Annual platform', 'Sisyphus', 'Simon Cowell', '$9,600', 'Discovery'], ['Northstar rollout', 'Northstar', 'Michael Hen', '$22,500', 'Qualified']],
    sideTitle: 'Pipeline by stage',
    sideItems: [['Qualified', '$48.2k'], ['Proposal', '$62.4k'], ['Negotiation', '$75.8k']],
    chart: 'Monthly sales', type: 'table'
  },
  Analytics: {
    description: 'Understand trends across acquisition, engagement, and revenue.',
    action: 'Create report',
    metrics: [['84.6k', 'Visitors', '↑ 18.4%'], ['12.8%', 'Conversion rate', '↑ 1.2%'], ['4m 32s', 'Avg. session', '↑ 8.6%'], ['$6.42', 'Revenue / visitor', 'This month']],
    tableTitle: 'Top pages',
    columns: ['Page', 'Visitors', 'Conversion', 'Bounce rate', 'Trend'],
    rows: [['/products/studio', '12,840', '8.4%', '28.2%', '+18%'], ['/pricing', '9,624', '6.8%', '32.1%', '+12%'], ['/resources', '8,210', '4.2%', '38.4%', '+8%'], ['/about', '6,742', '2.6%', '42.8%', '+4%']],
    sideTitle: 'Traffic sources',
    sideItems: [['Organic search', '42%'], ['Direct', '28%'], ['Social', '18%'], ['Referral', '12%']],
    chart: 'Visitors over time', type: 'table'
  },
  Projects: {
    description: 'Coordinate project timelines, teams, and delivery milestones.',
    action: 'New project',
    metrics: [['18', 'Active projects', 'Across 4 teams'], ['76%', 'On track', '14 projects'], ['8', 'Due this week', '4 milestones'], ['24', 'Team members', 'Available now']],
    tableTitle: 'Project portfolio',
    columns: ['Project', 'Owner', 'Due date', 'Progress', 'Status'],
    rows: [['Website refresh', 'Olivia Rhye', 'Nov 14, 2026', '78%', 'On track'], ['Mobile app v2', 'Phoenix Baker', 'Nov 28, 2026', '54%', 'In progress'], ['Brand guidelines', 'Lana Steiner', 'Dec 05, 2026', '92%', 'On track'], ['Customer portal', 'Demi Wilkinson', 'Dec 18, 2026', '31%', 'At risk']],
    sideTitle: 'Upcoming milestones',
    sideItems: [['Design review', 'Today · 2:30 PM'], ['Beta handoff', 'Nov 03'], ['Launch planning', 'Nov 06']],
    chart: 'Project progress', type: 'table'
  },
  HRM: {
    description: 'A sample view of team members, attendance, and people operations.',
    action: 'Add employee',
    metrics: [['248', 'Team members', 'Across 8 teams'], ['12', 'On leave today', '5 pending'], ['94.8%', 'Attendance', 'This month'], ['6', 'Open roles', 'Hiring']],
    tableTitle: 'Team directory',
    columns: ['Employee', 'Department', 'Role', 'Location', 'Status'],
    rows: [['Olivia Rhye', 'Design', 'Product Designer', 'New York', 'Active'], ['Phoenix Baker', 'Engineering', 'Staff Engineer', 'Remote', 'Active'], ['Lana Steiner', 'People', 'HR Partner', 'London', 'On leave'], ['Demi Wilkinson', 'Marketing', 'Brand Lead', 'Toronto', 'Active']],
    sideTitle: 'People overview',
    sideItems: [['New starters', '4 this month'], ['Anniversaries', '3 upcoming'], ['Pending reviews', '12 employees']],
    chart: 'Team growth', type: 'table'
  },
  Stocks: {
    description: 'A sample watchlist and portfolio performance overview.',
    action: 'Add to watchlist',
    metrics: [['$28,642', 'Portfolio value', '↑ 4.8%'], ['$1,284', 'Today’s change', '+1.6%'], ['8', 'Holdings', '3 sectors'], ['12', 'Watchlist', '2 alerts']],
    tableTitle: 'Market watchlist',
    columns: ['Company', 'Ticker', 'Price', 'Change', 'Market cap'],
    rows: [['Apple Inc.', 'AAPL', '$245.18', '+1.42%', '$3.72T'], ['NVIDIA Corp.', 'NVDA', '$141.32', '+2.86%', '$3.46T'], ['Microsoft', 'MSFT', '$431.22', '-0.34%', '$3.21T'], ['Amazon.com', 'AMZN', '$223.45', '+0.82%', '$2.34T']],
    sideTitle: 'Sector allocation',
    sideItems: [['Technology', '48%'], ['Consumer', '27%'], ['Healthcare', '15%'], ['Other', '10%']],
    chart: 'Portfolio performance', type: 'table'
  },
  Coursee: {
    description: 'Manage course content, enrollment, and learner progress.',
    action: 'Create course',
    metrics: [['36', 'Courses', '8 published'], ['2,840', 'Learners', '↑ 12%'], ['78%', 'Completion', 'This term'], ['14', 'Instructors', '3 online']],
    tableTitle: 'Course catalog',
    columns: ['Course', 'Instructor', 'Learners', 'Updated', 'Status'],
    rows: [['Product Design Basics', 'Olivia Rhye', '482', 'Oct 29, 2026', 'Published'], ['Data Storytelling', 'Phoenix Baker', '316', 'Oct 27, 2026', 'Published'], ['Team Leadership', 'Lana Steiner', '208', 'Oct 22, 2026', 'Draft'], ['Web Accessibility', 'Demi Wilkinson', '174', 'Oct 18, 2026', 'Published']],
    sideTitle: 'Learning snapshot',
    sideItems: [['New enrollments', '86 this week'], ['Course reviews', '4.8 / 5'], ['Certificates issued', '142']],
    chart: 'Enrollments this month', type: 'table'
  },
  Personal: {
    description: 'A personal workspace for priorities, notes, and reminders.',
    action: 'Add task',
    metrics: [['8', 'My tasks', '3 due today'], ['4', 'Completed', 'This week'], ['2', 'Notes', 'Recently updated'], ['86%', 'Focus time', 'Weekly goal']],
    tableTitle: 'My priorities',
    columns: ['Task', 'Project', 'Due', 'Priority', 'Status'],
    rows: [['Review Q4 goals', 'Planning', 'Today', 'High', 'In progress'], ['Share design feedback', 'Website refresh', 'Today', 'Medium', 'To do'], ['Prepare team update', 'Operations', 'Nov 02', 'Medium', 'To do'], ['Read research notes', 'Product', 'Nov 04', 'Low', 'Completed']],
    sideTitle: 'Quick notes',
    sideItems: [['Ideas to review', '3 notes'], ['Pinned links', '5 links'], ['Last updated', 'Today, 9:42 AM']],
    chart: 'Weekly focus', type: 'table'
  },
  Pages: {
    description: 'Review and organize the pages in your workspace.',
    action: 'Create page',
    metrics: [['24', 'Total pages', 'Across 4 spaces'], ['18', 'Published', '75% of pages'], ['4', 'Drafts', 'Ready to review'], ['2', 'Scheduled', 'Coming soon']],
    tableTitle: 'Page library',
    columns: ['Page', 'Owner', 'Last edited', 'Visibility', 'Status'],
    rows: [['Getting started', 'Json Taylor', 'Today, 10:42 AM', 'Workspace', 'Published'], ['Product roadmap', 'Olivia Rhye', 'Yesterday', 'Team', 'Published'], ['Design principles', 'Lana Steiner', 'Oct 28, 2026', 'Workspace', 'Draft'], ['Release notes', 'Phoenix Baker', 'Oct 26, 2026', 'Public', 'Scheduled']],
    sideTitle: 'Publishing',
    sideItems: [['Published this month', '6 pages'], ['Pending review', '3 pages'], ['Scheduled', '2 pages']],
    chart: 'Recent page activity', type: 'table'
  },
  Task: {
    description: 'Plan work, assign owners, and track progress across your team.',
    action: 'Create task',
    metrics: [['48', 'Open tasks', 'Across 6 projects'], ['12', 'Due today', '4 overdue'], ['82%', 'Completed', 'This month'], ['16', 'Team members', 'Contributors']],
    tableTitle: 'Task board',
    columns: ['Task', 'Assignee', 'Project', 'Due date', 'Status'],
    rows: [['Finalize campaign brief', 'Olivia Rhye', 'Fall campaign', 'Today', 'In progress'], ['Review checkout flow', 'Phoenix Baker', 'Storefront', 'Nov 02', 'To do'], ['Update help center', 'Demi Wilkinson', 'Support', 'Nov 03', 'Review'], ['Share launch checklist', 'Lana Steiner', 'Product', 'Nov 05', 'To do']],
    sideTitle: 'My task summary',
    sideItems: [['Assigned to me', '8 tasks'], ['Due this week', '12 tasks'], ['Completed today', '4 tasks']],
    chart: 'Task progress', type: 'kanban'
  },
  Authentication: {
    description: 'Preview account access and identity interface patterns.',
    action: 'Preview sign in',
    metrics: [['2,408', 'Demo accounts', 'Sample only'], ['98.6%', 'Sign-in success', 'Illustrative'], ['2', 'Access methods', 'Email · SSO'], ['0', 'Security alerts', 'Demo status']],
    tableTitle: 'Access activity',
    columns: ['User', 'Method', 'Date', 'Device', 'Result'],
    rows: [['Json Taylor', 'Email', 'Today, 10:14 AM', 'Chrome · macOS', 'Successful'], ['Olivia Rhye', 'Single sign-on', 'Today, 9:46 AM', 'Safari · iOS', 'Successful'], ['Phoenix Baker', 'Email', 'Yesterday', 'Chrome · Windows', 'Successful'], ['Lana Steiner', 'Single sign-on', 'Oct 29, 2026', 'Firefox · Linux', 'Successful']],
    sideTitle: 'Sign-in preview',
    sideItems: [['Email sign-in', 'Available'], ['Single sign-on', 'Available'], ['Two-step verification', 'UI preview']],
    chart: 'Access activity', type: 'auth'
  },
  Error: {
    description: 'Preview the branded empty, unavailable, and error states.',
    action: 'Preview 404 page',
    metrics: [['404', 'Page not found', 'UI preview'], ['500', 'Server error', 'UI preview'], ['403', 'Access denied', 'UI preview'], ['0', 'Live incidents', 'Sample workspace']],
    tableTitle: 'Error state gallery',
    columns: ['State', 'Example', 'Suggested action', 'Preview'],
    rows: [['Not found', 'This page could not be found.', 'Return to dashboard', 'Open'], ['Access denied', 'You don’t have permission.', 'Request access', 'Open'], ['Unavailable', 'This service is unavailable.', 'Try again', 'Open'], ['Empty results', 'Nothing matches your search.', 'Clear filters', 'Open']],
    sideTitle: 'Design checklist',
    sideItems: [['Clear explanation', 'Required'], ['Recovery action', 'Included'], ['Help contact', 'Optional']],
    chart: 'Error page preview', type: 'errors'
  },
  Calendar: {
    description: 'A shared calendar view for upcoming team events.',
    action: 'Create event',
    metrics: [['12', 'Events this month', 'Across 3 calendars'], ['4', 'Today', 'Next at 11:30 AM'], ['3', 'Invitations', 'Need a reply'], ['8', 'Team members', 'Sharing calendar']],
    tableTitle: 'October 2026',
    columns: ['Event', 'Date', 'Time', 'Calendar', 'Guests'],
    rows: [['Product team sync', 'Oct 31, 2026', '11:30 AM', 'Product', '8 guests'], ['Design review', 'Oct 31, 2026', '2:00 PM', 'Design', '5 guests'], ['Monthly all hands', 'Nov 03, 2026', '10:00 AM', 'Company', '42 guests'], ['Planning workshop', 'Nov 05, 2026', '1:30 PM', 'Product', '12 guests']],
    sideTitle: 'Upcoming events',
    sideItems: [['Product team sync', 'Today · 11:30 AM'], ['Design review', 'Today · 2:00 PM'], ['Monthly all hands', 'Nov 03 · 10:00 AM']],
    chart: 'October 2026', type: 'calendar'
  },
  Email: {
    description: 'Browse a demo inbox and message reading experience.',
    action: 'Compose email',
    metrics: [['4', 'Unread', 'Across 2 folders'], ['28', 'Inbox', 'Last 30 days'], ['6', 'Starred', 'Important'], ['2', 'Drafts', 'Not sent']],
    tableTitle: 'Inbox',
    columns: ['Sender', 'Subject', 'Preview', 'Received'],
    rows: [['Olivia Rhye', 'Project update', 'The latest design files are ready for review…', '10:42 AM'], ['Phoenix Baker', 'Sprint planning', 'I’ve added the next sprint priorities…', '9:18 AM'], ['Lana Steiner', 'Welcome to the team', 'Sharing a few useful resources to get started…', 'Yesterday'], ['Demi Wilkinson', 'Campaign brief', 'Could you take a look at the new brief…', 'Oct 29']],
    sideTitle: 'Mailboxes',
    sideItems: [['Inbox', '28'], ['Starred', '6'], ['Drafts', '2'], ['Archive', '104']],
    chart: 'Inbox preview', type: 'inbox'
  },
  Chat: {
    description: 'Preview team conversations and a sample chat thread.',
    action: 'New message',
    metrics: [['8', 'Conversations', '3 unread'], ['6', 'Online', 'Team members'], ['2', 'Mentions', 'Need a reply'], ['14', 'Files shared', 'This week']],
    tableTitle: 'Team messages',
    columns: ['Conversation', 'Members', 'Last message', 'Updated'],
    rows: [['Design team', '8 members', 'Olivia: The new mockups are ready', '2 min ago'], ['Project launch', '5 members', 'Phoenix: Checklist is updated', '18 min ago'], ['General', '24 members', 'Lana: Welcome aboard!', '1 hr ago'], ['Support handoff', '4 members', 'Demi: I’ve shared the notes', 'Yesterday']],
    sideTitle: 'Your conversations',
    sideItems: [['Design team', '3 new messages'], ['Project launch', '1 new message'], ['General', 'Mentioned you']],
    chart: 'Chat preview', type: 'chat'
  },
  'File Manager': {
    description: 'Browse and organize files in a sample workspace.',
    action: 'Upload file',
    metrics: [['248', 'Total files', 'Across 12 folders'], ['4.2 GB', 'Storage used', 'Of 10 GB'], ['18', 'Shared with me', '6 recently'], ['7', 'Recent files', 'This week']],
    tableTitle: 'Recent files',
    columns: ['Name', 'Owner', 'Modified', 'File size', 'Access'],
    rows: [['Brand-guidelines.pdf', 'Olivia Rhye', 'Today, 9:42 AM', '4.8 MB', 'Team'], ['Q4-planning.xlsx', 'Json Taylor', 'Yesterday', '1.2 MB', 'Private'], ['Homepage-final.fig', 'Phoenix Baker', 'Oct 29, 2026', '28.4 MB', 'Team'], ['Campaign-assets.zip', 'Demi Wilkinson', 'Oct 28, 2026', '82 MB', 'Shared']],
    sideTitle: 'Storage',
    sideItems: [['Documents', '1.8 GB'], ['Design assets', '1.6 GB'], ['Media', '0.8 GB']],
    chart: 'File library', type: 'files'
  },
  'UI Elements': {
    description: 'A small gallery of reusable interface elements.',
    action: 'Add component',
    metrics: [['12', 'Buttons', '3 variants'], ['8', 'Form controls', 'Input · select'], ['6', 'Badges', 'Status styles'], ['4', 'Overlays', 'Menus · dialogs']],
    tableTitle: 'Component preview',
    columns: ['Element', 'Variant', 'Usage', 'Preview'],
    rows: [['Primary button', 'Orange', 'Main action', 'Enabled'], ['Status badge', 'Success', 'Completion state', 'Enabled'], ['Search field', 'Compact', 'Inline filtering', 'Enabled'], ['Info card', 'Default', 'Summary content', 'Enabled']],
    sideTitle: 'Component states',
    sideItems: [['Default', 'Ready'], ['Hover', 'Preview'], ['Disabled', 'Preview']],
    chart: 'Reusable patterns', type: 'elements'
  },
  Utilities: {
    description: 'Preview small productivity tools and workspace settings.',
    action: 'Add shortcut',
    metrics: [['6', 'Shortcuts', 'Pinned tools'], ['3', 'Quick links', 'Frequently used'], ['2', 'Preferences', 'Personal setup'], ['100%', 'Workspace', 'Demo ready']],
    tableTitle: 'Workspace tools',
    columns: ['Tool', 'Purpose', 'Last used', 'Availability'],
    rows: [['Color palette', 'Preview design tokens', 'Today', 'Available'], ['Date calculator', 'Compare date ranges', 'Yesterday', 'Available'], ['Text formatter', 'Format sample content', 'Oct 29, 2026', 'Available'], ['Unit converter', 'Convert common units', 'Oct 27, 2026', 'Available']],
    sideTitle: 'Preferences',
    sideItems: [['Compact mode', 'Off'], ['Keyboard shortcuts', 'On'], ['Start page', 'Dashboard']],
    chart: 'Quick settings', type: 'utilities'
  },
  Charts: {
    description: 'Explore the chart styles available in this dashboard.',
    action: 'Add chart',
    metrics: [['4', 'Chart styles', 'Line · bar · ring'], ['12', 'Color tokens', 'Accessible palette'], ['3', 'Data series', 'Sample values'], ['100%', 'Responsive', 'Scales to width']],
    tableTitle: 'Chart gallery',
    columns: ['Chart', 'Type', 'Data range', 'Status'],
    rows: [['Revenue overview', 'Line chart', 'Last 12 months', 'Ready'], ['Weekly activity', 'Bar chart', 'Last 7 days', 'Ready'], ['Traffic sources', 'Donut chart', 'Current month', 'Ready'], ['Goal progress', 'Progress ring', 'Current quarter', 'Ready']],
    sideTitle: 'Chart settings',
    sideItems: [['Animation', 'Reduced'], ['Legend', 'Visible'], ['Grid lines', 'Subtle']],
    chart: 'Chart styles', type: 'charts'
  },
  Forms: {
    description: 'Preview common fields and form layouts using local demo state.',
    action: 'Create form',
    metrics: [['5', 'Field types', 'Text · select · date'], ['3', 'Form layouts', 'Inline · stacked'], ['2', 'Validation states', 'Ready to preview'], ['0', 'Submissions', 'No data sent']],
    tableTitle: 'Form library',
    columns: ['Form', 'Fields', 'Last updated', 'Purpose', 'Preview'],
    rows: [['Contact details', '4 fields', 'Today', 'Profile setup', 'Open'], ['Task request', '5 fields', 'Yesterday', 'Work intake', 'Open'], ['Feedback form', '3 fields', 'Oct 28, 2026', 'Product feedback', 'Open'], ['Event signup', '4 fields', 'Oct 26, 2026', 'Registration', 'Open']],
    sideTitle: 'Field preview',
    sideItems: [['Text input', 'Available'], ['Select menu', 'Available'], ['Date field', 'Available']],
    chart: 'Form examples', type: 'forms'
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || ''}</svg>`;
const safeText = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

function showToast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.hidden = false;
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => { element.hidden = true; }, 2400);
}

function renderActivities(showAll) {
  $('#activityList').innerHTML = (showAll ? activities : activities.slice(0, 5)).map((item) =>
    `<li class="activity-item"><strong>${safeText(item.title)}</strong><time>${safeText(item.time)}</time>${item.detail ? `<p>${safeText(item.detail)}</p>` : ''}</li>`
  ).join('');
  $('#showMore').textContent = showAll ? 'Show Less' : 'Show More';
  $('#showMore').setAttribute('aria-expanded', String(showAll));
}

let sortAscending = null;
let tableQuery = '';

function renderDeals() {
  const filtered = deals.filter((deal) => [deal.name, deal.category, deal.email, deal.location, deal.date, deal.amount].join(' ').toLowerCase().includes(tableQuery.toLowerCase()));
  const sorted = sortAscending === null ? filtered : [...filtered].sort((a, b) => sortAscending ? a.amount - b.amount : b.amount - a.amount);
  $('#dealsTableBody').innerHTML = sorted.map((deal, index) => `
    <tr>
      <td><input type="checkbox" class="row-select" aria-label="Select ${safeText(deal.name)}"></td>
      <td><span class="rep-cell"><span class="avatar" style="background:${['#9b634c', '#384d5a', '#222e37', '#be8064', '#6f8594'][index % 5]}">${safeText(deal.initials)}</span>${safeText(deal.name)}</span></td>
      <td>${safeText(deal.category)}</td><td>${safeText(deal.email)}</td>
      <td><span class="location-badge ${deal.location === 'Singapore' ? 'green' : ''}">${safeText(deal.location)}</span></td>
      <td>${safeText(deal.date)}</td><td><strong>$${deal.amount.toLocaleString('en-US')}</strong></td>
      <td><span class="row-actions"><button type="button" data-action="view" aria-label="View ${safeText(deal.name)}">${icon('eye')}</button><button type="button" data-action="edit" aria-label="Edit ${safeText(deal.name)}">${icon('edit')}</button></span></td>
    </tr>`).join('');
  $('#entryCount').textContent = tableQuery ? `Showing ${sorted.length} of 5 Entries` : 'Showing 5 Entries';
  $('#selectAll').checked = false;
  $('#selectAll').indeterminate = false;
}

$$('[data-icon]').forEach((element) => { element.innerHTML = icon(element.dataset.icon); });
$('#topDealsList').innerHTML = topDeals.map((deal) => `
  <div class="deal-person"><span class="avatar" style="background:${deal.color}">${safeText(deal.initials)}</span>
  <span class="deal-person-copy"><strong>${safeText(deal.name)}</strong><small>${safeText(deal.email)}</small></span><strong class="amount">${safeText(deal.amount)}</strong></div>`).join('');

$('#statsGrid').innerHTML = statistics.map((stat) => `
  <article class="stat-card"><span class="stat-icon">${icon(stat.icon)}</span><span class="stat-label">${safeText(stat.title)}</span><strong class="stat-value">${safeText(stat.value)}</strong>
  <svg class="sparkline" viewBox="0 0 82 18" preserveAspectRatio="none" aria-hidden="true"><path d="${stat.path}"/></svg>
  <div class="stat-bottom"><button class="view-all" type="button" data-view="${safeText(stat.title)}">View All <span>→</span></button><span class="trend ${stat.trend.startsWith('-') ? 'negative' : ''}"><strong>${safeText(stat.trend)}</strong><small>This month</small></span></div></article>`).join('');
$('#profitBars').innerHTML = [62, 53, 78, 100, 79, 74, 88].map((height, index) => `<div class="profit-bar" style="height:${height}%"><span>${'SMTWTFS'[index]}</span></div>`).join('');
$('#sourceLegend').innerHTML = sources.map((source) => `<div class="source-item"><span><i></i>${safeText(source.name)}</span><strong>${safeText(source.value)}</strong></div>`).join('');
$('#dealStatusList').innerHTML = dealStatuses.map((status) => `<div class="deal-status-row"><i></i><span>${safeText(status.label)}</span><span>${safeText(status.value)}</span></div>`).join('');
renderActivities(false);
renderDeals();

let activeAdminPage = 'Dashboards';
let pageSearchQuery = '';
let activePageTab = 'Overview';
let emailPreviewIndex = 0;
const chatReplies = [];

function renderPageMetrics(config) {
  $('#pageMetrics').innerHTML = config.metrics.map((metric, index) => `
    <article class="page-metric"><span class="page-metric-icon">${['↗', '▤', '◷', '◇'][index]}</span>
      <strong>${safeText(metric[0])}</strong><small>${safeText(metric[1])} · ${safeText(metric[2])}</small></article>`).join('');
}

function statusClass(value) {
  const normalized = value.toLowerCase().replace(/\s+/g, '-');
  if (['active', 'qualified', 'published', 'paid', 'successful', 'owned', 'on-track', 'available', 'ready', 'completed'].includes(normalized)) return 'success';
  if (['new', 'pending', 'review', 'draft', 'scheduled', 'offer', 'to-do', 'at-risk'].includes(normalized)) return 'pending';
  if (['processing', 'shipped', 'in-progress', 'negotiation', 'proposal'].includes(normalized)) return 'progress';
  if (['closed', 'inactive', 'archived'].includes(normalized)) return 'closed';
  return '';
}

function renderPageTable(config) {
  const rows = config.rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.join(' ').toLowerCase().includes(pageSearchQuery.toLowerCase()));
  const body = rows.length
    ? rows.map(({ row, index }) => `<tr data-page-row="${index}">${row.map((cell, cellIndex) => {
      const lastColumn = cellIndex === row.length - 1;
      const isStatus = lastColumn && statusClass(cell);
      if (isStatus) return `<td><span class="page-table-status ${statusClass(cell)}">${safeText(cell)}</span></td>`;
      if (lastColumn && ['Preview', 'Open', 'Enabled'].includes(cell)) return `<td><div class="page-table-actions"><button type="button" data-page-row-action="${index}">${safeText(cell)}</button></div></td>`;
      if (cellIndex === 0) return `<td><strong>${safeText(cell)}</strong></td>`;
      return `<td>${safeText(cell)}</td>`;
    }).join('')}</tr>`).join('')
    : `<tr><td class="page-table-empty" colspan="${config.columns.length}">No ${safeText(config.tableTitle.toLowerCase())} match “${safeText(pageSearchQuery)}”.</td></tr>`;

  return `<div class="page-main-card" id="pageTableCard">
    <div class="page-card-heading"><div><h2>${safeText(config.tableTitle)}</h2><p>${rows.length} ${rows.length === 1 ? 'record' : 'records'} · Demo workspace</p></div>
      <div class="page-card-heading-actions"><label class="page-filter">${icon('search')}<input id="pageSearch" type="search" value="${safeText(pageSearchQuery)}" placeholder="Search..." aria-label="Search ${safeText(config.tableTitle)}"></label><button class="page-quiet-button" type="button" data-page-export>Export</button></div></div>
    <div class="page-table-wrap"><table class="page-table"><thead><tr>${config.columns.map((column) => `<th scope="col">${safeText(column)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>
    <div class="page-pagination"><span>Showing ${rows.length} of ${config.rows.length} sample records</span><div><button type="button" disabled>Previous</button> <button type="button" disabled>Next</button></div></div>
  </div>`;
}

function renderCalendarPreview() {
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const days = ['28', '29', '30', ...Array.from({ length: 31 }, (_, index) => String(index + 1)), '1'];
  const dayCells = days.map((day, index) => {
    const muted = index < 3 || index === days.length - 1;
    const today = day === '31' && !muted;
    const hasEvent = ['31', '3', '5', '12', '18', '24'].includes(day) && !muted;
    return `<div class="calendar-day${muted ? ' muted' : ''}${today ? ' today' : ''}${hasEvent ? ' has-event' : ''}">${day}</div>`;
  }).join('');
  return `<section class="page-widget-card page-calendar"><div class="calendar-toolbar"><button class="page-quiet-button" type="button" data-calendar-step="-1" aria-label="Previous month">‹</button><strong>October 2026</strong><button class="page-quiet-button" type="button" data-calendar-step="1" aria-label="Next month">›</button></div><div class="calendar-grid">${names.map((name) => `<div class="calendar-day muted">${name}</div>`).join('')}${dayCells}</div></section>`;
}

function renderSpecialPreview(config) {
  if (config.type === 'calendar') return renderCalendarPreview();
  if (config.type === 'kanban') {
    const columns = [['To do', 0, 3], ['In progress', 1, 1], ['Review', 2, 1]];
    return `<section class="page-widget-card page-kanban">${columns.map(([label, start, count]) => `<div class="kanban-column"><p class="kanban-heading"><span>${label}</span><span>${count}</span></p>${config.rows.slice(start, start + count).map((row) => `<div class="kanban-card">${safeText(row[0])}<small>${safeText(row[1])} · ${safeText(row[3])}</small></div>`).join('')}</div>`).join('')}</section>`;
  }
  if (config.type === 'auth') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Sign-in preview</h2><p>Local interface demo · no account is created</p></div></div><form class="page-form-preview" data-demo-form><label>Email address<input type="email" placeholder="you@example.com" required></label><label>Password<input type="password" placeholder="Enter a demo password" required></label><button class="preview-button" type="submit">Continue to preview</button><button class="preview-button secondary" type="button" data-demo-action="sso">Continue with single sign-on</button></form></section>`;
  }
  if (config.type === 'errors') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>State previews</h2><p>Choose an example to preview its recovery layout</p></div></div><div class="page-panel-grid">${[['404', 'Page not found', 'Return to dashboard'], ['403', 'Access restricted', 'Request access'], ['500', 'Something went wrong', 'Try again']].map(([code, title, action]) => `<button class="page-panel-tile" type="button" data-error-preview="${safeText(code)}"><strong>${safeText(code)} · ${safeText(title)}</strong><p>${safeText(action)} →</p></button>`).join('')}</div></section>`;
  }
  if (config.type === 'inbox') {
    const messages = [
      ['Olivia Rhye', 'Project update', 'The latest design files are ready for review. I’ve added the updated screens and notes.'],
      ['Phoenix Baker', 'Sprint planning', 'I’ve added the next sprint priorities. Let me know if you want to move any items.'],
      ['Lana Steiner', 'Welcome to the team', 'Sharing a few useful resources to help you get started. Welcome aboard!'],
      ['Demi Wilkinson', 'Campaign brief', 'Could you take a look at the new brief before our review tomorrow?']
    ];
    const message = messages[emailPreviewIndex % messages.length];
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Message preview</h2><p>Local sample inbox</p></div></div><div class="page-inbox"><div class="inbox-list">${messages.map((item, index) => `<button class="inbox-item${index === emailPreviewIndex ? ' active' : ''}" type="button" data-email-index="${index}"><strong>${safeText(item[0])}</strong><small>${safeText(item[1])}</small></button>`).join('')}</div><article class="inbox-message"><h3>${safeText(message[1])}</h3><small>From ${safeText(message[0])} · Today</small><p>${safeText(message[2])}</p><button class="page-quiet-button" type="button" data-demo-action="reply">Reply</button></article></div></section>`;
  }
  if (config.type === 'chat') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Team chat preview</h2><p>Sample conversation · not connected to a service</p></div></div><div class="chat-layout"><div class="chat-people">${[['OR', 'Olivia Rhye', 'Online'], ['PB', 'Phoenix Baker', 'Online'], ['LS', 'Lana Steiner', 'Away']].map(([initials, name, presence], index) => `<button class="chat-person${index === 0 ? ' active' : ''}" type="button"><span class="chat-avatar">${initials}</span><span><strong>${name}</strong><small>${presence}</small></span></button>`).join('')}</div><div class="chat-thread"><div class="chat-thread-heading">Design team</div><div class="chat-bubble">Morning! The refreshed dashboard mockups are ready to review.</div><div class="chat-bubble sent">Looks great — I’ll share feedback shortly.</div><div class="chat-bubble">Thanks! We can walk through them in today’s sync.</div><div id="chatReplies">${chatReplies.map((reply) => `<div class="chat-bubble sent">${safeText(reply)}</div>`).join('')}</div><form class="chat-compose" id="chatCompose"><input name="message" placeholder="Write a demo message..." aria-label="Write a demo message" required><button class="page-primary-button" type="submit">Send</button></form></div></div></section>`;
  }
  if (config.type === 'elements') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Interactive component samples</h2><p>UI states only · no data is submitted</p></div></div><div class="page-component-preview"><button class="preview-button" type="button" data-demo-action="Primary button">Primary button</button><button class="preview-button secondary" type="button" data-demo-action="Secondary button">Secondary button</button><span class="preview-chip">New update</span><input class="preview-input" placeholder="Sample text field" aria-label="Sample text field"><button class="page-quiet-button" type="button" data-demo-action="Toggle sample state">Toggle state</button></div></section>`;
  }
  if (config.type === 'utilities') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Workspace preferences</h2><p>Settings are temporary UI previews</p></div></div><div class="page-settings">${[['Compact navigation', 'Use a condensed sidebar layout'], ['Email notifications', 'Show a local notification preview'], ['Weekly summary', 'Display a sample weekly report']].map(([title, detail], index) => `<label class="setting-row"><span><strong>${title}</strong><small>${detail}</small></span><input type="checkbox" ${index === 1 ? 'checked' : ''} data-setting="${index}" aria-label="${title}"></label>`).join('')}</div></section>`;
  }
  if (config.type === 'charts') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Chart previews</h2><p>Responsive examples using local sample values</p></div></div><div class="page-panel-grid"><div class="page-panel-tile"><strong>Weekly activity</strong><div class="page-chart-bars">${[45, 70, 53, 88, 63, 94, 72].map((height) => `<i style="height:${height}%"></i>`).join('')}</div><div class="page-chart-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></div><div class="page-panel-tile"><strong>Goal completion</strong><div class="page-ring"><span>68%</span></div><p class="page-ring-caption">Quarterly sample target</p></div></div></section>`;
  }
  if (config.type === 'forms') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Sample contact form</h2><p>Demo only · submission stays in this page</p></div></div><form class="page-form-preview" data-demo-form><label>Full name<input name="name" placeholder="Alex Morgan" required></label><label>Request type<select name="type"><option>General question</option><option>Feedback</option><option>Support</option></select></label><label>Message<textarea name="message" placeholder="Type a sample message..." required></textarea></label><label class="page-switch"><input type="checkbox"> Subscribe to demo updates</label><button class="preview-button" type="submit">Preview submission</button></form></section>`;
  }
  if (config.type === 'files') {
    return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>Folders</h2><p>Workspace files · demo</p></div><button class="page-quiet-button" type="button" data-demo-action="New folder">New folder</button></div><div class="file-list">${[['BR', 'Brand', '18 files', 'Updated today'], ['DS', 'Design system', '42 files', 'Updated yesterday'], ['PR', 'Projects', '86 files', 'Updated Oct 28'], ['SH', 'Shared with me', '18 files', 'Updated Oct 25']].map(([initials, name, count, date]) => `<div class="file-item"><span class="file-icon">${initials}</span><span><strong>${name}</strong><small>${count}</small></span><time>${date}</time></div>`).join('')}</div></section>`;
  }
  if (config.type === 'forms') return '';
  return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>${safeText(config.chart)}</h2><p>Illustrative data for this UI preview</p></div><button class="page-quiet-button" type="button" data-demo-action="Chart range">Last 7 days⌄</button></div><div class="page-chart"><div class="page-chart-bars">${[42, 66, 54, 80, 60, 94, 72].map((height) => `<i style="height:${height}%"></i>`).join('')}</div><div class="page-chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></section>`;
}

function renderAdminPage(name, options = {}) {
  if (name === 'Dashboards') {
    activeAdminPage = 'Dashboards';
    $('#dashboardView').hidden = false;
    $('#adminPageView').hidden = true;
    $('#globalSearch').placeholder = 'Search anything...';
    $('#globalSearch').value = '';
    pageSearchQuery = '';
    tableQuery = '';
    renderDeals();
    return;
  }
  const config = pageViews[name];
  if (!config) return;
  activeAdminPage = name;
  if (!options.preserveSearch) pageSearchQuery = '';
  activePageTab = 'Overview';
  $('#dashboardView').hidden = true;
  $('#adminPageView').hidden = false;
  $('#globalSearch').placeholder = `Search ${name.toLowerCase()}...`;
  if (!options.preserveSearch) $('#globalSearch').value = '';
  $('#pageEyebrow').textContent = name.toUpperCase();
  $('#pageTitle').textContent = name;
  $('#pageDescription').textContent = config.description;
  $('#pagePrimaryAction').textContent = config.action;
  renderPageMetrics(config);
  $('#pageTabs').innerHTML = ['Overview', 'Records', 'Insights'].map((tab) =>
    `<button class="page-tab" type="button" role="tab" aria-selected="${tab === activePageTab}" data-page-tab="${tab}">${tab}</button>`
  ).join('');
  $('#pageLayout').innerHTML = `<div class="page-main-stack">${renderSpecialPreview(config)}${renderPageTable(config)}</div>
    <aside class="page-side-stack">
      <section class="page-side-card"><div class="page-card-heading"><div><h2>${safeText(config.sideTitle)}</h2><p>Sample workspace summary</p></div><button class="page-quiet-button" type="button" data-demo-action="View summary">•••</button></div>
        <ul class="page-side-list">${config.sideItems.map(([label, value]) => `<li><span>${safeText(label)}</span><strong>${safeText(value)}</strong></li>`).join('')}</ul><p class="page-side-footer">Updated just now · Demo data</p></section>
      ${config.type === 'calendar' || config.type === 'inbox' || config.type === 'chat' || config.type === 'kanban' ? '' : renderChartWidget(config)}
    </aside>`;
  bindPageView(config);
}

function renderChartWidget(config) {
  const heights = [44, 66, 52, 83, 61, 93, 73];
  return `<section class="page-widget-card"><div class="page-card-heading"><div><h2>${safeText(config.chart)}</h2><p>Demo activity · last 7 days</p></div></div>
    <div class="page-chart"><div class="page-chart-bars">${heights.map((height) => `<i style="height:${height}%"></i>`).join('')}</div><div class="page-chart-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></div></section>
    <section class="page-side-card"><div class="page-card-heading"><div><h2>Recent activity</h2><p>Sample events</p></div></div><ul class="page-activity-list"><li>Workspace data refreshed<small>Just now</small></li><li>${safeText(config.action)} preview opened<small>18 minutes ago</small></li><li>Weekly summary prepared<small>Yesterday</small></li></ul></section>`;
}

function bindPageView(config) {
  bindPageTable(config);
  $$('.page-tab').forEach((tab) => tab.addEventListener('click', () => {
    activePageTab = tab.dataset.pageTab;
    $$('.page-tab').forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
    if (activePageTab === 'Records') $('#pageTableCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
    else if (activePageTab === 'Insights') $('.page-side-stack').scrollIntoView({ behavior: 'smooth', block: 'center' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }));
  $$('[data-calendar-step]').forEach((button) => button.addEventListener('click', () => {
    showToast(button.dataset.calendarStep === '1' ? 'November 2026 calendar preview' : 'September 2026 calendar preview');
    $('.calendar-toolbar strong').textContent = button.dataset.calendarStep === '1' ? 'November 2026' : 'September 2026';
  }));
  $$('[data-email-index]').forEach((button) => button.addEventListener('click', () => {
    emailPreviewIndex = Number(button.dataset.emailIndex);
    renderAdminPage(activeAdminPage);
  }));
  $('[data-demo-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Demo form preview submitted locally. Nothing was sent.');
  });
  $('#chatCompose')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = new FormData(event.currentTarget).get('message').trim();
    if (!message) return;
    chatReplies.push(message);
    renderAdminPage('Chat');
  });
  $$('[data-demo-action]').forEach((button) => button.addEventListener('click', () => {
    showToast(`${button.dataset.demoAction} is a local UI preview.`);
  }));
  $$('[data-error-preview]').forEach((button) => button.addEventListener('click', () => {
    showToast(`${button.dataset.errorPreview} state preview selected.`);
  }));
}

function bindPageTable(config) {
  const card = $('#pageTableCard');
  if (!card) return;
  card.addEventListener('click', handlePageTableAction);
  card.querySelector('[data-page-export]')?.addEventListener('click', () => showToast('Sample export prepared in this UI preview.'));
  card.querySelector('#pageSearch')?.addEventListener('input', (event) => {
    pageSearchQuery = event.currentTarget.value;
    $('#globalSearch').value = pageSearchQuery;
    const selectionStart = event.currentTarget.selectionStart;
    const selectionEnd = event.currentTarget.selectionEnd;
    card.outerHTML = renderPageTable(config);
    bindPageTable(config);
    const search = $('#pageSearch');
    search.focus();
    search.setSelectionRange(selectionStart, selectionEnd);
  });
}

function handlePageTableAction(event) {
  const button = event.target.closest('[data-page-row-action]');
  if (!button) return;
  const config = pageViews[activeAdminPage];
  const row = config?.rows[Number(button.dataset.pageRowAction)];
  showToast(`Previewing ${row?.[0] || 'sample item'} · demo only`);
}

function openPageDemoDialog(config) {
  const dialog = $('#demoDialog');
  $('#demoDialogTitle').textContent = config.action;
  const firstColumn = config.columns[0] || 'Name';
  $('#demoDialogFields').innerHTML = `<label>${safeText(firstColumn)}<input name="name" placeholder="Enter a sample ${safeText(firstColumn.toLowerCase())}" required></label>
    <label>${safeText(config.columns[1] || 'Details')}<input name="details" placeholder="Add a short description"></label>`;
  dialog.showModal();
  $('#demoDialogForm').onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const row = config.columns.map((_, index) => index === 0 ? String(formData.get('name')).trim() : index === 1 ? String(formData.get('details') || 'Sample entry') : index === config.columns.length - 1 ? 'New' : '—');
    config.rows.unshift(row);
    dialog.close();
    pageSearchQuery = '';
    renderAdminPage(activeAdminPage);
    showToast('Added to this session’s UI preview only.');
  };
}

function closePopovers(except) {
  $$('[data-menu]').forEach((button) => {
    if (button === except) return;
    button.setAttribute('aria-expanded', 'false');
    const menu = document.getElementById(button.dataset.menu);
    if (menu) menu.hidden = true;
  });
}

$$('[data-menu]').forEach((button) => button.addEventListener('click', (event) => {
  event.stopPropagation();
  const menu = document.getElementById(button.dataset.menu);
  const open = menu.hidden;
  closePopovers(button);
  menu.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
}));
document.addEventListener('click', (event) => { if (!event.target.closest('.popover-wrap')) closePopovers(); });

$('#sidebarToggle').addEventListener('click', () => {
  if (window.matchMedia('(max-width: 760px)').matches) {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    $('#mobileBackdrop').hidden = !open;
    $('#sidebarToggle').setAttribute('aria-expanded', String(open));
  } else {
    const collapsed = $('.dashboard-shell').classList.toggle('sidebar-collapsed');
    $('#sidebarToggle').setAttribute('aria-expanded', String(!collapsed));
  }
});
$('#mobileBackdrop').addEventListener('click', () => {
  document.body.classList.remove('nav-open');
  $('#mobileBackdrop').hidden = true;
  $('#sidebarToggle').setAttribute('aria-expanded', 'false');
});

$('#sideNav').addEventListener('click', (event) => {
  const button = event.target.closest('.nav-item');
  if (!button) return;
  $$('.nav-item').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  renderAdminPage(button.dataset.nav);
  if (window.matchMedia('(max-width: 760px)').matches) {
    document.body.classList.remove('nav-open');
    $('#mobileBackdrop').hidden = true;
  }
});

$('#pagePrimaryAction').addEventListener('click', () => {
  const config = pageViews[activeAdminPage];
  if (config) openPageDemoDialog(config);
});
$('#demoDialogClose').addEventListener('click', () => $('#demoDialog').close());
$('#demoDialogCancel').addEventListener('click', () => $('#demoDialog').close());

$('#themeToggle').addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-mode');
  $('#themeToggle').setAttribute('aria-label', dark ? 'Switch to light mode' : 'Toggle dark mode');
  showToast(dark ? 'Dark theme enabled' : 'Light theme enabled');
});
$('#languageMenu').addEventListener('click', (event) => {
  const option = event.target.closest('button');
  if (!option) return;
  const [flag, language] = option.textContent.trim().split(/\s+/);
  const button = $('.language-button');
  button.querySelector('.flag').textContent = flag;
  button.querySelector('span:nth-child(2)').textContent = language === 'English' ? 'EN' : language.slice(0, 2).toUpperCase();
  closePopovers();
});
$('#profileMenu').addEventListener('click', (event) => {
  const option = event.target.closest('button');
  if (option) showToast(`${option.textContent} is not available in this demo`);
});
$('#notificationMenu').addEventListener('click', () => closePopovers());
$('#emailButton').addEventListener('click', () => {
  $$('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.nav === 'Email'));
  renderAdminPage('Email');
});

$('#globalSearch').addEventListener('input', (event) => {
  if (activeAdminPage === 'Dashboards') {
    $('#tableSearch').value = event.target.value;
    tableQuery = event.target.value.trim();
    renderDeals();
  } else {
    pageSearchQuery = event.target.value.trim();
    renderAdminPage(activeAdminPage, { preserveSearch: true });
    const pageSearch = $('#pageSearch');
    if (pageSearch) {
      pageSearch.focus();
      pageSearch.setSelectionRange(pageSearch.value.length, pageSearch.value.length);
    }
  }
});
$('#tableSearch').addEventListener('input', (event) => {
  tableQuery = event.target.value.trim();
  $('#globalSearch').value = event.target.value;
  renderDeals();
});
$('#fullscreenButton').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch (error) {
    showToast(`Fullscreen unavailable: ${error.message}`);
  }
});
$('#showMore').addEventListener('click', (event) => renderActivities(event.currentTarget.getAttribute('aria-expanded') !== 'true'));
$('#sortButton').addEventListener('click', () => {
  sortAscending = sortAscending === null ? true : !sortAscending;
  $('#sortButton').setAttribute('aria-label', `Sort deals ${sortAscending ? 'ascending' : 'descending'} by amount`);
  renderDeals();
  showToast(`Sorted by amount ${sortAscending ? 'low to high' : 'high to low'}`);
});

function updateSelectAll() {
  const checks = $$('.row-select');
  const selected = checks.filter((checkbox) => checkbox.checked).length;
  $('#selectAll').checked = checks.length > 0 && selected === checks.length;
  $('#selectAll').indeterminate = selected > 0 && selected < checks.length;
  checks.forEach((checkbox) => checkbox.closest('tr').classList.toggle('is-selected', checkbox.checked));
}
$('#selectAll').addEventListener('change', (event) => {
  $$('.row-select').forEach((checkbox) => { checkbox.checked = event.target.checked; });
  updateSelectAll();
});
$('#dealsTableBody').addEventListener('change', (event) => {
  if (event.target.matches('.row-select')) updateSelectAll();
});
$('#dealsTableBody').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (button) showToast(`${button.dataset.action === 'view' ? 'Viewing' : 'Editing'} ${button.closest('tr').cells[1].innerText.trim()}`);
});
$$('[data-view]').forEach((button) => button.addEventListener('click', () => {
  const label = button.dataset.view;
  const destination = label.toLowerCase().includes('revenue') || label.toLowerCase().includes('profit') ? 'Analytics'
    : label.toLowerCase().includes('target') ? 'Sales'
      : label.toLowerCase().includes('deal') || label.toLowerCase().includes('customer') ? 'CRM'
        : 'Analytics';
  $$('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.nav === destination));
  renderAdminPage(destination);
  showToast(`${label} opened`);
}));
$$('[data-chart]').forEach((button) => button.addEventListener('click', () => {
  const chart = $('#revenueChart');
  if (button.dataset.chart === 'zoom-in') chart.classList.add('chart-zoomed');
  if (button.dataset.chart === 'zoom-out' || button.dataset.chart === 'reset') chart.classList.remove('chart-zoomed');
  if (button.dataset.chart === 'download') {
    const svg = $('.revenue-chart').cloneNode(true);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'nexora-revenue-chart.svg';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 0);
  }
  if (button.dataset.chart === 'menu') showToast('Revenue chart options');
}));
$('#tableSearch').addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.currentTarget.value = '';
    $('#globalSearch').value = '';
    tableQuery = '';
    renderDeals();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePopovers();
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    $('#globalSearch').focus();
  }
});
window.addEventListener('resize', () => {
  if (!window.matchMedia('(max-width: 760px)').matches) {
    document.body.classList.remove('nav-open');
    $('#mobileBackdrop').hidden = true;
    $('#sidebarToggle').setAttribute('aria-expanded', 'true');
  }
});
