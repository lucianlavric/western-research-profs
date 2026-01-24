// Department/Faculty icons mapping - using unicode symbols for cross-platform consistency
export const departmentIcons: Record<string, string> = {
  // Sciences
  "Mathematics": "∑",
  "Statistics": "⊕",
  "Computer Science": "◆",
  "Physics & Astronomy": "◎",
  "Chemistry": "⚛",
  "Biology": "◉",
  "Biochemistry": "⚗",
  "Microbiology & Immunology": "◈",
  
  // Engineering
  "Engineering": "⚙",
  "Electrical & Computer Engineering": "⚡",
  "Mechanical & Materials Engineering": "⚒",
  "Civil & Environmental Engineering": "◧",
  "Chemical & Biochemical Engineering": "⚜",
  
  // Medical Sciences
  "Medicine": "✦",
  "Pathology & Laboratory Medicine": "⊗",
  "Physiology & Pharmacology": "⊙",
  "Anatomy & Cell Biology": "◈",
  "Epidemiology & Biostatistics": "⊜",
  
  // Social Sciences & Others
  "Psychology": "⊕",
  "Sociology": "◯",
  "Economics": "◈",
  "Political Science": "◆",
  "Anthropology": "⬡",
  
  // Arts & Humanities
  "English": "⬘",
  "History": "⊟",
  "Philosophy": "◆",
  "Music": "♪",
  "Art": "◇",
  
  // Default fallback
  "default": "■"
};

export function getDepartmentIcon(department: string): string {
  return departmentIcons[department] || departmentIcons.default;
}
