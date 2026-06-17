import ContactForm from "@/components/ContactForm";

export default function Footer() {
  return (
    <footer className="border-t border-brand-brown/10 bg-brand-cream-alt">
      <div
        id="contact"
        className="py-20 px-6 text-center"
      >
        <div className="max-w-lg mx-auto">
          <h2 className="font-serif text-3xl text-brand-brown mb-8">CONTACT</h2>
          <ContactForm />
        </div>
      </div>
    </footer>
  );
}
