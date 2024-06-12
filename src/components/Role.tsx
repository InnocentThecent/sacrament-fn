export default function RoleButton({ role }: { role: string }) {
  switch (role) {
    case "ADMIN":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          {role}
        </span>
      );
    case "CORRESPONDENT":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {role}
        </span>
      );
    case "ORGANIZATION":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {role}
        </span>
      );
    default:
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {role}
        </span>
      );
  }
}
