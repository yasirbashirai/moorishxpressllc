import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white py-32 text-center text-ink">
      <p className="font-display text-8xl font-bold text-red">404</p>
      <h1 className="mt-4 text-4xl font-bold uppercase">Wrong exit.</h1>
      <p className="mt-3 text-steel">That page is not on our route. Let&apos;s get you back on the road.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/">Home</Button>
        <Button href="/contact#quote" variant="ghost">Get a Quote</Button>
      </div>
    </section>
  );
}
