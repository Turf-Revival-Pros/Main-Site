'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { type BlogPost } from '@/types';

/* ── Category → gradient mapping ─────────────────────────────────────── */
const categoryGradients: Record<string, string> = {
  'Putting Greens': 'from-emerald-600 via-green-500 to-teal-400',
  'Turf Cleaning': 'from-sky-500 via-blue-400 to-cyan-400',
  'Pet Care': 'from-amber-500 via-orange-400 to-yellow-400',
  'Colorado Living': 'from-green-500 via-lime-400 to-yellow-400',
  'Seasonal Care': 'from-orange-500 via-amber-400 to-yellow-400',
  'Equipment & Technology': 'from-rose-500 via-pink-400 to-fuchsia-400',
};

const POSTS_PER_PAGE = 6;

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* ── Derived data ──────────────────────────────────────────────────── */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ['All', ...cats];
  }, [posts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);

  /* ── Filtering ─────────────────────────────────────────────────────── */
  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  /* ── Pagination ────────────────────────────────────────────────────── */
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  /* ── Format date helper ────────────────────────────────────────────── */
  function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      {/* ── Sticky Category Filter Bar ────────────────────────────────── */}
      <div className="sticky top-[96px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={
                  activeCategory === cat
                    ? { background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }
                    : undefined
                }
              >
                {cat}
                {cat !== 'All' && (
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? 'text-white/80' : 'text-gray-400'}`}>
                    {categoryCounts[cat] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {activeCategory !== 'All' && (
              <> in <span className="font-medium text-gray-700">{activeCategory}</span></>
            )}
            {searchQuery.trim() && (
              <> matching <span className="font-medium text-gray-700">&ldquo;{searchQuery}&rdquo;</span></>
            )}
          </p>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ── Post Grid (left) ────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {paginatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {paginatedPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Gradient header */}
                      <div
                        className={`relative h-40 bg-gradient-to-br ${categoryGradients[post.category] || 'from-gray-500 to-gray-400'} p-5 flex flex-col justify-end`}
                      >
                        {/* Dot pattern overlay */}
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '16px 16px',
                          }}
                        />
                        <span className="relative inline-block self-start bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="p-5 sm:p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#2E7D32] transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{post.author}</span>
                            <span className="mx-1">|</span>
                            <time dateTime={post.publishedDate}>{fmtDate(post.publishedDate)}</time>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] transition-colors inline-flex items-center gap-1"
                          >
                            Read
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                /* ── Empty state ─────────────────────────────────────── */
                <div className="text-center py-20 px-6 bg-gray-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                    We couldn&apos;t find any articles matching your criteria. Try a different category or search term.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
                  >
                    View all articles
                  </button>
                </div>
              )}

              {/* ── Pagination ───────────────────────────────────────── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? 'text-white shadow-md'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                      style={
                        currentPage === page
                          ? { background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }
                          : undefined
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* ── Sidebar (right) ─────────────────────────────────────── */}
            <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Search</h4>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition-all"
                  />
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Recent Posts</h4>
                <ul className="space-y-3">
                  {recentPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="flex items-start gap-3 group/recent">
                        {/* Tiny gradient square */}
                        <div
                          className={`w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-br ${categoryGradients[post.category] || 'from-gray-500 to-gray-400'}`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover/recent:text-[#2E7D32] transition-colors">
                            {post.title}
                          </p>
                          <time className="text-xs text-gray-400 mt-0.5 block" dateTime={post.publishedDate}>
                            {fmtDate(post.publishedDate)}
                          </time>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories with counts */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Categories</h4>
                <ul className="space-y-1">
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeCategory === cat
                            ? 'bg-[#2E7D32]/10 text-[#2E7D32] font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            activeCategory === cat
                              ? 'bg-[#2E7D32]/20 text-[#2E7D32]'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {categoryCounts[cat] || 0}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div
                className="rounded-2xl p-6 text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}
              >
                {/* Dot overlay */}
                <div className="relative">
                  <div
                    className="absolute inset-0 opacity-10 rounded-2xl"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  />
                  <div className="relative">
                    <h4 className="text-lg font-bold mb-2">Need Turf Care Help?</h4>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">
                      Get expert advice on maintaining your artificial turf or putting green. We serve the entire Denver metro area.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white text-[#2E7D32] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors shadow-md"
                    >
                      Get a Free Quote
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Hide scrollbar for filter tabs */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
