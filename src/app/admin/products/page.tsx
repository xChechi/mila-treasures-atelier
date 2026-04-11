import AdminShell from "../AdminShell";
import ProductsManager from "./ProductsManager";

export default function ProductsPage() {
  return (
    <AdminShell>
      <ProductsManager />
    </AdminShell>
  );
}
