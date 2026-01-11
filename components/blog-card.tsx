import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="
        group block overflow-hidden rounded-xl
        border bg-white
        hover:shadow-lg transition
      "
    >
      <div className="relative h-48">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <p className="text-xs text-slate-500">
          {blog.location} · {blog.readingTime}
        </p>

        <h2 className="mt-2 text-lg font-semibold leading-snug">
          {blog.title}
        </h2>

        <p className="mt-2 text-sm text-slate-600 line-clamp-3">
          {blog.excerpt}
        </p>

        <p className="mt-4 text-sm font-medium text-slate-900 group-hover:underline">
          Read article →
        </p>
      </div>
    </Link>
  );
}
