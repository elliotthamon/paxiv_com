import { Libraries } from "@react-google-maps/api";

// Role
export const ROLE_SITE_ADMIN = "siteAdmin";
export const ROLE_COMPANY_ADMINISTRATOR = "companyAdministrator";
export const ROLE_USER = "user";
export const ROLE_AI_SEARCHER = "AISearcher";
export const ROLE_ONBOARDING_ADMIN = "listingAdmin";
export const ROLE_ONBOARDING_USER = "listingUser";
export const ROLES = [
  ROLE_USER,
  ROLE_COMPANY_ADMINISTRATOR,
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
  ROLE_SITE_ADMIN,
];

export const RoleStringByType = (roleType: string) => {
  if (roleType === ROLE_SITE_ADMIN) return "Site Admin";
  if (roleType === ROLE_COMPANY_ADMINISTRATOR) return "Company Administrator";
  if (roleType === ROLE_USER) return "Company User";
  if (roleType === ROLE_ONBOARDING_ADMIN) return "Onboarding Company Admin";
  if (roleType === ROLE_ONBOARDING_USER) return "Onboarding Company User";
  if (roleType === ROLE_AI_SEARCHER) return "AI Searcher";
  return "";
};

// Approval
export const PENDING = "pending";
export const APPROVED = "approved";
export const DENIED = "denied";
export const FORWARDING = "forwarding";
export const APPROVAL_STATUES = [PENDING, FORWARDING, APPROVED, DENIED];

export const ApprovalStatusStringByType = (approvalType: string) => {
  if (approvalType === PENDING) return "Pending";
  if (approvalType === APPROVED) return "Approved";
  if (approvalType === DENIED) return "Denied";
  if (approvalType === FORWARDING) return "Forwarding";
  return "";
};

// Journey Step
export const FIRST_STEP = 0;
export const SECOND_STEP = 1;
export const THIRD_STEP = 2;
export const FOURTH_STEP = 3;
export const FIFTH_STEP = 4;

// ASSET type
export const ASSET_TYPE_MULTIFAMILY = {
  name: "Multifamily",
  value: "multifamily",
};
export const ASSET_TYPE_RETAIL = {
  name: "Retail",
  value: "retail",
};
export const ASSET_TYPE_INDUSTRIAL = {
  name: "Industrial",
  value: "industrial",
};
export const ASSET_TYPE_OFFICE = {
  name: "Office",
  value: "office",
};
export const ASSET_TYPE_LAND = {
  name: "Land",
  value: "land",
};
export const ASSET_TYPE_MIXED_USE = {
  name: "Mixed Use",
  value: "mixed use",
};
export const ASSET_TYPE_HOSPITALITY = {
  name: "Hospitality",
  value: "hospitality",
};
export const ASSET_TYPE_RESIDENTIAL = {
  name: "Residential",
  value: "residential",
};
export const ASSET_TYPES = [
  ASSET_TYPE_MULTIFAMILY,
  ASSET_TYPE_RETAIL,
  ASSET_TYPE_INDUSTRIAL,
  ASSET_TYPE_OFFICE,
  ASSET_TYPE_LAND,
  ASSET_TYPE_MIXED_USE,
  ASSET_TYPE_HOSPITALITY,
  ASSET_TYPE_RESIDENTIAL,
];

export const DEV_STATUS_EXISTING = {
  name: "Existing",
  value: "existing",
};

export const DEV_STATUS_UNDER_CONSTRUCTION = {
  name: "Under Construction",
  value: "underConstruction",
};

export const DEV_STATUS_UNDER_RENOVATION = {
  name: "Under Renovation",
  value: "underRenovation",
};

export const DEV_STATUS_CONVERTED = {
  name: "Converted",
  value: "converted",
};

export const DEV_STATUS_UNDEVELOPED = {
  name: "Undeveloped",
  value: "undeveloped",
};

export const PROPERTY_DEV_STATUS_TYPES = [
  DEV_STATUS_EXISTING,
  DEV_STATUS_UNDER_CONSTRUCTION,
  DEV_STATUS_UNDER_RENOVATION,
  DEV_STATUS_CONVERTED,
  DEV_STATUS_UNDEVELOPED,
];

export const MARKET_SEGMENT_SENIOR = {
  name: "Senior",
  value: "senior",
};

export const MARKET_SEGMENT_STUDENT = {
  name: "Student",
  value: "student",
};

export const MARKET_SEGMENT_ALL = {
  name: "All",
  value: "all",
};

export const MARKET_SEGMENT_TYPES = [
  MARKET_SEGMENT_ALL,
  MARKET_SEGMENT_SENIOR,
  MARKET_SEGMENT_STUDENT,
];

export const RENT_TYPE_NONE = {
  name: "N/A",
  value: "none",
};

export const RENT_TYPE_MARKET = {
  name: "Market",
  value: "market",
};

export const RENT_TYPE_AFFORDABLE = {
  name: "Affordable",
  value: "affordable",
};

export const RENT_TYPE_ALL = {
  name: "All",
  value: "all",
};

export const RENT_TYPES = [
  RENT_TYPE_NONE,
  RENT_TYPE_MARKET,
  RENT_TYPE_AFFORDABLE,
  RENT_TYPE_ALL,
];

export const TypeNameByValue = (value: string) => {
  const item = ASSET_TYPES.find((item) => {
    return item.value === value;
  });
  return item?.name;
};

// ASSET class
export const ASSET_CLASS_NONE = { name: "N/A", value: "none" };
export const ASSET_CLASS_A = { name: "Class A", value: "classA" };
export const ASSET_CLASS_B = { name: "Class B", value: "classB" };
export const ASSET_CLASS_C = { name: "Class C", value: "classC" };
export const ASSET_CLASSES = [
  ASSET_CLASS_NONE,
  ASSET_CLASS_A,
  ASSET_CLASS_B,
  ASSET_CLASS_C,
];

export const AssetClassNameByValue = (value: string) => {
  const item = ASSET_CLASSES.find((item) => {
    return item.value === value;
  });
  return item?.name;
};

// ASSET Sales status
export const ASSET_STATUS_1 = { name: "Active", value: "active" };
export const ASSET_STATUS_2 = { name: "Opportunistic", value: "opportunistic" };
export const ASSET_STATUS_3 = { name: "Not for Sale", value: "not_for_sale" };
export const ASSET_STATUS_4 = {
  name: "Under Contract",
  value: "under_contract",
};
export const ASSET_STATUS_5 = {
  name: "JV Opportunity",
  value: "jv_opportunity",
};
export const ASSET_STATUS_6 = {
  name: "Seeking Equity",
  value: "seeking_equity",
};
export const ASSET_STATUSES = [
  ASSET_STATUS_1,
  ASSET_STATUS_2,
  ASSET_STATUS_3,
  ASSET_STATUS_4,
  ASSET_STATUS_5,
  ASSET_STATUS_6,
];

export const AssetStatusNameByValue = (value: string) => {
  const item = ASSET_STATUSES.find((item) => {
    return item.value === value;
  });
  return item?.name;
};

//
export const JOURNEY_STEP = "journeyStep";
export const JOURNEY_MEMBER_INFO = "journeyMemberInfo";
export const USER_INFO_TOKEN = "userInfoToken";

//
export const COMPANY_BACKGROUND_IMAGE_FILE = "companyBackgroundImageFile";
export const COMPANY_AVATAR_IMAGE_FILE = "companyAvatarImageFile";
export const ASSET_IMAGE_FILE = "assetImageFile";
export const USER_AVATAR_IMAGE_FILE = "userAvatarImageFile";
export const FROM_EMAIL_ADDRESS = "support@paxiv.com";
export const FROM_EMAIL_NAME = "Paxiv Team";
export const REMEMBER_ME_COOKIE = "PaxivRememberMe";

//Token Expired message
export const MSG_TOKEN_EXPIRED = "You have been logged out.";

//row size per page
export const COUNT_PER_PAGE = 10;
export const ROW_COUNT = 4;

// admin notification events
export const ADMIN_JOURNEY_COMPLETE = "ADMIN_JOURNEY_COMPLETE";
export const ADMIN_MESSAGE = "ADMIN_MESSAGE";

// user notification events
export const USER_COMPANY_REGISTER = "USER_COMPANY_REGISTER";
export const USER_APPROVED = "USER_APPROVED";
export const USER_ADHOC = "USER_ADHOC";

export const SLIDER_IMAGES = [
  {
    title: "First slider",
    description: "This is the first slider Image of our carousel",
  },
  {
    title: "Precision",
    description:
      "Paxiv streamlines transactions, saving time, resources, and money",
    more: "Paxiv effectively streamlines communication by categorizing owned assets into Active, Opportunistic, Under Contract, and Not For Sale. This ensures that inquiries are directed away from long-term holds and towards opportunistic and actively marketed assets. This strategic categorization allows each group to specialize in its core activities: underwriting, buying, developing, and selling real assets among qualified and capable members, thus optimizing efficiency and effectiveness.",
  },
  {
    title: "Network",
    description:
      "Establish direct connections with the executives and groups of your choice",
    more: "Effective communication and operational efficiency are pivotal for seamless transactions. Each executive and their team members possess a distinct capacity to expand their network among fellow Paxiv members, fostering the creation of new opportunities. Our platform offers a comprehensive suite of tools, including In-Platform Messaging, Personal and Company Profiles, and accurate, up-to-date contact information. Rest assured, only Paxiv members will have privileged access to contact information, as we are committed to safeguarding your data and ensuring its confidentiality. Our primary mission is to facilitate connections with valuable opportunities.",
  },
  {
    title: "AI",
    description:
      "Leverage our cutting-edge Commercial Real Estate AI technology to saturate your pipeline",
    more: "Paxiv proudly presents the pinnacle of AI technology for commercial real estate development. With Paxiv, you gain access to an uninterrupted and boundless stream of opportunities. Your pipeline not only remains consistently filled but is now enriched with the most lucrative ROI prospects available in your selected market. We have the capability to procure, meticulously analyze, and thoroughly underwrite land, presenting you with comprehensive data on each opportunity. Our commitment is not just to deliver land; rather, we deliver complete deals backed by comprehensive data. This ensures that you can confidently pursue the highest possible ROI, making informed decisions from the outset as you embark on your next venture",
  },
  {
    title: "Confidentiality",
    description: "Alleviate all your data and privacy concerns",
    more: "Your data should remain exclusively in your ownership. Paxiv was established in response to the concern that numerous software platforms and third-party intermediaries have indiscreetly exposed proprietary information. We are resolute in our commitment to avoid such lapses. Within Paxiv, only the information you deem suitable for general sharing is displayed to fellow group members, enabling them to cultivate a preliminary interest. Any further data sharing is at your discretion, on a per-deal basis, empowering you to control the flow of information. We prioritize returning the control of data squarely into your hands.",
  },
  {
    title: "Distinctive",
    description:
      "Paxiv unmistakably distinguishes itself from all other software",
    more: "At Paxiv, we often receive inquiries about our comparison with other software options available. The response is straightforward: we are incomparable. We have pioneered the sole genuine business-to-business private network comprising institutional-grade investment groups. We firmly restrict external brokerages from accessing Paxiv, ensuring an environment that is exclusive, secure, straightforward, and user-friendly. Our software is so intuitively designed that you will never require a representative to guide you through its usage.",
  },
];

export enum LOGIN_STATUS {
  OK = "OK",
  NEW_PASSWORD_REQUIRED = "NEW_PASSWORD_REQUIRED",
  SMS_MFA = "SMS_MFA",
  SOFTWARE_TOKEN_MFA = "SOFTWARE_TOKEN_MFA",
}

export const assetLevels = [
  ["250", "$25 Bn+"],
  ["240", "$1 Bn to $24 Bn"],
  ["999", "$500 MM to $999 MM"],
  ["499", "$100MM to $499MM"],
  ["100", "less than $100MM"],
];
export const assetTypes = [
  "MultiFamily",
  "Retail",
  "Industrial",
  "Office",
  "Other",
];

export const DEFAULT_COMPANY_DATA = {
  name: "",
  title: "",
  email: "",
  website: "",
  phone: "",
  description: "",
  address: "",
  location: {
    lat: 45.424721,
    lng: -75.695,
  },
};

export const BG_RATIO = 4 / 1;

export const AVATAR_RATIO = 1 / 1;

export const ACCESS_RESTRICTION_MSG =
  "Your account does not have access to these functions. Contact support@paxiv.com to begin your subscription.";

export const styles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export const MAP_LIBRARIES: Libraries = ["places"];

