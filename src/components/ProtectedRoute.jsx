import { Navigate } from "react-router-dom";
import { isAuthed } from "../auth";


export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" replace />;
  return children;
}
export function PublicOnly({ children }) {
  if (isAuthed()) return <Navigate to="/" replace />;
  return children;
}
