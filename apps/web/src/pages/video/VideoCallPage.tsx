import { Navigate } from "react-router-dom";

export function VideoCallPage() {
  return <Navigate to="/messages?tab=video" replace />;
}
