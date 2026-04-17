import Link from 'next/link';
import { type BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden card-hover">
      <div className="img-zoom aspect-[16/10]">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium bg-etr-bg-alt text-etr-green px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <time className="text-xs text-etr-gray-light" dateTime={post.publishedDate}>
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <h3 className="text-lg font-heading font-bold text-etr-black mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-etr-gray-light leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-semibold text-etr-blue hover:text-etr-blue-dark transition-colors"
        >
          Read More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
