import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";

export default function BlogDetails({ params }: { params: { slug: string } }) {
  const blog = blogs.find(b => b.slug === params.slug);
  if (!blog) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seo.description,
    author: {
      "@type": "Organization",
      name: blog.author,
    },
    datePublished: blog.publishedAt,
  };

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* TITLE */}
        <header className="mb-8">
          <p className="text-sm text-slate-500">
            {blog.location} · {blog.readingTime}
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            {blog.title}
          </h1>
        </header>

        {/* HERO IMAGE */}
        <div className="relative h-[360px] rounded-xl overflow-hidden mb-10">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* CONTENT */}
        <article className="space-y-10">
          {blog.content.map(section => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold mb-3">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-700 leading-relaxed mb-3">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
