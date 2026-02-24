import Link from "next/link";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

const quickLinks = [
    { title: "Properties", href: "/properties" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Blog", href: "/blog" },
];

const propertyTypes = [
    { title: "Houses", href: "/properties?type=house" },
    { title: "Apartments", href: "/properties?type=apartment" },
    { title: "Condos", href: "/properties?type=condo" },
    { title: "Villas", href: "/properties?type=villa" },
    { title: "Townhouses", href: "/properties?type=townhouse" },
];

const contactInfo = [
    { icon: <Mail size={15} />, text: "hello@estatebridge.com", href: "mailto:hello@estatebridge.com" },
    { icon: <Phone size={15} />, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: <MapPin size={15} />, text: "123 Real Estate Blvd, NYC", href: "#" },
];

export function Footer() {
    return (
        <footer className="bg-primary text-white">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* ── Col 1: Brand ── */}
                    <div className="space-y-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 bg-secondary rounded-md flex items-center justify-center shrink-0">
                                <Building2 size={20} className="text-primary" />
                            </div>
                            <span className="text-xl font-bold font-serif tracking-tight text-white">
                                EstateBridge
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
                            Connecting you with exceptional properties worldwide. Your dream home awaits.
                        </p>
                    </div>

                    {/* ── Col 2: Quick Links ── */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-secondary tracking-wide">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-secondary transition-colors duration-200"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 3: Property Types ── */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-secondary tracking-wide">
                            Property Types
                        </h3>
                        <ul className="space-y-2.5">
                            {propertyTypes.map((type) => (
                                <li key={type.title}>
                                    <Link
                                        href={type.href}
                                        className="text-sm text-white/70 hover:text-secondary transition-colors duration-200"
                                    >
                                        {type.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 4: Contact Us ── */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-secondary tracking-wide">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            {contactInfo.map(({ icon, text, href }) => (
                                <li key={text}>
                                    <a
                                        href={href}
                                        className="flex items-start gap-2.5 text-sm text-white/70 hover:text-secondary transition-colors duration-200 group"
                                    >
                                        <span className="mt-0.5 shrink-0 text-white/50 group-hover:text-secondary transition-colors">
                                            {icon}
                                        </span>
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-center">
                    <p className="text-sm text-white/50">
                        © {new Date().getFullYear()} EstateBridge. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}