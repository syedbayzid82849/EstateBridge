"use client";
import { motion } from "framer-motion";
import { Shield, Clock, Award, Users } from "lucide-react";

export default function WhyChoose() {
    const features = [
        {
            icon: Shield,
            title: "Trusted Platform",
            description: "Every listing is verified for authenticity and quality assurance.",
        },
        {
            icon: Clock,
            title: "Quick Process",
            description: "Streamlined buying and renting experience from search to keys.",
        },
        {
            icon: Award,
            title: "Premium Listings",
            description: "Access exclusive properties not available anywhere else.",
        },
        {
            icon: Users,
            title: "Expert Agents",
            description: "Connect with experienced agents who know the local market.",
        },
    ];
    return (
        <section className="py-20 bg-estate-cream">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className=" font-body font-semibold text-sm tracking-widest uppercase">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
                        The EstateBridge Advantage
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm font-body leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
