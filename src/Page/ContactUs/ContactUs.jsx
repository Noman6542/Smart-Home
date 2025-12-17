import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        Have questions or need help? Feel free to reach out to us anytime.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Phone */}
        <div className="rounded-2xl shadow p-6 text-center">
          <Phone className="mx-auto mb-3 text-indigo-600" size={32} />
          <h3 className="font-semibold text-lg">Phone</h3>
          <p className="text-gray-600">+880 1577-036525</p>
        </div>

        {/* Email */}
        <div className="rounded-2xl shadow p-6 text-center">
          <Mail className="mx-auto mb-3 text-indigo-600" size={32} />
          <h3 className="font-semibold text-lg">Email</h3>
          <p className="text-gray-600">mdaanoman6@gmail.com</p>
        </div>

        {/* Location */}
        <div className="rounded-2xl shadow p-6 text-center">
          <MapPin className="mx-auto mb-3 text-indigo-600" size={32} />
          <h3 className="font-semibold text-lg">Location</h3>
          <p className="text-gray-600">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Send Us a Message
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-3"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border rounded-lg p-3"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
