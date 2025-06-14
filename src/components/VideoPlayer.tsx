
export default function VideoPlayer({ video }: { video: string }) {
  // Accepts YouTube embed URLs or direct video urls
  if (!video) return null;
  if (video.includes("youtube") || video.includes("youtu.be") || video.includes("embed")) {
    return (
      <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
        <iframe
          src={video}
          title="Project Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }
  return (
    <video controls className="w-full rounded-lg bg-black">
      <source src={video} />
      Your browser does not support the video tag.
    </video>
  )
}
