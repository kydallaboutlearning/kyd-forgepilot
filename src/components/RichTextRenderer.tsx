
export default function RichTextRenderer({ html }: { html: string }) {
  return (
    <div
      className="prose prose-neutral max-w-none text-base"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
