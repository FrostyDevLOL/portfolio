"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function useInView(ref: React.RefObject<HTMLElement>, options = {}) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isInView
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {children}
    </motion.section>
  )
}

export function BlockPage() {
  const languages = [
    { name: "HTML/CSS", proficiency: 100 },
    { name: "React", proficiency: 99 },
    { name: "Java", proficiency: 90 },
    { name: "Python", proficiency: 50 },
    { name: "Kotlin", proficiency: 10 },
  ].sort((a, b) => b.proficiency - a.proficiency);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.header 
        className="py-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Jairus Paul Victor</h1>
          <p className="text-xl text-gray-400">Web Developer & Student</p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-[300px] h-[300px]">
              <Image
                src="/portrait.jpg"
                alt="Jairus Paul Victor"
                fill
                priority
                className="rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/300";
                }}
              />
            </div>
            <div className="max-w-2xl">
              <p className="text-lg mb-4">
                Hello! I'm Jairus Paul Victor, a 14-year-old web developer and student. I make websites and webapps and I want to learn new coding languages. My goal is to make a successful webapp and have 1000s of users using it daily.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-semibold mb-4">Programming Languages</h2>
          <div className="grid gap-4">
            {languages.map((lang, index) => (
              <div key={lang.name} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="w-24 text-lg font-medium">{lang.name}</div>
                <motion.div 
                  className="flex-1"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Progress 
                    value={lang.proficiency} 
                    className="h-6 bg-gray-800 border border-gray-700" 
                  />
                </motion.div>
                <div className="w-12 text-right text-white">{lang.proficiency}%</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-semibold mb-4">Coding Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Notesy"
              description="A web application for making sticky notes"
              link="https://github.com/FrostyDevLOL/notesy/"
            />
            <ProjectCard
              title="A Chat App"
              description="Another normal chat app with DMs and GIFs"
              link="https://github.com/FrostyDevLOL/chat-app"
            />
            <ProjectCard
              title="BludTok"
              description="A TikTok clone made with HTML, CSS, and JavaScript"
              link="https://github.com/FrostyDevLOL/bludtok"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-semibold mb-4">School Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SchoolWorkCard
              title="Essay For English"
              description="Made an essay on the book When Micheal Met Mina"
              grade="28/30"
            />
            <SchoolWorkCard
              title="Disease & Disability Research Project"
              description="Created a PPT on Lymphoma Cancer"
              grade="97.78%"
            />
            <SchoolWorkCard
              title="Algebra Test"
              description="Algebra Test for mathematics"
              grade="96%"
            />
          </div>
        </AnimatedSection>
      </main>

      <motion.footer 
        className="py-6 bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Jairus Paul Victor. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}

function ProjectCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">{description}</CardDescription>
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Project
          </motion.a>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SchoolWorkCard({ title, description, grade }: { title: string; description: string; grade: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">{description}</CardDescription>
          <p className="mt-2 font-semibold text-green-400">Achievement: {grade}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}