import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
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
            <Link
              href="/"
              className="relative block h-[90px] w-[220px] overflow-hidden"
              aria-label="Sangbe Foundation home"
            >
              <Image
                src="/images/sangbe-logo.jpeg"
                alt="Sangbe Foundation"
                fill
                sizes="220px"
                className="object-contain object-left"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              Advancing psycho-education to raise awareness about stress,
              addiction and mental health while promoting healthy coping
              strategies and positive behavioral change.
            </p>

           
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
                <Phone
                  size={18}
                  className="shrink-0 text-[#78d79d]"
                />

                <a
                  href="tel:+220877779250"
                  className="transition hover:text-white"
                >
                  +220 877779250
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-[#78d79d]"
                />

                <a
                  href="mailto:sangbefoundation@gmail.com"
                  className="break-all transition hover:text-white"
                >
                  sangbefoundation@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Sangbe Foundation. All rights reserved.
          </p>

          <p className="uppercase tracking-[0.12em]">
            Transforming the Nation Through Psycho-Education
          </p>
        </div>
      </div>
    </footer>
  );
}