
import { Button } from "@/components/ui/button";
type Project = {
  id?: string;
  title: string;
  category: string;
  date: string;
};

export default function AdminProjectTable({
  projects, onEdit, onDelete
}: {
  projects: Project[];
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  if (!projects.length)
    return <div className="text-muted-foreground p-10">No projects found.</div>;

  return (
    <table className="w-full border mt-8 rounded-lg overflow-hidden animate-fade-in">
      <thead className="bg-muted">
        <tr>
          <th className="py-2 px-3 text-left">Title</th>
          <th className="py-2 px-3 text-left">Category</th>
          <th className="py-2 px-3 text-left">Date</th>
          <th className="py-2 px-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id} className="border-b last:border-b-0">
            <td className="py-2 px-3">{p.title}</td>
            <td className="py-2 px-3">{p.category}</td>
            <td className="py-2 px-3">{p.date}</td>
            <td className="py-2 px-3 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(p)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(p.id!)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
