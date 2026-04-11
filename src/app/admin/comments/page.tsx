import AdminShell from "../AdminShell";
import CommentsManager from "./CommentsManager";

export default function CommentsPage() {
  return (
    <AdminShell>
      <CommentsManager />
    </AdminShell>
  );
}
