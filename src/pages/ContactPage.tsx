import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid gap-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Email Address" />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" className="h-32" />
            </div>
            
            <Button type="submit" className="w-full">Send Message</Button>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
            <div className="space-y-4 text-gray-600">
              <p>Email: contact@newsdaily.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 News Street, Media City, ST 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}