import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog';
import { pageSEO } from '@/data/seo';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: pageSEO.blog.title,
  description: pageSEO.blog.description,
  keywords: pageSEO.blog.keywords,
};

export default function BlogPage() {
  return (
    <>
      {/* ── Green Gradient Hero ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)',
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Decorative blurred circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Insights &amp; Expertise
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-5 leading-tight">
            Turf Revival Pros Blog
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Expert tips, maintenance guides, and Colorado-specific advice to keep
            your artificial turf and putting greens in peak condition.
          </p>
        </div>
      </section>

      {/* ── Blog Content (client component) ────────────────────────────── */}
      <BlogContent posts={blogPosts} />
    </>
  );
}
