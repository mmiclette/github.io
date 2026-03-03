import { useState } from "react";

const measures = [
  {
    id: "C05", name: "Improving or Maintaining Mental Health", code: "C05",
    domain: "Staying Healthy", dataSource: "Health Outcomes Survey (HOS)",
    status: "active", weight2026: 1, weight2027: 3, influence: "direct",
    products: ["IntegrateBH", "Onward", "TxProgress"],
    mechanism: "Sustained between-session engagement through Onward digital therapeutics (MoodCalmer for depression, FearFighter for anxiety) drives symptom stabilization over the 2-year HOS cohort window. Continuous triggered assessments via IntegrateBH identify members whose mental health is declining before they register as 'worsened' at HOS follow-up. Plans that protect the 'maintaining' portion of the numerator — not just improve it — move this measure.",
    threshold4star: "~82–85% of members stable or improved", nationalAvg: "~80–82%",
    gapNote: "2–5 pp above national avg needed to clear 4-star clustering threshold", urgency: "high",
    note: "HOS uses a 2-year cohort window. Interventions starting in 2026 affect 2028 Star Ratings. Weight triples in 2027 — plans that wait will miss two full measurement cycles.",
    research: [
      { stat: "41% decline in anxiety scores", context: "among members completing >75% of dCBT modules (Magellan Health / NeuroFlow, Jan 2024)", relevance: "Direct driver of VR-12/SF-36 mental health improvement captured by HOS" },
      { stat: "24% decline in depression scores", context: "among members completing >75% of dCBT modules (Magellan Health / NeuroFlow, Jan 2024)", relevance: "PHQ-9 reductions translate to improved member-reported mental health at HOS follow-up" },
      { stat: "PHQ-9 and GAD-7 mean scores each decreased >4 points in 8 weeks", context: "n > 4,000 members using mHealth-supported MBC (NeuroFlow longitudinal study, Nov 2021)", relevance: "Scale and clinical significance of symptom change supports HOS score improvement at population level" },
    ],
  },
  {
    id: "C12", name: "Diabetes Care – Blood Sugar Controlled", code: "C12",
    domain: "Managing Chronic Conditions", dataSource: "HEDIS (Administrative/EHR)",
    status: "active", weight2026: 3, weight2027: 3, influence: "indirect",
    products: ["BHIQ", "IntegrateBH", "FlowBuilder"],
    mechanism: "BHIQ identifies members with undiagnosed or ineffectively treated depression or anxiety co-occurring with diabetes — a population with 50–60% lower medication adherence than those without BH comorbidities. FlowBuilder targets this cohort for proactive outreach. IntegrateBH delivers BH screening and engagement that removes the behavioral barrier to glycemic control. Treating the BH driver improves HbA1c outcomes measured by this triple-weighted Star.",
    threshold4star: "~68–72% of eligible members with controlled A1c", nationalAvg: "~62–66%",
    gapNote: "5–10 pp above national avg needed — one of the wider gaps in the measure set", urgency: "high",
    note: "Triple-weighted. BH comorbidity is the strongest modifiable predictor of poor glycemic control in Medicare populations. Each 1% improvement in this measure contributes 3x the Stars impact of a 1x measure.",
    research: [{ stat: "$28 PMPM reduction in total medical spend", context: "Independence Blue Cross / NeuroFlow, 13,000 members (AJMC, Dec 2025)", relevance: "Total medical cost reduction reflects downstream chronic condition management improvements in members with BH comorbidities" }],
  },
  {
    id: "C14", name: "Controlling Blood Pressure", code: "C14",
    domain: "Managing Chronic Conditions", dataSource: "HEDIS (Administrative/EHR)",
    status: "active", weight2026: 3, weight2027: 3, influence: "indirect",
    products: ["BHIQ", "IntegrateBH", "FlowBuilder"],
    mechanism: "Untreated anxiety and depression are independent risk factors for hypertension non-adherence. BHIQ risk models surface this hidden BH risk within the hypertensive population. IntegrateBH programs deliver BH support that removes the adherence barrier. The same mechanism that drives glycemic control improvement applies here.",
    threshold4star: "~72–76% of eligible members with controlled BP", nationalAvg: "~68–72%",
    gapNote: "4–8 pp above national avg — guardrails not applied in 2025, making cut points volatile year-to-year", urgency: "high",
    note: "Triple-weighted. Treated as a 'new' measure in 2025 — cut points subject to larger shifts than guardrailed measures. Plans should track carefully.",
    research: [{ stat: "$28 PMPM reduction in total medical spend", context: "Independence Blue Cross / NeuroFlow, 13,000 members (AJMC, Dec 2025)", relevance: "Cost reduction encompasses chronic condition management improvements across the comorbid BH + physical health population" }],
  },
  {
    id: "C18", name: "Plan All-Cause Readmissions", code: "C18",
    domain: "Managing Chronic Conditions", dataSource: "Claims (Administrative)",
    status: "active", weight2026: 3, weight2027: 3, influence: "indirect",
    products: ["BHIQ", "FlowBuilder", "IntegrateBH", "Care Navigation"],
    mechanism: "Unaddressed BH conditions are among the strongest predictors of 30-day readmission. BHIQ identifies members at hospitalization risk before admission. FlowBuilder triggers post-discharge BH outreach. Tech-enabled BH referral management connects patients to outpatient care that interrupts the cycle driving readmission. This is an inverse measure — lower readmission rate = higher star.",
    threshold4star: "Standardized risk ratio <1.00 (lower is better)", nationalAvg: "~1.00 standardized ratio",
    gapNote: "Plans need to reduce readmissions ~5–10% below expected to reach 4-star territory on this inverse measure", urgency: "high",
    note: "Increased from 1x to 3x in 2025. CMS signaling continued emphasis on care transitions. BH-related admissions are disproportionately preventable with early intervention.",
    research: [
      { stat: "43% less likely to have BH-related inpatient admissions", context: "Members with tech-enabled BH referral management vs. those without (Independence Blue Cross / NeuroFlow, 13,000 members, AJMC Dec 2025)", relevance: "Direct reduction in the inpatient events that drive both the PCR numerator and 30-day readmission risk" },
      { stat: "$28 PMPM reduction in total medical spend", context: "Independence Blue Cross / NeuroFlow (AJMC, Dec 2025)", relevance: "Spend reduction driven in part by prevented inpatient admissions — the same population captured in PCR" },
    ],
  },
  {
    id: "C21", name: "Follow-Up After ED Visit – Multiple High-Risk Chronic Conditions", code: "C21",
    domain: "Managing Chronic Conditions", dataSource: "Claims (Administrative)",
    status: "active", weight2026: 1, weight2027: 1, influence: "indirect",
    products: ["IntegrateBH", "Care Navigation", "BHIQ"],
    mechanism: "Members with 2+ chronic conditions and BH comorbidities are disproportionately represented in ED-utilization populations. IntegrateBH care navigation facilitates post-ED follow-up appointments. BHIQ identifies members in this high-utilization cohort for targeted BH intervention that reduces ED recurrence.",
    threshold4star: "Benchmarks stabilizing — new 2026 measure", nationalAvg: "Newly introduced — industry distribution still emerging",
    gapNote: "~5–10 pp estimated based on comparable follow-up measures; plan-specific baselines will determine actual gap", urgency: "medium",
    note: "New 2026 measure. BH comorbidity is a primary driver of high-risk multi-chronic-condition ED utilization. Early data advantage available since cut points are new.",
    research: [{ stat: "34% decrease in ED visits", context: "Patients using NeuroFlow's technology-enabled BH integration (NeuroFlow ED study, Sep 2022)", relevance: "Direct reduction in the ED utilization events that populate this measure's denominator, and the follow-up gap it captures" }],
  },
  {
    id: "C22", name: "Getting Needed Care (CAHPS)", code: "C22",
    domain: "Member Experience", dataSource: "CAHPS Survey",
    status: "active", weight2026: 2, weight2027: 2, influence: "indirect",
    products: ["SmartMatch", "Referral Management", "IntegrateBH"],
    mechanism: "CAHPS surveys members on ease of getting specialist and BH referrals. SmartMatch's algorithmic matching considers 100+ variables to reduce BH wait times. The IBX study showed 36% improvement in days from diagnosis to first outpatient BH visit — the exact access experience this CAHPS domain measures.",
    threshold4star: "~88–91% favorable survey response", nationalAvg: "~86–88%",
    gapNote: "2–5 pp above national avg — survey-based measures have narrower distributions than HEDIS measures", urgency: "medium",
    note: "Weight reduced from 4x to 2x in 2026. Still meaningful at 2x. Access experience is the upstream driver of all other quality measure performance.",
    research: [{ stat: "36% improvement in days to care", context: "From diagnosis to first outpatient BH visit, members with NeuroFlow referral management vs. without (Independence Blue Cross, AJMC Dec 2025)", relevance: "Faster access is the specific experience CAHPS Getting Needed Care surveys — directly translates to higher member-reported satisfaction" }],
  },
  {
    id: "C27", name: "Care Coordination (CAHPS)", code: "C27",
    domain: "Member Experience", dataSource: "CAHPS Survey",
    status: "active", weight2026: 2, weight2027: 2, influence: "indirect",
    products: ["IntegrateBH", "Manage", "Care Navigation"],
    mechanism: "CAHPS surveys members on whether providers communicate and coordinate. Closed-loop referral tracking, warm handoffs, and bidirectional EHR integration in IntegrateBH directly improve the care coordination experience. When a PCP refers a member to BH and receives a status update without the member having to relay information, CAHPS coordination scores improve.",
    threshold4star: "~88–92% favorable survey response", nationalAvg: "~86–90%",
    gapNote: "2–4 pp above national avg — smaller absolute gap but consistent performance required across entire survey cohort", urgency: "medium",
    note: "BH coordination gaps are most visible and most impactful in this domain — primary care and specialty BH rarely communicate without explicit infrastructure.",
    research: [],
  },
  {
    id: "FUH", name: "Follow-Up After Hospitalization for Mental Illness", code: "FUH",
    domain: "Behavioral Health (Display → Stars)", dataSource: "HEDIS (Administrative)",
    status: "display", weight2026: null, weight2027: null, weightEntry: "1x (projected)", entryYear: "~2028–2029",
    influence: "direct", products: ["IntegrateBH", "Care Navigation", "FlowBuilder"],
    mechanism: "Care navigation achieves 50–60% member contact rate post-discharge versus 33% industry average. FlowBuilder triggers outreach within hours of a qualifying discharge event. Closed-loop appointment scheduling converts contact into a documented follow-up visit that counts in the HEDIS numerator.",
    threshold4star: "~45–50% 7-day follow-up rate", nationalAvg: "~29–30% Medicare (7-day rate)",
    gapNote: "15–20 pp gap between national average and 4-star threshold — the largest performance gap of any BH-adjacent measure", urgency: "build-now",
    note: "Plans are required to collect and report FUH data right now — it's on the display page. Building NeuroFlow's post-discharge infrastructure today creates operational readiness for when this measure enters Stars scoring.",
    research: [
      { stat: "43% less likely to have BH-related inpatient admissions", context: "Independence Blue Cross / NeuroFlow (AJMC, Dec 2025)", relevance: "Reduces the denominator of FUH — fewer psychiatric hospitalizations — while care navigation infrastructure closes the follow-up gap for those who are admitted" },
      { stat: "36% improvement in days to care", context: "Diagnosis to first outpatient BH visit (Independence Blue Cross / NeuroFlow, AJMC Dec 2025)", relevance: "Faster time-to-care infrastructure is the same mechanism that drives 7-day post-discharge follow-up completion" },
    ],
  },
  {
    id: "DSF", name: "Depression Screening and Follow-Up", code: "DSF-E",
    domain: "Behavioral Health (Display → Stars)", dataSource: "HEDIS/ECDS",
    status: "display", weight2026: null, weight2027: null, weightEntry: "1x", entryYear: "Star Year 2029 (MY 2027)",
    influence: "direct", products: ["IntegrateBH", "BHIQ", "Onward", "FlowBuilder"],
    mechanism: "IntegrateBH delivers PHQ-2/PHQ-9 screenings to all eligible members via EHR-triggered multi-channel workflows. Remote digital screening surfaces BH risk that in-clinic assessments alone miss. Positive screens auto-trigger care navigation outreach within a configurable window. Onward telehealth and digital BH encounters count toward the 30-day follow-up numerator.",
    threshold4star: "~75–85% composite (estimated — CMS benchmarks not yet set for MA)", nationalAvg: "MA benchmarks not yet established; commercial benchmarks suggest significant variation",
    gapNote: "Screening rate is typically high; follow-up rate is the gap — estimated 20–35 pp improvement needed in follow-up component for most plans", urgency: "build-now",
    note: "CMS confirmed entry into Stars in 2029 based on MY 2027 data. Plans starting now have 2 full measurement years of operational maturity before scoring begins.",
    research: [
      { stat: "12.9% of cohort identified as rising-risk earlier than in-clinic assessment alone", context: "Remote digital BH screening, The Villages Health / NeuroFlow (Jan 2024)", relevance: "Directly expands DSF screening numerator by identifying members who would otherwise be missed" },
      { stat: "15% of rising-risk patients had hidden symptoms not surfaced by in-clinic assessment", context: "Remote vs. in-clinic screening comparison, The Villages Health / NeuroFlow (Jan 2024)", relevance: "Digital screening infrastructure captures a clinically significant population the measure would otherwise miss" },
      { stat: "17.3% of patients reported improvements in PHQ-9 scores", context: "Patients using NeuroFlow's technology-enabled BH tool (ED utilization study, Sep 2022)", relevance: "PHQ-9 improvement following NeuroFlow engagement validates that follow-up through the platform produces clinical change, not just visit completion" },
    ],
  },
];

const timelineEvents = [
  { year: "2026", label: "Star Year 2026", subLabel: "MY 2024 data", color: "#2dd4bf", items: [
    { text: "C05 Mental Health HOS enters Stars at 1x weight — first active BH-specific Star measure", type: "new", highlight: true },
    { text: "C18 Plan All-Cause Readmissions remains at 3x — indirect BH lever through admission prevention", type: "active" },
    { text: "C12 Diabetes Blood Sugar Controlled and C14 Controlling Blood Pressure active at 3x", type: "active" },
    { text: "C21 Follow-Up After ED Visit (Multiple High-Risk Conditions) enters at 1x — new 2026", type: "new" },
    { text: "CAHPS measures (Getting Needed Care, Care Coordination) reduced from 4x → 2x", type: "change" },
    { text: "FUH on display page — plans collecting data now, not scored", type: "display" },
    { text: "DSF-E on display page — plans collecting data now, not scored", type: "display" },
  ]},
  { year: "2027", label: "Star Year 2027", subLabel: "MY 2025 data", color: "#f59e0b", items: [
    { text: "C05 Mental Health HOS weight triples: 1x → 3x — BH-specific Stars weight increases 3x overnight", type: "critical", highlight: true },
    { text: "Plans that deployed engagement programs in 2025–26 will have HOS data showing results. Late starters will not.", type: "insight", highlight: true },
    { text: "C04 Physical Health HOS also moves to 3x — same HOS survey infrastructure drives both", type: "change" },
    { text: "12 administrative measures removed — clinical and outcome measures gain relative Stars share", type: "change" },
    { text: "Clinical measures reach ~65% of overall Stars weight (up from ~50%)", type: "change" },
    { text: "FUH and DSF-E remain on display page — still not scored", type: "display" },
  ]},
  { year: "2028", label: "Star Year 2028", subLabel: "MY 2026 data", color: "#818cf8", items: [
    { text: "FUH projected to enter Stars at 1x weight — pending final CMS rulemaking", type: "upcoming", highlight: true },
    { text: "Plans with 2+ years of FUH infrastructure (post-discharge workflows, care navigation) will outperform from day one", type: "insight" },
    { text: "Medication adherence measures return to 3x weight", type: "change" },
    { text: "DSF-E remains on display page through MY 2026", type: "display" },
  ]},
  { year: "2029", label: "Star Year 2029", subLabel: "MY 2027 data", color: "#f87171", items: [
    { text: "DSF-E Depression Screening and Follow-Up enters Stars at 1x — CMS confirmed", type: "critical", highlight: true },
    { text: "Plans building screening + follow-up workflows now will have 2 years of operational maturity when scoring begins", type: "insight", highlight: true },
    { text: "IET (Initiation and Engagement of SUD Treatment) proposed for entry — additional BH measure", type: "upcoming" },
    { text: "Full BH Stars portfolio active: C05 (3x), FUH (1x), DSF (1x) — BH-specific weight reaches ~11x of overall rating", type: "insight" },
  ]},
];

const typeConfig = {
  new: { bg: "rgba(45,212,191,0.12)", border: "rgba(45,212,191,0.3)", dot: "#2dd4bf", label: "NEW" },
  active: { bg: "rgba(51,65,85,0.25)", border: "rgba(51,65,85,0.4)", dot: "#64748b", label: null },
  change: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", dot: "#f59e0b", label: "CHANGE" },
  critical: { bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.35)", dot: "#f87171", label: "KEY" },
  display: { bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.3)", dot: "#818cf8", label: "DISPLAY" },
  upcoming: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)", dot: "#60a5fa", label: "PROPOSED" },
  insight: { bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.25)", dot: "#34d399", label: "NOTE" },
};
const influenceBadge = {
  direct: { bg: "rgba(45,212,191,0.12)", text: "#2dd4bf", border: "rgba(45,212,191,0.3)", label: "DIRECT" },
  indirect: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b", border: "rgba(245,158,11,0.3)", label: "INDIRECT" },
};
const statusConfig = {
  active: { bg: "rgba(52,211,153,0.12)", text: "#34d399", border: "rgba(52,211,153,0.3)", label: "ACTIVE 2026" },
  display: { bg: "rgba(129,140,248,0.12)", text: "#a78bfa", border: "rgba(129,140,248,0.3)", label: "DISPLAY ONLY" },
};
const urgencyConfig = {
  high: { color: "#f87171", label: "HIGH PRIORITY" },
  medium: { color: "#f59e0b", label: "MEDIUM" },
  "build-now": { color: "#a78bfa", label: "BUILD NOW" },
};

const targetPlans = [
  {parent:"Anthem Blue Cross Life and Health Insurance Company",c05:"1",c12_low:1,c14_low:1,contracts:1,tier:1,score:67},
  {parent:"UnitedHealthcare",c05:"1",c12_low:0,c14_low:2,contracts:18,tier:1,score:55},
  {parent:"Samaritan Advantage Health Plans",c05:"1",c12_low:0,c14_low:1,contracts:1,tier:1,score:55},
  {parent:"Aetna Better Health of Virginia",c05:"1",c12_low:1,c14_low:1,contracts:1,tier:1,score:54},
  {parent:"Aetna Medicare",c05:"1",c12_low:0,c14_low:2,contracts:18,tier:1,score:42},
  {parent:"Humana",c05:"1",c12_low:0,c14_low:3,contracts:15,tier:1,score:42},
  {parent:"Anthem Blue Cross and Blue Shield",c05:"1",c12_low:0,c14_low:6,contracts:11,tier:1,score:42},
  {parent:"Cigna HealthCare",c05:"1",c12_low:0,c14_low:2,contracts:9,tier:1,score:42},
  {parent:"Wellpoint",c05:"1",c12_low:0,c14_low:4,contracts:7,tier:1,score:42},
  {parent:"Blue Shield of California",c05:"1",c12_low:0,c14_low:1,contracts:3,tier:1,score:42},
  {parent:"Medica",c05:"1",c12_low:0,c14_low:2,contracts:3,tier:1,score:42},
  {parent:"Regence BlueShield of Idaho",c05:"1",c12_low:0,c14_low:2,contracts:2,tier:1,score:42},
  {parent:"The Health Plan",c05:"1",c12_low:0,c14_low:2,contracts:2,tier:1,score:42},
  {parent:"Regence BlueShield",c05:"1",c12_low:0,c14_low:1,contracts:2,tier:1,score:42},
  {parent:"Anthem Blue Cross",c05:"1",c12_low:0,c14_low:1,contracts:2,tier:1,score:42},
  {parent:"Aetna Better Health of New Jersey",c05:"1",c12_low:1,c14_low:0,contracts:1,tier:1,score:42},
  {parent:"Anthem Blue Cross Partnership Plan",c05:"1",c12_low:0,c14_low:1,contracts:1,tier:1,score:42},
  {parent:"Anthem Blue Cross and Blue Shield HP",c05:"1",c12_low:0,c14_low:1,contracts:1,tier:1,score:42},
  {parent:"BlueCare Plus Tennessee",c05:"1",c12_low:0,c14_low:1,contracts:1,tier:1,score:42},
  {parent:"Cigna Healthcare",c05:"1",c12_low:0,c14_low:1,contracts:1,tier:1,score:42},
  {parent:"Sentara Medicare",c05:"1",c12_low:0,c14_low:1,contracts:1,tier:1,score:42},
  {parent:"Arkansas Blue Medicare",c05:"2",c12_low:0,c14_low:3,contracts:3,tier:1,score:40},
  {parent:"AllCare Advantage",c05:"2",c12_low:0,c14_low:1,contracts:1,tier:1,score:27},
  {parent:"Highmark Blue Cross Blue Shield",c05:"2",c12_low:0,c14_low:1,contracts:1,tier:1,score:27},
  {parent:"Peoples Health",c05:"2",c12_low:0,c14_low:1,contracts:2,tier:1,score:27},
  {parent:"Regence BlueCross BlueShield of Utah",c05:"2",c12_low:0,c14_low:1,contracts:1,tier:1,score:27},
  {parent:"UCare's MSHO",c05:"2",c12_low:0,c14_low:1,contracts:1,tier:1,score:27},
  {parent:"SCAN Health Plan",c05:"1",c12_low:0,c14_low:0,contracts:3,tier:2,score:30},
  {parent:"Alignment Health Plan",c05:"1",c12_low:0,c14_low:0,contracts:2,tier:2,score:30},
  {parent:"Kaiser Permanente",c05:"1",c12_low:0,c14_low:0,contracts:2,tier:2,score:30},
  {parent:"Medicare y Mucho Mas (MMM)",c05:"1",c12_low:0,c14_low:0,contracts:1,tier:2,score:30},
  {parent:"Regence BlueCross BlueShield of Oregon",c05:"1",c12_low:0,c14_low:0,contracts:1,tier:2,score:30},
  {parent:"HealthPartners",c05:"1",c12_low:0,c14_low:0,contracts:1,tier:2,score:30},
  {parent:"MediGold",c05:"1",c12_low:0,c14_low:0,contracts:2,tier:2,score:30},
  {parent:"UCare",c05:"2",c12_low:0,c14_low:0,contracts:4,tier:2,score:15},
  {parent:"Fallon Health",c05:"2",c12_low:0,c14_low:0,contracts:2,tier:2,score:15},
  {parent:"PacificSource Medicare",c05:"2",c12_low:0,c14_low:0,contracts:2,tier:2,score:15},
  {parent:"UPMC for Life",c05:"2",c12_low:0,c14_low:0,contracts:1,tier:2,score:15},
  {parent:"UPMC for Life Complete Care",c05:"2",c12_low:0,c14_low:0,contracts:2,tier:2,score:15},
  {parent:"Wellcare",c05:null,c12_low:2,c14_low:11,contracts:12,tier:3,score:50},
  {parent:"ATRIO Health Plans",c05:null,c12_low:2,c14_low:2,contracts:2,tier:3,score:50},
  {parent:"Florida Complete Care",c05:null,c12_low:1,c14_low:1,contracts:1,tier:3,score:50},
  {parent:"AlohaCare",c05:null,c12_low:1,c14_low:1,contracts:1,tier:3,score:37},
  {parent:"Elderplan",c05:null,c12_low:1,c14_low:1,contracts:1,tier:3,score:37},
  {parent:"Molina Healthcare of Texas",c05:null,c12_low:1,c14_low:1,contracts:1,tier:3,score:37},
  {parent:"eternalHealth",c05:null,c12_low:1,c14_low:1,contracts:1,tier:3,score:37},
  {parent:"Wellcare By Allwell",c05:null,c12_low:4,c14_low:3,contracts:5,tier:3,score:24},
  {parent:"Blue Cross and Blue Shield of Texas",c05:null,c12_low:2,c14_low:1,contracts:2,tier:3,score:24},
  {parent:"Zing Health",c05:null,c12_low:2,c14_low:1,contracts:2,tier:3,score:24},
  {parent:"Molina Healthcare of Utah & Idaho",c05:null,c12_low:1,c14_low:1,contracts:1,tier:3,score:24},
];

const contractsByParent = {
  "Aetna Better Health of New Jersey":[{name:"Aetna Better Health Inc. (NJ)",flags:"C05 1★, C12 2★"}],
  "Aetna Better Health of Virginia":[{name:"Coventry Health Care of Virginia, Inc.",flags:"C05 1★, C12 2★, C14 2★"}],
  "Aetna Medicare":[
    {name:"Coventry Health Care of Kansas, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Aetna Health of Utah Inc.",flags:"C05 1★, C14 2★"},
    {name:"Aetna Better Health of Michigan Inc.",flags:"C05 1★"},
    {name:"Aetna Better Health, Inc. (LA)",flags:"C05 1★"},
    {name:"Aetna Better Health of Texas Inc.",flags:"C05 1★"},
    {name:"First Health Life & Health Insurance Company",flags:"C05 1★"},
    {name:"SilverScript Insurance Company",flags:"C05 1★"},
    {name:"Aetna Health and Life Insurance Company",flags:"C05 1★"},
    {name:"Aetna Health Inc. (TX)",flags:"C05 1★"},
    {name:"Aetna Health Inc. (GA)",flags:"C05 1★"},
    {name:"Coventry Health Care of West Virginia, Inc.",flags:"C05 1★"},
    {name:"Aetna Health of Michigan Inc.",flags:"C05 1★"},
    {name:"Aetna Health Inc. (NY)",flags:"C05 1★"},
    {name:"Aetna Health Inc. (LA)",flags:"C05 1★"},
    {name:"Aetna Health Inc. (PA)",flags:"C05 1★"},
    {name:"Coventry Health Care of Nebraska, Inc.",flags:"C05 1★"},
    {name:"Aetna Health of Iowa Inc.",flags:"C05 1★"},
    {name:"Aetna Health of Ohio Inc.",flags:"C05 1★"},
  ],
  "Alignment Health Plan":[
    {name:"Alignment Health Plan",flags:"C05 1★"},
    {name:"Alignment Health Insurance Company of Arizona Inc",flags:"C05 1★"},
  ],
  "AllCare Advantage":[{name:"AllCare Health Plan, Inc.",flags:"C05 2★, C14 2★"}],
  "AlohaCare":[{name:"AlohaCare",flags:"C12 2★, C14 1★"}],
  "Anthem Blue Cross":[
    {name:"Blue Cross of California Partnership Plan, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Blue Cross of California",flags:"C05 1★"},
  ],
  "Anthem Blue Cross Life and Health Insurance Company":[{name:"Anthem Blue Cross Life and Health Ins Company",flags:"C05 1★, C12 2★, C14 1★"}],
  "Anthem Blue Cross Partnership Plan":[{name:"Blue Cross of California Partnership Plan, Inc.",flags:"C05 1★, C14 2★"}],
  "Anthem Blue Cross and Blue Shield":[
    {name:"Anthem Health Plans, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Matthew Thornton Health Plan, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Blue Cross Blue Shield Healthcare Plan of Georgia",flags:"C05 1★, C14 2★"},
    {name:"Community Insurance Company",flags:"C05 1★, C14 2★"},
    {name:"CompCare Health Services Insurance Corporation",flags:"C05 1★, C14 2★"},
    {name:"Anthem Insurance Companies, Inc.",flags:"C05 1★, C14 2★"},
    {name:"HMO Colorado, Inc.",flags:"C05 1★"},
  ],
  "Anthem Blue Cross and Blue Shield HP":[{name:"Anthem HP, LLC.",flags:"C05 1★, C14 2★"}],
  "Arkansas Blue Medicare":[
    {name:"USAble HMO, Inc.",flags:"C05 2★, C14 1★"},
    {name:"USAble Mutual Insurance Company",flags:"C05 2★, C14 2★"},
  ],
  "ATRIO Health Plans":[{name:"ATRIO Health Plans",flags:"C12 1★, C14 1★"}],
  "Blue Shield of California":[
    {name:"California Physicians' Service",flags:"C05 1★, C14 2★"},
    {name:"California Physicians' Service (2)",flags:"C05 1★"},
  ],
  "BlueCare Plus Tennessee":[{name:"Volunteer State Health Plan",flags:"C05 1★, C14 2★"}],
  "Cigna HealthCare":[
    {name:"Healthspring Life & Health Insurance Company, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Cigna HealthCare of Colorado, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Bravo Health Mid-Atlantic, Inc.",flags:"C05 1★"},
    {name:"Healthspring of Florida, Inc.",flags:"C05 1★"},
    {name:"Bravo Health Pennsylvania, Inc.",flags:"C05 1★"},
  ],
  "Cigna Healthcare":[{name:"HealthSpring Life & Health Insurance Company, Inc.",flags:"C05 1★, C14 2★"}],
  "Elderplan":[{name:"Elderplan, Inc.",flags:"C12 2★, C14 1★"}],
  "eternalHealth":[{name:"eternalHealth, Inc.",flags:"C12 2★, C14 1★"}],
  "Fallon Health":[{name:"Fallon Community Health Plan",flags:"C05 2★"}],
  "Florida Complete Care":[{name:"HPMP of Florida, Inc.",flags:"C12 1★, C14 1★"}],
  "HealthPartners":[{name:"HealthPartners, Inc.",flags:"C05 1★"}],
  "Highmark Blue Cross Blue Shield":[{name:"Highmark Senior Solutions Company",flags:"C05 2★, C14 2★"}],
  "Humana":[
    {name:"Humana Insurance Company",flags:"C05 1★, C14 2★"},
    {name:"Humana Health Plan of Texas, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Humana Medical Plan of Pennsylvania, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Humana Insurance Company of Kentucky",flags:"C05 1★"},
    {name:"Humana Benefit Plan of Texas, Inc.",flags:"C05 1★"},
    {name:"Humana Health Company of New York, Inc.",flags:"C05 1★"},
    {name:"Humana Benefit Plan of Illinois, Inc.",flags:"C05 1★"},
    {name:"Humana Medical Plan of Michigan, Inc.",flags:"C05 1★"},
    {name:"Humana Employers Health Plan of Georgia, Inc.",flags:"C05 1★"},
    {name:"Humana Regional Health Plan, Inc.",flags:"C05 1★"},
    {name:"Humana Health Insurance Company of Florida, Inc.",flags:"C05 1★"},
    {name:"Humana Insurance Company of New York",flags:"C05 1★"},
  ],
  "Kaiser Permanente":[
    {name:"Kaiser Foundation Health Plan, Inc.",flags:"C05 1★"},
    {name:"Kaiser Foundation Health Plan of Colorado",flags:"C05 1★"},
  ],
  "Medica":[
    {name:"Medica Insurance Company",flags:"C05 1★, C14 2★"},
    {name:"Medica Health Plans",flags:"C05 1★, C14 2★"},
  ],
  "Medicare y Mucho Mas (MMM)":[{name:"MMM Healthcare, LLC",flags:"C05 1★"}],
  "MediGold":[
    {name:"Mount Carmel Health Insurance Company",flags:"C05 1★"},
    {name:"Mount Carmel Health Plan, Inc.",flags:"C05 1★"},
  ],
  "Molina Healthcare of Texas":[{name:"Molina Healthcare of Texas, Inc.",flags:"C12 2★, C14 1★"}],
  "Molina Healthcare of Utah & Idaho":[{name:"Molina Healthcare of Utah, Inc.",flags:"C12 2★, C14 2★"}],
  "PacificSource Medicare":[{name:"PacificSource Community Health Plans",flags:"C05 2★"}],
  "Peoples Health":[{name:"Peoples Health, Inc.",flags:"C05 2★, C14 2★"}],
  "Regence BlueCross BlueShield of Oregon":[{name:"Regence BlueCross BlueShield of Oregon",flags:"C05 1★"}],
  "Regence BlueCross BlueShield of Utah":[{name:"Regence BlueCross BlueShield of Utah",flags:"C05 2★, C14 2★"}],
  "Regence BlueShield":[{name:"Regence BlueShield",flags:"C05 1★, C14 2★"}],
  "Regence BlueShield of Idaho":[
    {name:"Regence BlueShield of Idaho, Inc.",flags:"C05 1★, C14 2★"},
  ],
  "Samaritan Advantage Health Plans":[{name:"Samaritan Health Plans, Inc.",flags:"C05 1★, C14 1★"}],
  "SCAN Health Plan":[
    {name:"SCAN Health Plan",flags:"C05 1★"},
    {name:"SCAN Health Plan Nevada, Inc.",flags:"C05 1★"},
    {name:"SCAN Desert Health Plan, Inc.",flags:"C05 1★"},
  ],
  "Sentara Medicare":[{name:"Sentara Health Plans",flags:"C05 1★, C14 2★"}],
  "The Health Plan":[
    {name:"The Health Plan of West Virginia, Inc.",flags:"C05 1★, C14 2★"},
    {name:"THP Insurance Company",flags:"C05 1★, C14 2★"},
  ],
  "UCare":[
    {name:"UCare Minnesota",flags:"C05 2★"},
    {name:"UCare Health, Inc.",flags:"C05 2★"},
  ],
  "UCare's MSHO":[{name:"UCare Minnesota (MSHO)",flags:"C05 2★, C14 2★"}],
  "UnitedHealthcare":[
    {name:"Care Improvement Plus South Central Insurance Co.",flags:"C05 1★, C14 1★"},
    {name:"UnitedHealthcare of Wisconsin, Inc.",flags:"C05 1★, C14 2★"},
    {name:"UnitedHealthcare Plan of the River Valley, Inc.",flags:"C05 1★"},
    {name:"UnitedHealthcare Benefits of Texas, Inc.",flags:"C05 1★"},
    {name:"Oxford Health Plans (NJ), Inc.",flags:"C05 1★"},
    {name:"UnitedHealthcare of the Mid-Atlantic, Inc.",flags:"C05 1★"},
    {name:"Arizona Physicians IPA, Inc.",flags:"C05 1★"},
    {name:"UnitedHealthcare of the Midlands, Inc.",flags:"C05 1★"},
    {name:"UnitedHealthcare of the Rockies, Inc.",flags:"C05 1★"},
    {name:"UnitedHealthcare of New England, Inc.",flags:"C05 1★"},
    {name:"UnitedHealthcare Community Plan, Inc.",flags:"C05 1★"},
    {name:"UnitedHealthcare of Florida, Inc.",flags:"C05 1★"},
  ],
  "UPMC for Life":[{name:"UPMC Health Plan, Inc.",flags:"C05 2★"}],
  "UPMC for Life Complete Care":[
    {name:"UPMC for You, Inc.",flags:"C05 2★"},
    {name:"UPMC Health Coverage, Inc.",flags:"C05 2★"},
  ],
  "Wellcare":[
    {name:"Wellcare of New Hampshire, Inc.",flags:"C12 1★, C14 1★"},
    {name:"Wellcare of Mississippi, Inc.",flags:"C14 2★"},
    {name:"Wellcare of Georgia, Inc.",flags:"C14 2★"},
    {name:"Wellcare Health Insurance Company of America",flags:"C14 2★"},
    {name:"Harmony Health Plan, Inc.",flags:"C14 2★"},
    {name:"Wellcare Health Plans of Vermont, Inc.",flags:"C14 2★"},
    {name:"Meridian Health Plan of Michigan, Inc.",flags:"C14 2★"},
    {name:"Wellcare Health Insurance Company of Kentucky, Inc.",flags:"C14 2★"},
    {name:"Wellcare Health Insurance of North Carolina, Inc.",flags:"C14 2★"},
    {name:"Wellcare Health Insurance Company of Oklahoma, Inc.",flags:"C14 2★"},
    {name:"New York Quality Healthcare Corporation",flags:"C14 2★"},
    {name:"Wellcare of Missouri Health Insurance Company, Inc.",flags:"C12 2★"},
  ],
  "Wellcare By Allwell":[
    {name:"Superior HealthPlan, Inc.",flags:"C12 2★, C14 2★"},
    {name:"Sunflower State Health Plan, Inc.",flags:"C12 2★, C14 2★"},
    {name:"Buckeye Community Health Plan, Inc.",flags:"C14 2★"},
    {name:"Coordinated Care Corporation",flags:"C12 2★"},
  ],
  "Wellpoint":[
    {name:"Wellpoint Washington, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Wellpoint Texas, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Wellpoint New Jersey, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Wellpoint Tennessee, Inc.",flags:"C05 1★, C14 2★"},
    {name:"Wellpoint Iowa, Inc.",flags:"C05 1★"},
    {name:"Wellpoint Insurance Company",flags:"C05 1★"},
    {name:"Wellpoint Health Plans, Inc.",flags:"C05 1★"},
  ],
  "Blue Cross and Blue Shield of Texas":[
    {name:"GHS Insurance Company",flags:"C12 2★, C14 2★"},
    {name:"HCSC Insurance Services Company",flags:"C12 2★"},
  ],
  "Zing Health":[{name:"Zing Health of Michigan, Inc.",flags:"C12 2★, C14 2★"}],
};

export default function App() {
  const [activeTab, setActiveTab] = useState("table");
  const [expandedRow, setExpandedRow] = useState(null);
  const [filter, setFilter] = useState("all");
  const [targetFilter, setTargetFilter] = useState("all");
  const [targetSearch, setTargetSearch] = useState("");
  const [expandedParent, setExpandedParent] = useState(null);

  const filtered = measures.filter((m) => {
    if (filter === "active") return m.status === "active";
    if (filter === "display") return m.status === "display";
    if (filter === "direct") return m.influence === "direct";
    if (filter === "3x") return m.weight2026 === 3;
    return true;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#080d1a", minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
        .row-btn:hover { background: rgba(30,41,59,0.5) !important; cursor: pointer; }
        .tab-active { border-bottom: 2px solid #2dd4bf; color: #e2e8f0; font-weight: 600; }
        .tab-inactive { border-bottom: 2px solid transparent; color: #475569; }
        .tab-inactive:hover { color: #94a3b8; }
        .filter-on { background: rgba(45,212,191,0.12); border-color: rgba(45,212,191,0.35); color: #2dd4bf; }
        .filter-off { background: transparent; border-color: rgba(51,65,85,0.5); color: #475569; }
        .filter-off:hover { border-color: rgba(71,85,105,0.7); color: #64748b; }
        .expand-anim { animation: slideIn 0.18s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .research-card:hover { border-color: rgba(45,212,191,0.25) !important; }
        .plan-row:hover { background: rgba(30,41,59,0.4) !important; }
        .parent-row:hover { background: rgba(20,30,50,0.5) !important; cursor: pointer; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #0d1424 0%, #080d1a 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px 28px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2dd4bf" }} />
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#2dd4bf", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>NeuroFlow · Internal Reference</span>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f8fafc", lineHeight: 1.25 }}>Medicare Advantage Star Ratings</h1>
              <p style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>BH Measure Reference · NeuroFlow Influence Mapping · Weight Trajectory 2026–2029 · Target Plan Identification</p>
            </div>
            <div style={{ textAlign: "right", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
              <div style={{ color: "#334155" }}>Updated March 2026</div>
              <div style={{ color: "#2dd4bf", marginTop: 3 }}>9 Measures · 5 Studies · 49 Target Plans</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[{ id: "table", label: "Measure Reference Table" }, { id: "timeline", label: "Weight Trajectory" }, { id: "targets", label: "Target Plans" }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", padding: "10px 0", fontSize: 13, cursor: "pointer", transition: "color 0.12s", fontFamily: "'DM Sans', sans-serif" }} className={activeTab === t.id ? "tab-active" : "tab-inactive"}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 28px" }}>

        {/* ─── TABLE VIEW ─── */}
        {activeTab === "table" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Active in 2026 Stars", value: "7", sub: "contributing to overall rating", color: "#34d399" },
                { label: "Direct BH Influence", value: "4", sub: "NeuroFlow is the primary lever", color: "#2dd4bf" },
                { label: "Triple-Weighted (3x)", value: "3", sub: "active measures with 3x Stars impact", color: "#f59e0b" },
                { label: "Building Now Advantage", value: "2", sub: "display measures entering Stars by 2029", color: "#a78bfa" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(30,41,59,0.7)", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#f59e0b", fontSize: 13, flexShrink: 0 }}>ⓘ</span>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55 }}>
                <strong style={{ color: "#94a3b8" }}>How to read "Gap to 4★":</strong> CMS sets cut points annually through hierarchical clustering of all plan performance — not by pegging thresholds to the national average. The "Gap to 4★" column shows the approximate improvement above the national average needed to clear the 4-star clustering threshold. Actual gaps are plan-specific and shift year to year.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#334155", fontFamily: "'DM Mono', monospace" }}>FILTER:</span>
              {[{ id: "all", label: "All" }, { id: "active", label: "Active 2026" }, { id: "3x", label: "Triple-Weighted" }, { id: "display", label: "Display / Upcoming" }, { id: "direct", label: "Direct Influence" }].map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 5, border: "1px solid", cursor: "pointer", transition: "all 0.12s", fontFamily: "'DM Sans', sans-serif" }} className={filter === f.id ? "filter-on" : "filter-off"}>{f.label}</button>
              ))}
            </div>

            <div style={{ background: "rgba(10,15,28,0.8)", border: "1px solid rgba(30,41,59,0.8)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 90px 110px 100px 140px 130px 1fr 28px", background: "rgba(8,13,26,0.95)", borderBottom: "1px solid rgba(30,41,59,0.9)", padding: "9px 16px", gap: 8, alignItems: "center" }}>
                {["CODE", "MEASURE", "WEIGHT", "STATUS", "INFLUENCE", "4★ TARGET", "NATIONAL AVG", "GAP TO 4★", ""].map((h, i) => (
                  <div key={i} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#334155", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>{h}</div>
                ))}
              </div>

              {filtered.map((m) => {
                const inf = influenceBadge[m.influence];
                const st = statusConfig[m.status];
                const urg = urgencyConfig[m.urgency];
                const isOpen = expandedRow === m.id;
                const hasResearch = m.research && m.research.length > 0;
                return (
                  <div key={m.id} style={{ borderBottom: "1px solid rgba(20,30,50,0.8)" }}>
                    <div onClick={() => setExpandedRow(isOpen ? null : m.id)} className="row-btn"
                      style={{ display: "grid", gridTemplateColumns: "56px 1fr 90px 110px 100px 140px 130px 1fr 28px", padding: "12px 16px", gap: 8, alignItems: "center", background: isOpen ? "rgba(20,30,50,0.6)" : "transparent", transition: "background 0.12s" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#334155", fontWeight: 500 }}>{m.code}</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#e2e8f0" }}>{m.name}</span>
                          {hasResearch && <span style={{ fontSize: 9, background: "rgba(45,212,191,0.12)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.25)", borderRadius: 3, padding: "1px 5px", fontWeight: 700, letterSpacing: "0.06em", fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>EVIDENCE</span>}
                        </div>
                        <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>{m.domain}</div>
                      </div>
                      <div>
                        {m.status === "active" ? (
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: m.weight2026 === 3 ? "#f59e0b" : "#94a3b8", fontFamily: "'DM Mono', monospace" }}>{m.weight2026}x</span>
                            {m.weight2027 !== m.weight2026 && <div style={{ fontSize: 10, color: "#f59e0b", marginTop: 2 }}>→ {m.weight2027}x in '27</div>}
                          </div>
                        ) : (
                          <div>
                            <span style={{ fontSize: 12, color: "#475569" }}>{m.weightEntry}</span>
                            <div style={{ fontSize: 10, color: "#6366f1", marginTop: 2 }}>at entry</div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, border: "1px solid", background: st.bg, color: st.text, borderColor: st.border, letterSpacing: "0.05em", width: "fit-content" }}>{st.label}</span>
                        {m.entryYear && <span style={{ fontSize: 9, color: "#6366f1" }}>Enters: {m.entryYear}</span>}
                      </div>
                      <div><span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, border: "1px solid", background: inf.bg, color: inf.text, borderColor: inf.border, letterSpacing: "0.05em" }}>{inf.label}</span></div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace", lineHeight: 1.4 }}>{m.threshold4star}</div>
                      <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{m.nationalAvg}</div>
                      <div>
                        <div style={{ fontSize: 11, color: urg.color, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{m.gapNote.split("—")[0]}</div>
                        {m.gapNote.includes("—") && <div style={{ fontSize: 10, color: "#475569", marginTop: 2, lineHeight: 1.3 }}>{m.gapNote.split("—")[1]}</div>}
                      </div>
                      <div style={{ color: "#334155", fontSize: 11, textAlign: "center" }}>{isOpen ? "▲" : "▼"}</div>
                    </div>
                    {isOpen && (
                      <div className="expand-anim" style={{ background: "rgba(8,13,26,0.9)", borderTop: "1px solid rgba(20,30,50,0.8)", padding: "20px 16px 22px 72px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                          <div>
                            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#334155", textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>Mechanism of Action</div>
                            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{m.mechanism}</p>
                            <div style={{ marginTop: 14 }}>
                              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#334155", textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>NeuroFlow Products</div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {m.products.map(p => (
                                  <span key={p} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 4, background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.2)", color: "#2dd4bf" }}>{p}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {hasResearch && (
                              <div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#334155", textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>Published Evidence</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                  {m.research.map((r, i) => (
                                    <div key={i} className="research-card" style={{ background: "rgba(45,212,191,0.04)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 7, padding: "10px 12px", transition: "border-color 0.12s" }}>
                                      <div style={{ fontSize: 13, fontWeight: 600, color: "#2dd4bf", marginBottom: 3 }}>{r.stat}</div>
                                      <div style={{ fontSize: 11, color: "#475569", marginBottom: 4, lineHeight: 1.4 }}>{r.context}</div>
                                      <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.45, paddingTop: 4, borderTop: "1px solid rgba(45,212,191,0.08)" }}><em>Stars relevance:</em> {r.relevance}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 7, padding: "10px 12px" }}>
                              <div style={{ fontSize: 9, fontWeight: 700, color: "#f59e0b", marginBottom: 4, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>⚑ STRATEGIC NOTE</div>
                              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{m.note}</div>
                            </div>
                            <div style={{ fontSize: 11, color: "#334155" }}>Data source: {m.dataSource}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "#334155" }}>Click any row to expand mechanism, evidence, and products.</span>
              <span style={{ fontSize: 11, color: "#2dd4bf" }}>EVIDENCE tag = published NeuroFlow research supports this measure</span>
            </div>
          </div>
        )}

        {/* ─── TARGET PLANS VIEW ─── */}
        {activeTab === "targets" && (() => {
          const tierConfig = {
            1: { label: "TIER 1", desc: "Low C05 + Low C12/C14", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" },
            2: { label: "TIER 2", desc: "Low C05 Only", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
            3: { label: "TIER 3", desc: "Low C12/C14 Only", color: "#818cf8", bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.3)" },
          };

          const filteredPlans = targetPlans.filter(p => {
            const tierMatch = targetFilter === "all" || p.tier === parseInt(targetFilter);
            const searchMatch = !targetSearch || p.parent.toLowerCase().includes(targetSearch.toLowerCase());
            return tierMatch && searchMatch;
          });

          const t1count = targetPlans.filter(p=>p.tier===1).length;
          const t2count = targetPlans.filter(p=>p.tier===2).length;
          const t3count = targetPlans.filter(p=>p.tier===3).length;
          const t1contracts = targetPlans.filter(p=>p.tier===1).reduce((a,b)=>a+b.contracts,0);

          return (
            <div>
              {/* Methodology */}
              <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: 10, padding: "14px 18px", marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>Targeting Methodology</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                  {[
                    { tier: "TIER 1", color: "#f87171", text: "Parent org with 1–2★ on C05 Mental Health AND 1–2★ on C12 (Diabetes) or C14 (Blood Pressure). BH is suppressing both the direct BH measure and chronic condition management. Complete NeuroFlow story — highest pitch priority." },
                    { tier: "TIER 2", color: "#f59e0b", text: "Parent org with 1–2★ on C05 but adequate C12/C14 performance. BH underperformance is isolated to the direct mental health measure. C05 triples in weight in 2027 — strong urgency argument applies." },
                    { tier: "TIER 3", color: "#818cf8", text: "Parent org with 1–2★ on C12 or C14 but no C05 data in this dataset. BH-adherence connection supports the pitch but requires a different entry point. Validated by the $28 PMPM and 43% admissions reduction research." },
                  ].map(t => (
                    <div key={t.tier} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: t.color, fontFamily: "'DM Mono', monospace", padding: "2px 6px", border: `1px solid ${t.color}40`, borderRadius: 3, flexShrink: 0, marginTop: 1 }}>{t.tier}</span>
                      <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{t.text}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: "#1e293b" }}>
                  Source: 2026 MA Report Card (CMS, Oct 2025). Scoring: C05 1★ = 30 pts, C05 2★ = 15 pts, C12/C14 1★ = 25 pts each, C12/C14 2★ = 12 pts each. Click any row to expand individual plan contracts.
                </div>
              </div>

              {/* Stats strip */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "Tier 1 Parents", value: t1count, sub: "low C05 + low chronic measures", color: "#f87171" },
                  { label: "Tier 1 Contracts", value: t1contracts, sub: "individual contracts in scope", color: "#f87171" },
                  { label: "Tier 2 Parents", value: t2count, sub: "C05 underperformers", color: "#f59e0b" },
                  { label: "Tier 3 Parents", value: t3count, sub: "chronic-only BH opportunity", color: "#818cf8" },
                ].map(s => (
                  <div key={s.label} style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(30,41,59,0.7)", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "#334155", fontFamily: "'DM Mono', monospace" }}>TIER:</span>
                {[{id:"all",label:"All"},{id:"1",label:"Tier 1"},{id:"2",label:"Tier 2"},{id:"3",label:"Tier 3"}].map(f => (
                  <button key={f.id} onClick={() => setTargetFilter(f.id)} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 5, border: "1px solid", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }} className={targetFilter === f.id ? "filter-on" : "filter-off"}>{f.label}</button>
                ))}
                <div style={{ flex: 1 }} />
                <input placeholder="Search plan name…" value={targetSearch} onChange={e => setTargetSearch(e.target.value)}
                  style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(30,41,59,0.8)", borderRadius: 6, padding: "5px 12px", fontSize: 12, color: "#94a3b8", outline: "none", width: 200, fontFamily: "'DM Sans', sans-serif" }} />
              </div>

              {/* Table */}
              <div style={{ background: "rgba(10,15,28,0.8)", border: "1px solid rgba(30,41,59,0.8)", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 70px 80px 90px 90px 80px 80px 24px", background: "rgba(8,13,26,0.95)", borderBottom: "1px solid rgba(30,41,59,0.9)", padding: "9px 16px", gap: 10, alignItems: "center" }}>
                  {["TIER","PARENT ORGANIZATION","C05","C12 LOW","C14 LOW","CONTRACTS","SCORE","PRIORITY",""].map((h,i) => (
                    <div key={i} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#334155", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>{h}</div>
                  ))}
                </div>

                {filteredPlans.length === 0 && (
                  <div style={{ padding: "32px 16px", textAlign: "center", color: "#334155", fontSize: 13 }}>No plans match your filters.</div>
                )}

                {filteredPlans.map((p, idx) => {
                  const tc = tierConfig[p.tier];
                  const scoreColor = p.score >= 50 ? "#f87171" : p.score >= 40 ? "#fb923c" : p.score >= 27 ? "#f59e0b" : "#64748b";
                  const priorityLabel = p.score >= 50 ? "CRITICAL" : p.score >= 40 ? "HIGH" : p.score >= 27 ? "MEDIUM" : "STANDARD";
                  const priorityColor = p.score >= 50 ? "#f87171" : p.score >= 40 ? "#fb923c" : p.score >= 27 ? "#f59e0b" : "#475569";
                  const c05Color = p.c05 === "1" ? "#f87171" : p.c05 === "2" ? "#f59e0b" : "#334155";
                  const contracts = contractsByParent[p.parent] || [];
                  const isExpanded = expandedParent === `${p.parent}-${p.tier}`;
                  const hasContracts = contracts.length > 0;

                  return (
                    <div key={idx} style={{ borderBottom: "1px solid rgba(20,30,50,0.8)" }}>
                      <div
                        className="parent-row"
                        onClick={() => hasContracts && setExpandedParent(isExpanded ? null : `${p.parent}-${p.tier}`)}
                        style={{ display: "grid", gridTemplateColumns: "70px 1fr 70px 80px 90px 90px 80px 80px 24px", padding: "11px 16px", gap: 10, alignItems: "center", background: isExpanded ? "rgba(20,30,50,0.6)" : idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)", transition: "background 0.12s" }}
                      >
                        <div>
                          <span style={{ fontSize: 9, fontWeight: 700, color: tc.color, background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: 3, padding: "2px 6px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>{tc.label}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "#e2e8f0" }}>{p.parent}</div>
                          <div style={{ fontSize: 10, color: "#1e293b", marginTop: 2 }}>{tc.desc}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: c05Color, fontFamily: "'DM Mono', monospace" }}>{p.c05 ? `${p.c05}★` : "—"}</div>
                        <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: p.c12_low > 0 ? "#f87171" : "#334155" }}>{p.c12_low > 0 ? `${p.c12_low}` : "—"}</div>
                        <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: p.c14_low > 0 ? "#f87171" : "#334155" }}>{p.c14_low > 0 ? `${p.c14_low}` : "—"}</div>
                        <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#94a3b8" }}>{p.contracts}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: scoreColor, fontFamily: "'DM Mono', monospace" }}>{p.score}</div>
                        <div><span style={{ fontSize: 9, fontWeight: 700, color: priorityColor, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>{priorityLabel}</span></div>
                        <div style={{ color: "#334155", fontSize: 11, textAlign: "center" }}>{hasContracts ? (isExpanded ? "▲" : "▼") : ""}</div>
                      </div>

                      {isExpanded && contracts.length > 0 && (
                        <div className="expand-anim" style={{ background: "rgba(5,10,20,0.8)", borderTop: "1px solid rgba(20,30,50,0.6)", padding: "4px 16px 8px 88px" }}>
                          {contracts.map((c, ci) => (
                            <div key={ci} className="plan-row" style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 10px", borderRadius: 5, background: "transparent", transition: "background 0.1s", marginBottom: 2 }}>
                              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#334155", flexShrink: 0 }} />
                              <div style={{ flex: 1, fontSize: 12, color: "#94a3b8" }}>{c.name}</div>
                              <div style={{ display: "flex", gap: 5 }}>
                                {c.flags.split(", ").map((flag, fi) => {
                                  const flagColor = flag.includes("1★") ? "#f87171" : flag.includes("2★") ? "#f59e0b" : "#64748b";
                                  return (
                                    <span key={fi} style={{ fontSize: 9, fontWeight: 700, color: flagColor, background: `${flagColor}15`, border: `1px solid ${flagColor}40`, borderRadius: 3, padding: "1px 5px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{flag}</span>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {[{color:"#f87171",label:"CRITICAL ≥ 50"},{color:"#fb923c",label:"HIGH ≥ 40"},{color:"#f59e0b",label:"MEDIUM ≥ 27"},{color:"#475569",label:"STANDARD < 27"}].map(l => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: l.color }} />
                      <span style={{ fontSize: 11, color: "#334155", fontFamily: "'DM Mono', monospace" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 11, color: "#1e293b" }}>{filteredPlans.length} parent organizations · click any row to expand contracts</span>
              </div>

              {/* Top targets call-out */}
              <div style={{ marginTop: 20, background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f87171", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>Highest-Priority Accounts — Use in Sales Outreach</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { name: "Anthem Blue Cross L&H Insurance", score: 67, why: "Only Tier 1 account with all three measures below threshold simultaneously — C05 1★, C12 2★, C14 1★. Strongest data-backed case for NeuroFlow across BHIQ and IntegrateBH." },
                    { name: "Aetna Better Health of Virginia", score: 54, why: "C05 1★ + C12 2★ + C14 2★. Single contract (Coventry Health Care of Virginia). All three BH-influenced measures failing — clear BH comorbidity story." },
                    { name: "Anthem Blue Cross and Blue Shield", score: 42, why: "6 contracts at 1–2★ on C14 (blood pressure). Largest C14 exposure in the Tier 1 set. Enterprise scale amplifies urgency of the BH-adherence narrative." },
                  ].map((acc, i) => (
                    <div key={i} style={{ background: "rgba(15,23,42,0.6)", borderRadius: 8, padding: "12px 14px", border: "1px solid rgba(51,65,85,0.4)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#f87171", fontFamily: "'DM Mono', monospace" }}>{acc.score}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{acc.name}</div>
                      </div>
                      <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{acc.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ─── TIMELINE VIEW ─── */}
        {activeTab === "timeline" && (
          <div>
            <p style={{ fontSize: 13, color: "#475569", marginBottom: 24, lineHeight: 1.65, maxWidth: 760 }}>
              BH measures grow in Stars weight and count from 2026 through 2029. The 2-year HOS survey lag and display-page lead times mean the investment window is now — not when measures enter scoring.
            </p>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 126, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom, rgba(45,212,191,0.3) 0%, rgba(245,158,11,0.3) 35%, rgba(129,140,248,0.3) 65%, rgba(248,113,113,0.2) 100%)" }} />
              {timelineEvents.map((ev) => (
                <div key={ev.year} style={{ display: "flex", gap: 0, marginBottom: 44 }}>
                  <div style={{ width: 110, textAlign: "right", paddingRight: 20, paddingTop: 2, flexShrink: 0 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: ev.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{ev.year}</div>
                    <div style={{ fontSize: 10, color: "#475569", marginTop: 3 }}>{ev.label}</div>
                    <div style={{ fontSize: 10, color: "#1e293b", marginTop: 1 }}>{ev.subLabel}</div>
                  </div>
                  <div style={{ width: 34, display: "flex", justifyContent: "center", paddingTop: 5, flexShrink: 0, position: "relative", zIndex: 1 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: ev.color, boxShadow: `0 0 14px ${ev.color}55`, border: "2px solid #080d1a", flexShrink: 0 }} />
                  </div>
                  <div style={{ flex: 1, paddingLeft: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {ev.items.map((item, i) => {
                        const tc = typeConfig[item.type];
                        return (
                          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "9px 13px", borderRadius: 7, border: `1px solid ${tc.border}`, background: tc.bg }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: tc.dot, flexShrink: 0, marginTop: 4 }} />
                            <div style={{ flex: 1, fontSize: 13, color: item.highlight ? "#e2e8f0" : "#64748b", fontWeight: item.highlight ? 500 : 400, lineHeight: 1.45 }}>{item.text}</div>
                            {tc.label && <span style={{ fontSize: 9, color: tc.dot, fontFamily: "'DM Mono', monospace", fontWeight: 700, letterSpacing: "0.08em", flexShrink: 0, paddingTop: 2 }}>{tc.label}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(10,15,28,0.7)", border: "1px solid rgba(30,41,59,0.7)", borderRadius: 12, padding: "18px 20px", marginTop: 4 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#334155", textTransform: "uppercase", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>BH-Specific Measure Weight in Overall Stars Rating</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {[
                  { year: "2026", weight: "~3x", share: "~5%", color: "#2dd4bf", note: "C05 (1x) only active BH-specific Star. Indirect leverage through 3x chronic condition measures." },
                  { year: "2027", weight: "~9x", share: "~11%", color: "#f59e0b", note: "C05 triples to 3x. Admin measures removed — clinical shares grow. Plans without HOS data now will miss this window." },
                  { year: "2028", weight: "~10x", share: "~13%", color: "#818cf8", note: "FUH projected entry at 1x. Post-discharge infrastructure built in 2026–27 pays off here." },
                  { year: "2029", weight: "~11x", share: "~15%+", color: "#f87171", note: "DSF-E enters at 1x. Full BH Stars portfolio active. Plans that built early hold a durable performance advantage." },
                ].map(y => (
                  <div key={y.year} style={{ background: "rgba(0,0,0,0.25)", borderRadius: 8, padding: "13px 14px", borderLeft: `3px solid ${y.color}` }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: y.color, fontFamily: "'DM Mono', monospace" }}>{y.year}</span>
                      <span style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", fontFamily: "'DM Mono', monospace" }}>{y.share}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#475569", marginTop: 1 }}>{y.weight} BH-specific weight</div>
                    <div style={{ fontSize: 11, color: "#334155", marginTop: 8, lineHeight: 1.45 }}>{y.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 10, color: "#1e293b", lineHeight: 1.5 }}>
                * Estimates calculated against Part C weighted measure pool (~62 points in 2026, declining as measures are removed in 2027+). Indirect BH influence on triple-weighted C12, C14, C18 not included.
              </div>
            </div>
            <div style={{ marginTop: 12, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, padding: "16px 18px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>⚡</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f59e0b", marginBottom: 5 }}>The Compounding Argument for Acting Now</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>
                  HOS Mental Health captures a member cohort surveyed <strong style={{ color: "#94a3b8" }}>2 years prior</strong>. Plans deploying Onward digital therapeutics and triggered engagement in 2026 will see those results reflected in 2028 Stars. Plans that wait for the 3x weight in 2027 miss two full measurement cycles. NeuroFlow research shows the clinical outcomes that drive these measures are achievable at scale: 41% reductions in anxiety, 24% reductions in depression, 43% fewer BH-related inpatient admissions, 34% fewer ED visits.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
