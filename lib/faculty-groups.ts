// Group departments by faculty for better organization
export const FACULTY_GROUPS: Record<string, string[]> = {
  "Engineering": [
    "Electrical & Computer Engineering",
    "Mechanical & Materials Engineering",
    "Chemical & Biochemical Engineering",
    "Civil & Environmental Engineering",
  ],
  "Science": [
    "Computer Science",
    "Biology",
    "Mathematics",
    "Statistical & Actuarial Sciences",
    "Physics & Astronomy",
    "Chemistry",
  ],
  "Schulich Medicine & Dentistry": [
    "Physiology & Pharmacology",
    "Biochemistry",
    "Anatomy & Cell Biology",
    "Microbiology & Immunology",
    "Epidemiology & Biostatistics",
    "Pathology & Laboratory Medicine",
    "Medical Biophysics",
    "Dentistry",
    "Family Medicine",
    "Oncology",
    "Ophthalmology",
    "Paediatrics",
    "Psychiatry",
    "Surgery",
  ],
  "Social Science": [
    "Psychology",
    "Political Science",
    "History",
    "Anthropology",
    "Sociology",
    "Geography & Environment",
  ],
  "Arts & Humanities": [
    "English & Writing Studies",
    "Philosophy",
    "French Studies",
  ],
  "Health Sciences": [
    "Kinesiology",
    "Nursing",
  ],
  "Other Faculties": [
    "Law",
    "Education",
    "Music",
    "Information & Media Studies",
    "Ivey Business School",
  ],
};

export function getFacultyForDepartment(department: string): string {
  for (const [faculty, departments] of Object.entries(FACULTY_GROUPS)) {
    if (departments.includes(department)) {
      return faculty;
    }
  }
  return "Other";
}

export function groupDepartmentsByFaculty(departments: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  for (const dept of departments) {
    const faculty = getFacultyForDepartment(dept);
    if (!grouped[faculty]) {
      grouped[faculty] = [];
    }
    grouped[faculty].push(dept);
  }

  return grouped;
}

// Faculty colors for visual distinction
export const FACULTY_COLORS: Record<string, string> = {
  "Engineering": "#ff9f43",      // Orange
  "Science": "#6bcb77",          // Green
  "Schulich Medicine & Dentistry": "#ff5c5c",  // Coral/Red
  "Social Science": "#f472b6",   // Pink
  "Arts & Humanities": "#a855f7", // Purple
  "Health Sciences": "#06b6d4",   // Cyan
  "Other Faculties": "#64748b",   // Slate
  "Other": "#94a3b8",
};

// All Departments button color
export const ALL_DEPARTMENTS_COLOR = "#ffd93d"; // Yellow
