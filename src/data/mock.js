export const kpis = {
  totalProjects: 3224,        // sample aligns to PSBD doc narrative (fraud detections count)
  flagged: 412,
  inProgress: 1280,
  completed: 988,
  delayed: 236
}

export const proposals = [
  {
    id:'PRJ-001',
    code:'320102107609000',
    name:'Construction of Flood Mitigation Structure along Cagayan de Oro River (Cabula Section 1), Cagayan de Oro City, Misamis Oriental',
    agency:'DPWH',
    implementingAgency:'Department of Public Works and Highways',
    region:'Region X',
    province:'Misamis Oriental',
    city:'Cagayan de Oro City',
    barangay:'Lumbia',
    budget: 100_000_000,
    startDate: null,
    longevity: null,
    status:'Not Yet Started',
    updates: 1,
    lat: 8.4081, lon: 124.5922,
    flags: { duplicate:true, poorPlan:false, hazard:false, flagged:true },
    program:'Flood Control Infrastructure',
    contractor:null,
    createdOn:'August 14, 2025'
  },
  {
    id:'PRJ-002',
    code:'320102107597000',
    name:'Construction of Flood Control Structure along Iponan River, Cagayan de Oro City, Package 12',
    agency:'DPWH',
    implementingAgency:'Department of Public Works and Highways',
    region:'Region X',
    province:'Misamis Oriental',
    city:'Cagayan de Oro City',
    barangay:'Iponan',
    budget: 151_000_000,
    startDate:null, longevity:null, status:'Not Yet Started', updates:0,
    lat:8.43, lon:124.60,
    flags:{ duplicate:false, poorPlan:true, hazard:false, flagged:true },
    program:'Flood Control Infrastructure',
    contractor:null,
    createdOn:'August 14, 2025'
  },
  {
    id:'PRJ-003',
    code:'320110211247000',
    name:'Construction of Flood Control Structure, Apayao-Abulug River Basin, Swan Section, Sta. 3+566 - Sta. 37+121 (L/S), Pudtol, Apayao',
    agency:'DPWH',
    implementingAgency:'Department of Public Works and Highways',
    region:'CAR',
    province:'Apayao',
    city:'Pudtol',
    barangay:'Swan',
    budget:150_000_000,
    startDate:null, longevity:null, status:'Not Yet Started', updates:0,
    lat:18.29, lon:121.33,
    flags:{ duplicate:false, poorPlan:false, hazard:false, flagged:false },
    program:'Flood Control Infrastructure',
    contractor:null,
    createdOn:'August 14, 2025'
  }
]
