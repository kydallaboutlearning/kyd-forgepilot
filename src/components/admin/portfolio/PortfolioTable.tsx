
import { Button } from "@/components/ui/button";
import type { Portfolio } from "./PortfolioForm";

type Props = {
  items: Portfolio[];
  onEdit: (item: Portfolio) => void;
  onDelete: (id?: string) => void;
  loading: boolean;
};

export function PortfolioTable({ items, onEdit, onDelete, loading }: Props) {
  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading…</div>;
  }
  if (items.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No portfolio projects.</div>;
  }
  return (
    <table className="w-full">
      <thead>
        <tr className="text-sm text-muted-foreground">
          <th className="text-left font-medium pb-2">Title</th>
          <th className="text-left font-medium pb-2">Category</th>
          <th className="text-left font-medium pb-2">Date</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map(item =>
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.category}</td>
            <td>{item.date}</td>
            <td className="text-right">
              <Button size="sm" variant="outline" onClick={() => onEdit(item)}>Edit</Button>
              <Button size="sm" variant="destructive" className="ml-2" onClick={() => onDelete(item.id)}>Delete</Button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
