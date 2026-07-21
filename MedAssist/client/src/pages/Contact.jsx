import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaClock,
  FaHeadset
} from "react-icons/fa6";
import { toast } from "react-toastify";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const officeHours = [
  { days: "Monday - Friday", hours: "08:00 AM - 08:00 PM" },
  { days: "Saturday", hours: "09:00 AM - 05:00 PM" },
  { days: "Sunday & Holidays", hours: "Emergency Portal Only (24/7)" }
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title="Contact Us"
          subtitle="Have questions or need assistance? Our team is here to help you anytime."
        />

        <div className="grid lg:grid-cols-2 gap-10 mt-12">
          {/* Left Side - Get in Touch */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6 tracking-tight transition-colors duration-300">
                Get In Touch
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/30 rounded-xl flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                    <FaEnvelope className="text-teal-650 dark:text-teal-400 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm transition-colors duration-300">
                      Email Address
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-300">
                      support@medassist.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                    <FaPhone className="text-emerald-600 dark:text-emerald-400 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm transition-colors duration-300">
                      Phone Line
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-300">
                      +92 300 1234567
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                    <FaLocationDot className="text-cyan-600 dark:text-cyan-400 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm transition-colors duration-300">
                      Headquarters
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-300">
                      Canal Road, Faisalabad, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Operational Hours */}
            <Card>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-5 tracking-tight flex items-center gap-2">
                <FaClock className="text-teal-600 dark:text-teal-400 text-base" />
                Operational Hours
              </h3>
              <div className="space-y-3.5">
                {officeHours.map((oh, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-100 dark:border-slate-850/60 last:border-none last:pb-0">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{oh.days}</span>
                    <span className="font-bold text-slate-500 dark:text-slate-450">{oh.hours}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Helpline Info */}
            <Card className="bg-gradient-to-br from-teal-900/5 to-emerald-900/5 dark:from-teal-950/10 dark:to-emerald-950/10 border-teal-500/10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-650 dark:text-teal-400 text-base flex-shrink-0">
                  <FaHeadset />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Emergency Medical Portal</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">
                    If you are experiencing a life-threatening emergency, please visit our secure patient portal to alert our verified doctors directly.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Send Message Form */}
          <Card className="h-fit">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6 tracking-tight transition-colors duration-300">
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />

              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <textarea
                rows="5"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 outline-none transition placeholder-slate-400 dark:placeholder-white/60 text-sm"
              ></textarea>

              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact;