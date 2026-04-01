import ContactForm from "@/components/Form";

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">Contact Us</h1>
      <p className="text-base text-gray-600">
        Reach out with questions or to book a consultation—we’re here to help
        you take the next step.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}
