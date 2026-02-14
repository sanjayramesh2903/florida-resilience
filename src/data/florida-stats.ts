// Real data sources: FEMA Florida State Profile (2025), NOAA Sea Level Rise, Florida Climate Center

export const nfipStats = {
  policiesInForce: 1_730_000,
  propertiesWithoutCoverage: 5_900_000,
  percentCovered: 20,
  averageClaimPayout: 28_100,
  crsCommunities: 259,
  crsAverageSavings: 162,
  crsPercentSavings: 15,
};

export const riskRatingImpact = {
  policiesDecrease: 342_142,
  policiesIncrease10to20: 1_180_000,
  policiesIncrease20Plus: 134_572,
  percentChangeUnder20: 96,
};

export const seaLevelRise = {
  by2050Inches: 12,
  since1900Inches: "7-8",
  rateMmPerYear: 3.4,
  shorelineMiles: 8_400,
};

export const topFloodRiskCounties = [
  { name: "Miami-Dade", policies: 285000, risk: "Extreme" },
  { name: "Broward", policies: 245000, risk: "Extreme" },
  { name: "Lee", policies: 198000, risk: "Very High" },
  { name: "Pinellas", policies: 176000, risk: "Very High" },
  { name: "Hillsborough", policies: 142000, risk: "High" },
  { name: "Palm Beach", policies: 138000, risk: "Very High" },
  { name: "Collier", policies: 112000, risk: "Very High" },
  { name: "Volusia", policies: 98000, risk: "High" },
];

export const solutionsData = [
  {
    title: "Get flood insurance",
    stat: "80% of Florida properties lack NFIP coverage",
    action: "Check FEMA flood maps and consider NFIP or private flood insurance.",
    icon: "🛡️",
  },
  {
    title: "Elevate critical systems",
    stat: "Elevating utilities can reduce damage by 60%+",
    action: "Raise electrical panels, HVAC, and appliances above base flood elevation.",
    icon: "⬆️",
  },
  {
    title: "Join a CRS community",
    stat: "259 Florida communities offer ~15% premium discounts",
    action: "Support local floodplain management; CRS saves policyholders ~$162/year.",
    icon: "🏘️",
  },
  {
    title: "Prepare for sea level rise",
    stat: "~1 foot of rise projected by 2050 (NOAA)",
    action: "Use NOAA Sea Level Rise Viewer when buying or building near the coast.",
    icon: "📈",
  },
];
