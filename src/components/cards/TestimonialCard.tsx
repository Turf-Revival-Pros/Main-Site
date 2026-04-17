import { Star } from 'lucide-react';
import { type Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border-l-4 border-etr-green p-6">
      {/* Green quote mark */}
      <div className="text-4xl font-heading text-etr-green/20 leading-none mb-2">&ldquo;</div>
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-etr-gray leading-relaxed mb-4">
        &ldquo;{testimonial.reviewText}&rdquo;
      </blockquote>

      {/* Customer */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm font-heading font-semibold text-etr-green">
          {testimonial.customerName}
        </p>
        <p className="text-xs text-etr-gray-light">
          {testimonial.customerLocation}
        </p>
      </div>
    </div>
  );
}
