import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-6xl font-heading font-black text-etr-green mb-4">
          404
        </h1>
        <h2 className="text-2xl font-heading font-bold text-etr-black mb-4">
          Page Not Found
        </h2>
        <p className="text-etr-gray-light mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary" size="md">
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
