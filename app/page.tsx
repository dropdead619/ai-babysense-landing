"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Heart,
  Mic,
  Brain,
  Lightbulb,
  Moon,
  Baby,
  Watch,
  Star,
  Play,
  Check,
  Menu,
  X,
  Twitter,
  Instagram,
  Linkedin,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8, rotateY: 45 },
  animate: { opacity: 1, scale: 1, rotateY: 0 },
  transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] },
}

const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

// Animated section wrapper
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  const testimonials = [
    {
      quote: "AI BabySense gave me peace of mind at 3 AM. Lifesaver!",
      author: "Sarah, new mom",
      rating: 5,
    },
    {
      quote: "Finally understand what my baby needs. The cry analysis is incredibly accurate.",
      author: "Michael, dad of twins",
      rating: 5,
    },
    {
      quote: "The sleep tracking helped us establish a routine. Our whole family sleeps better now.",
      author: "Emma, mother of 2",
      rating: 5,
    },
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <motion.header
        className="sticky top-0 z-50 glass-card border-b border-border/50"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isScrolled ? 0 : 0,
          opacity: isScrolled ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.img
                src="/logo/favicon-32x32.png"
                alt="AI BabySense App Logo"
                className="w-10 h-10"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              />
              <span className="font-space-grotesk font-bold text-xl text-foreground">AI BabySense</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Features", "How It Works", "Pricing", "FAQ"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-cta transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="hidden md:inline-flex hover-lift border-primary/20 hover:border-primary/40 bg-transparent"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
              <Button variant={"outline"} className="bg-primary hover:bg-primary/90 text-primary-foreground hover-lift neon-border">
                Get Started Free
              </Button>

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-border pt-4"
            >
              <div className="flex flex-col space-y-4">
                {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      <section className="gradient-bg py-20 md:py-32 relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-cta/20 rounded-full morphing-blob"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-primary/20 rounded-full morphing-blob"
          style={{ y: y2 }}
        />
        <motion.div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/30 rounded-full floating-animation" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 text-black text-sm font-medium glass-card hover-lift">
                <span className="mr-2"> ✨</span>
                Now with AI-powered insights
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space-grotesk font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight"
            >
              Understand Your Baby's <span className="gradient-text">Cries with AI</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Smart parenting assistant that decodes cries, tracks routines, and provides personalized care tips.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant={"ghost"}
                className="bg-gradient-cta text-primary hover:opacity-90 text-lg px-8 py-6 hover-lift magnetic-hover"
              >
                Get Started Free
                <Heart className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" className="text-lg text-black px-8 py-6 glass-card hover-lift">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12">
              <motion.img
                src="/happy-baby-aisense.png"
                alt="AI BabySense App Preview"
                className="mx-auto rounded-2xl hover:shadow-2xl max-w-sm h-auto hover-lift"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl md:text-5xl text-foreground mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to better understand your baby's needs
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                step: "1",
                icon: Mic,
                title: "Listen",
                description: "App records baby's cry via mic with advanced audio processing",
                color: "from-blue-400 to-blue-600",
              },
              {
                step: "2",
                icon: Brain,
                title: "Understand",
                description: "AI predicts reason (hungry, tired, diaper, discomfort) with 94% accuracy",
                color: "from-purple-400 to-purple-600",
              },
              {
                step: "3",
                icon: Lightbulb,
                title: "Guide",
                description: "Smart tips & reminders personalized to your baby's patterns",
                color: "from-amber-400 to-amber-600",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="text-center p-8 hover-lift glass-card border-2 hover:border-primary/20 group relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <CardHeader className="relative z-10">
                    <motion.div
                      className="w-16 h-16 icon-bg rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 neon-border">
                      <span className="font-space-grotesk font-bold text-white">{item.step}</span>
                    </div>
                    <CardTitle className="font-space-grotesk text-2xl gradient-text">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl md:text-5xl text-foreground mb-4">Key Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to understand and care for your baby
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Brain,
                title: "Cry Analyzer",
                description: "Know why your baby cries instantly with AI-powered analysis",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Moon,
                title: "Sleep & Feeding Tracker",
                description: "Smart logs & reminders to maintain healthy routines",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Baby,
                title: "Diaper Log",
                description: "Stay on top of changes with intelligent tracking",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Watch,
                title: "Wearable Integration",
                description: "Monitor heart rate, sleep, temperature seamlessly",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="p-6 hover-lift group glass-card border-2 hover:border-primary/30 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                  />

                  <CardHeader className="pb-4 relative z-10">
                    <motion.div
                      className="w-12 h-12 icon-bg rounded-lg flex items-center justify-center mb-4 pulse-glow"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className="w-6 h-6" />
                    </motion.div>
                    <CardTitle className="font-space-grotesk text-xl group-hover:gradient-text transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <motion.div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full floating-animation" />
        <motion.div className="absolute bottom-10 left-10 w-16 h-16 bg-accent/20 rounded-full morphing-blob" />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl md:text-5xl text-foreground mb-4">
                What Parents Say
              </h2>
              <p className="text-xl text-muted-foreground">Join thousands of happy parents</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 text-center glass-card hover-lift neon-border">
                <CardContent>
                  <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.blockquote
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-2xl md:text-3xl font-space-grotesk mb-6 leading-relaxed text-white"
                  >
                    "{testimonials[currentTestimonial].quote}"
                  </motion.blockquote>
                  <p className="text-muted text-lg">— {testimonials[currentTestimonial].author}</p>
                </CardContent>
              </Card>

              {/* Testimonial indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-primary pulse-glow" : "bg-muted-foreground/30"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl md:text-5xl text-foreground mb-4">Simple Pricing</h2>
              <p className="text-xl text-muted-foreground">Choose the plan that works for your family</p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* Free Plan */}
            <motion.div variants={scaleIn}>
              <Card className="p-8 hover-lift glass-card group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative z-10">
                  <CardTitle className="font-space-grotesk text-2xl">Free</CardTitle>
                  <CardDescription className="text-lg">Perfect for getting started</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  {[
                    "Basic sleep & feeding tracking",
                    "Simple cry logging",
                    "Basic care reminders",
                    "Community support",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button
                    variant="outline"
                    className="w-full hover-lift border-primary/20"
                  >
                    Get Started Free
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Premium Plan */}
            <motion.div variants={scaleIn}>
              <Card className="p-8 border-2 border-primary hover-lift glass-card relative overflow-visible! neon-border">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-cta pulse-glow bg-primary text-white">
                  <Zap className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />

                <CardHeader className="relative z-10">
                  <CardTitle className="font-space-grotesk text-2xl text-muted">Premium</CardTitle>
                  <CardDescription className="text-lg">Full AI-powered experience</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-muted">$9.99</span>
                    <span className="text-muted">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  {[
                    "AI cry analysis & predictions",
                    "Personalized care tips",
                    "Wearable device integration",
                    "Advanced sleep insights",
                    "Priority support",
                    "Family sharing",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-muted">{feature}</span>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button variant={"secondary"} className="w-full hover:bg-primary/90 text-primary-foreground hover-lift magnetic-hover">
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl md:text-5xl text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">Everything you need to know about AI BabySense</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "How accurate is the AI cry analysis?",
                    answer:
                      "Our AI has been trained on thousands of baby cries and achieves 94% accuracy in identifying the reason behind your baby's cries. The system continuously learns and improves with use.",
                  },
                  {
                    question: "Is my baby's data safe and private?",
                    answer:
                      "Absolutely. We use end-to-end encryption and never share your personal data. All audio recordings are processed locally on your device when possible, and any cloud processing is fully anonymized.",
                  },
                  {
                    question: "What devices are compatible?",
                    answer:
                      "AI BabySense works on iOS and Android smartphones and tablets. We also integrate with popular baby monitors and wearable devices like Owlet and Nanit.",
                  },
                  {
                    question: "Can I use it for multiple babies?",
                    answer:
                      "Yes! Premium subscribers can create profiles for multiple babies and track each one individually. The AI learns each baby's unique patterns.",
                  },
                  {
                    question: "What if the AI gets it wrong?",
                    answer:
                      "You can always provide feedback to help the AI learn your baby's specific patterns. The system becomes more accurate over time as it learns your baby's unique cues.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="glass-card rounded-lg px-6 hover-lift">
                    <AccordionTrigger className="text-left font-space-grotesk text-lg hover:no-underline hover:gradient-text transition-all duration-300">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 gradient-cta text-white relative overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full morphing-blob"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full floating-animation" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <motion.h2
              className="font-space-grotesk font-bold text-3xl md:text-5xl mb-6"
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.6 }}
            >
              Parent smarter, not harder.
            </motion.h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of parents who've found peace of mind with AI BabySense. Start your free trial today.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 hover-lift magnetic-hover"
              >
                <Shield className="w-5 h-5 mr-2" />
                Get AI BabySense Today
                <Heart className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="py-12 glass-card border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <motion.div className="flex items-center space-x-2 mb-4" whileHover={{ scale: 1.05 }}>
                <div className="w-8 h-8 icon-bg rounded-lg flex items-center justify-center pulse-glow">
                  <Baby className="w-5 h-5" />
                </div>
                <span className="font-space-grotesk font-bold text-xl gradient-text">AI BabySense</span>
              </motion.div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The smart parenting assistant that helps you understand your baby's needs with AI-powered insights.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }}>
                    <Button variant="ghost" size="sm" className="hover-lift">
                      <Icon className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-space-grotesk font-semibold mb-4 gradient-text">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                {["Features", "Pricing", "FAQ", "Download"].map((item, index) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-space-grotesk font-semibold mb-4 gradient-text">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                {["About", "Privacy", "Terms", "Contact"].map((item, index) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href="#" className="hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 AI BabySense. All rights reserved. Made with ❤️ for parents everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
