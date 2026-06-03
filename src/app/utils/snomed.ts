export interface SnomedConcept {
  id: string;
  name: string;
  category: string;
}

export const SNOMED_HIERARCHIES = {
  SYMPTOMS: '<< 404684003', // Clinical finding
  DIAGNOSIS: '<< 64572001',  // Disease
  MEDICATIONS: '<< 373873005', // Pharmaceutical / biologic product
  LAB: '<< 71388002',        // Procedure (for lab tests)
  RADIOLOGY: '<< 363679005',  // Imaging
  SURGERY: '<< 387713003',    // Surgical procedure
  AYUSH: 'AYUSH',             // Custom tag mapped to '*' in fetch
  DENTAL: '<< 277132007',     // Dental procedure (Standard SNOMED concept)
  DENTAL_SYMPTOMS: '<< 278544002', // Tooth finding
  DENTAL_DIAGNOSIS: '<< 105995000', // Disorder of teeth AND/OR supporting structures
  NURSING: 'NURSING',         // Custom tag mapped to '*' in fetch
  VET: 'VET',                 // Custom tag mapped to '*' in fetch
  ALLERGIES: '<< 419511003',   // Allergy to substance
};

export async function searchSnomed(query: string, ecl: string, limit: number = 15, signal?: AbortSignal): Promise<SnomedConcept[]> {
  if (!query || query.length < 2) return [];

  // Map custom hierarchies to wildcard for Snowstorm API since the extensions are not loaded
  const actualEcl = ['AYUSH', 'NURSING', 'VET'].includes(ecl) ? '*' : ecl;

  try {
    const response = await fetch(`/api/MAIN/concepts?term=${encodeURIComponent(query)}&active=true&limit=${limit}&ecl=${encodeURIComponent(actualEcl)}`, {
      signal
    });
    const data = await response.json();
    
    return (data.items || []).map((item: any) => ({
      id: item.conceptId,
      name: item.pt?.term || item.idAndFsnTerm.split('|')[1]?.trim() || item.idAndFsnTerm,
      category: ''
    }));
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return [];
    }
    console.error('Snowstorm fetch error:', error);
    return [];
  }
}

export async function searchDrugs(query: string): Promise<SnomedConcept[]> {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(`/api/drugs?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.marketer || ''
    }));
  } catch (error) {
    console.error('Drug search error:', error);
    return [];
  }
}
