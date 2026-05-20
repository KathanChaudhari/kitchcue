const features = [
  { title: "Know what is low", text: "Milk, eggs, spices, and pantry essentials in one stock view." },
  { title: "Cook from what you have", text: "Ask the assistant for meals using your current kitchen items." },
  { title: "Remember the small things", text: "Expiry, grocery, and household reminders on the home screen." }
];

export function FeatureHighlights() {
  return (
    <section className="space-y-3">
      {features.map((feature) => (
        <article key={feature.title} className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-bold">{feature.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#7a6b58]">{feature.text}</p>
        </article>
      ))}
    </section>
  );
}
