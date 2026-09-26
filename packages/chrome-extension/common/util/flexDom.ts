// flex.team 앱 셸 DOM 셀렉터.
// 위치 기반(nav > div > div 등) 대신 flex 디자인 시스템의 data-scope/data-part 속성을 사용한다.
export const SIDEBAR_SELECTOR = '[data-scope="app-shell"][data-part="sidebar"]'
export const SIDEBAR_NAV_SELECTOR = 'nav[data-scope="sidebar"][data-part="root"]'
export const SIDEBAR_HEADER_SELECTOR = `${SIDEBAR_NAV_SELECTOR} > [data-part="header"]`

export const getSidebar = () =>
  document.querySelector<HTMLElement>(SIDEBAR_SELECTOR)

export const getSidebarNav = () =>
  document.querySelector<HTMLElement>(SIDEBAR_NAV_SELECTOR)

// 회사명 / 근무 시작 버튼 행을 감싸는 컨테이너. 위젯은 이 컨테이너의 세 번째 자식으로 삽입된다.
export const getSidebarHeaderContainer = () =>
  document.querySelector<HTMLElement>(`${SIDEBAR_HEADER_SELECTOR} > div`)
