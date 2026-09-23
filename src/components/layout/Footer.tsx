import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Share2,
  Camera,
} from "lucide-react";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Awareness", href: "/awareness" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
];

const supportLinks = [
  { name: "Donate", href: "/donate" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Request Help", href: "/request-help" },
  { name: "Partners", href: "/partners" },
  { name: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#092519] text-white">
      <div className="container py-16 lg:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Heart size={22} className="text-[#78d79d]" />
              </div>

              <div className="leading-tight">
                <span className="block text-lg font-bold">
                  Sangbe Foundation
                </span>
                <span className="text-xs text-white/50">
                  Community • Hope • Change
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
              Supporting people and communities through awareness, prevention,
              disaster response, and practical assistance.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.07] text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <Share2 size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.07] text-white/70 transition hover:bg-white/15 hover:text-white"
              >
               <Camera size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold">Explore</h3>

            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold">Get Involved</h3>

            <div className="mt-5 flex flex-col gap-3">
              {supportLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold">Contact</h3>

            <div className="mt-5 space-y-4 text-sm text-white/55">
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#78d79d]"
                />
                <span>
                  Busumbala, West Coast Region
                  <br />
                  The Gambia
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-[#78d79d]" />
                <span>Phone / WhatsApp coming soon</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-[#78d79d]" />
                <span>Email coming soon</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Sangbe Foundation. All rights reserved.
          </p>

          <p>Stronger communities. Brighter futures.</p>
        </div>

      </div>
    </footer>
  );
}