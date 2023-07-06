export interface NextI18Next {
  initialLocale: string;
  userConfig?: any;
}

export interface PageProps {
  _nextI18Next: NextI18Next;
}

export interface Env {
  STAGE: string;
  API_ENDPOINT: string;
  API_ENDPOINT_INTERNAL: string;
  AMPLITUDE_API_KEY: string;
  SENTRY_RELEASE: string;
  WEB_SOCKET_ENDPOINT: string;
  EVENT_TRACKING_ENDPOINT: string;
  SERVERLESS_ENDPOINT: string;
  GTM_ID: string;
}

export interface Feature {
  defaultEnabled: boolean;
  initialValue: string;
  name: string;
  type: string;
}

export interface FeatureFlag {
  featureStateValue: string;
  environment: number;
  feature: Feature;
  enabled: boolean;
}

export interface MyRealtimeWorkWidgetUsableFlags {
  isEnabled: boolean;
}

export interface Preferences {
  isAppShellFullWidth: boolean;
  isAppShellGnbFolded: boolean;
}

export interface AmplitudeTracingIdentifier {
  p000: boolean;
  p001: boolean;
  abTest: string[];
  isFreeTrial: boolean;
  isDemo: boolean;
  customerIdHash: string;
  userIdHash: string;
}

export interface ServerSideProps {
  locale: string;
  customerIdHash: string;
  grantedMenuTypes: string[];
  userAgent: string;
  now: number;
  billingStatus?: any;
  featureFlags: FeatureFlag[];
  isFreeTrial: boolean;
  isDemo: boolean;
  myRealtimeWorkWidgetUsableFlags: MyRealtimeWorkWidgetUsableFlags;
  preferences: Preferences;
  amplitudeTracingIdentifier: AmplitudeTracingIdentifier;
}

export interface Customer {
  customerIdHash: string;
  name: string;
}

export interface User {
  workspaceIdHash?: string;
  customerIdHash: string;
  userIdHash: string;
  name: string;
  displayName?: string;
  companyJoinDate?: string;
  nameInEnglishFirst?: string;
  nameInEnglishLast?: string;
  positions?: any[];
}

export interface CurrentUser {
  customer: Pick<User, "customerIdHash" | "name">;
  user: User;
}

export interface LegalInfo {
  idHash: string;
  customerIdHash: string;
  name: string;
  addressVerificationStatus: string;
}

export interface JobItem {
  jobRoles: any[];
  jobRanks: any[];
  jobTitles: any[];
}

export interface Contract {
}

export interface Tag {
  userStatuses: string[];
  contractExpireTypes: any[];
}

export interface Data {
  currentUser: CurrentUser;
  users: CurrentUser[];
  idHash: string;
  customerIdHash: string;
  companyPresidentUserIdHashes: any[];
  mission: string;
  missionDescription: string;
  legalInfo: LegalInfo;
  user: User;
  jobItem: JobItem;
  departments: any[];
  contract: Contract;
  tag: Tag;
}

export interface State {
  data: Data;
  dataUpdateCount: number;
  dataUpdatedAt: any;
  error?: any;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  fetchFailureCount: number;
  fetchMeta?: any;
  isFetching: boolean;
  isInvalidated: boolean;
  isPaused: boolean;
  status: string;
}

export interface Query {
  state: State;
  queryKey: any[];
  queryHash: string;
}

export interface DehydratedState {
  mutations: any[];
  queries: Query[];
}

export interface Props {
  pageProps: PageProps;
  env: Env;
  serverSideProps: ServerSideProps;
  dehydratedState: DehydratedState;
  isLoggedIn: boolean;
  isV1YESApp: boolean;
  __N_SSP: boolean;
}

export interface NextData {
  props: Props;
  page: string;
  buildId: string;
  assetPrefix: string;
  isFallback: boolean;
  dynamicIds: number[];
  gssp: boolean;
  customServer: boolean;
  appGip: boolean;
  scriptLoader: any[];
}
