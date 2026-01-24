// Department/Faculty color mapping - uses simple colored squares for consistency
export const departmentIcons: Record<string, string> = {
  // All departments use a simple square indicator
  "default": "■"
};

export function getDepartmentIcon(department: string): string {
  return departmentIcons.default;
}
