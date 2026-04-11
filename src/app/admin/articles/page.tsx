import AdminShell from "../AdminShell";
import ArticlesManager from "./ArticlesManager";

export default function ArticlesPage() {
  return (
    <AdminShell>
      <ArticlesManager />
    </AdminShell>
  );
}
