export function renderChildrenMenu(userRole: string) {
  switch (userRole) {
    case "ADMIN":
      return [];
    case "CITIZEN":
      return [{ to: "/dashboard/children/report", name: "Report new child" }];
    case "NGO":
      return [];
    case "DISTRICTAUTHORITY":
      return [];
    case "POLICE":
      return [];
    case "ORPHANAGE":
      return [];
    default:
      return [];
  }
}
