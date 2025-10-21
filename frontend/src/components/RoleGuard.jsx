export default function RoleGuard({ allowedRoles, children }) {
  const role = localStorage.getItem('role');
  if (!allowedRoles.includes(role)) return null;
  return children;
}
