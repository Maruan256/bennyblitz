"use client"

import { useState, useEffect } from "react"
import {
  Github,
  Mail,
  Linkedin,
  ChevronDown,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Layers,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("about")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6">
        <div className="text-sm md:text-base leading-relaxed">
          <div className="text-blue-500 mb-2">
            <span className="text-purple-500">import</span> <span className="text-blue-500">React</span>{" "}
            <span className="text-purple-500">from</span> <span className="text-green-500">&apos;react&apos;</span>
          </div>

          <div className="mb-4">
            <span className="text-purple-500">const</span> <span className="text-yellow-500">Portfolio</span>{" "}
            <span className="text-blue-500">=</span> <span className="text-purple-500">()</span>{" "}
            <span className="text-blue-500">=&gt;</span> <span className="text-blue-500">&#123;</span>
          </div>

          <div className="ml-4 mb-4">
            <span className="text-purple-500">return</span> <span className="text-blue-500">(</span>
          </div>

          <div className="ml-8 mb-4">
            <span className="text-blue-500">&lt;</span>
            <span className="text-green-500">div</span>
            <span className="text-yellow-500"> mode</span>
            <span className="text-blue-500">=</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center text-green-500 hover:underline focus:outline-none">
                &apos;{theme}&apos;
                <ChevronDown className="h-3 w-3 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>&apos;light&apos;</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>&apos;dark&apos;</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>&apos;system&apos;</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-blue-500">&gt;</span>
          </div>

          {/* Developer Info */}
          <div className="ml-12 mb-4">
            <span className="text-blue-500">&lt;</span>
            <span className="text-green-500">Developer</span>
            <span className="text-yellow-500"> name</span>
            <span className="text-blue-500">=</span>
            <span className="text-green-500">&apos;John Doe&apos;</span>
            <span className="text-yellow-500"> title</span>
            <span className="text-blue-500">=</span>
            <span className="text-green-500">&apos;Frontend Developer&apos;</span>
            <span className="text-blue-500">&gt;</span>
          </div>

          {/* Tabs Navigation */}
          <div className="ml-16 mb-4 flex space-x-1 border-b">
            <button
              onClick={() => setActiveTab("about")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "about" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"}`}
            >
              <User className="h-3 w-3 mr-1" />
              <span className="text-green-500">about</span>
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "experience" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"}`}
            >
              <Briefcase className="h-3 w-3 mr-1" />
              <span className="text-green-500">experience</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "education" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"}`}
            >
              <GraduationCap className="h-3 w-3 mr-1" />
              <span className="text-green-500">education</span>
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "skills" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"}`}
            >
              <Code className="h-3 w-3 mr-1" />
              <span className="text-green-500">skills</span>
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "projects" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"}`}
            >
              <Layers className="h-3 w-3 mr-1" />
              <span className="text-green-500">projects</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="ml-16 mb-4">
            {activeTab === "about" && (
              <div className="py-2">
                <div className="text-sm text-muted-foreground mb-2">&#123;/* About me */&#125;</div>
                <p className="text-sm mb-2">
                  Passionate frontend developer with a keen eye for creating elegant user interfaces and seamless user
                  experiences. I enjoy turning complex problems into simple, beautiful, and intuitive designs.
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <a href="mailto:john.doe@example.com" className="flex items-center text-sm hover:text-primary">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>john.doe@example.com</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm hover:text-primary"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    <span>github.com/johndoe</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4 mr-1" />
                    <span>linkedin.com/in/johndoe</span>
                  </a>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="py-2">
                <div className="text-sm text-muted-foreground mb-2">&#123;/* Work experience */&#125;</div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">
                      <div>
                        <div className="font-medium">Senior Frontend Developer</div>
                        <div className="text-xs text-muted-foreground">Tech Company Inc. | 2021 - Present</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Led the development of the company's flagship web application</li>
                        <li>Implemented responsive designs and improved performance by 40%</li>
                        <li>Mentored junior developers and conducted code reviews</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">
                      <div>
                        <div className="font-medium">Frontend Developer</div>
                        <div className="text-xs text-muted-foreground">Digital Agency | 2018 - 2021</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Developed and maintained client websites using React and Next.js</li>
                        <li>Collaborated with designers to implement pixel-perfect UIs</li>
                        <li>Optimized applications for maximum speed and scalability</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {activeTab === "education" && (
              <div className="py-2">
                <div className="text-sm text-muted-foreground mb-2">&#123;/* Education */&#125;</div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium">Master of Computer Science</h3>
                  <p className="text-xs text-muted-foreground">University of Technology | 2016 - 2018</p>
                  <p className="text-sm mt-1">Specialized in Human-Computer Interaction and Web Technologies</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Bachelor of Science in Software Engineering</h3>
                  <p className="text-xs text-muted-foreground">State University | 2012 - 2016</p>
                  <p className="text-sm mt-1">Graduated with honors, GPA 3.8/4.0</p>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="py-2">
                <div className="text-sm text-muted-foreground mb-2">&#123;/* Technical skills */&#125;</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"].map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-xs rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Tools & Others</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Git", "GitHub", "VS Code", "Figma", "Jest", "Webpack", "npm"].map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-xs rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="py-2">
                <div className="text-sm text-muted-foreground mb-2">&#123;/* Projects */&#125;</div>
                <div className="space-y-4">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">E-commerce Platform</h3>
                      <a
                        href="https://project1.example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center hover:text-primary"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Next.js, TypeScript, Tailwind CSS, Stripe</p>
                    <p className="text-sm mt-2">
                      A full-featured e-commerce platform with product listings, cart functionality, and secure
                      checkout.
                    </p>
                  </div>

                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">Dashboard UI</h3>
                      <a
                        href="https://project2.example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center hover:text-primary"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">React, shadcn/ui, Recharts</p>
                    <p className="text-sm mt-2">
                      An admin dashboard with data visualization, user management, and real-time analytics.
                    </p>
                  </div>

                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">Portfolio Website</h3>
                      <a
                        href="https://project3.example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center hover:text-primary"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Next.js, Tailwind CSS, Framer Motion</p>
                    <p className="text-sm mt-2">
                      A creative portfolio website with smooth animations and responsive design.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ml-12 mb-4">
            <span className="text-blue-500">&lt;/</span>
            <span className="text-green-500">Developer</span>
            <span className="text-blue-500">&gt;</span>
          </div>

          <div className="ml-8 mb-4">
            <span className="text-blue-500">&lt;/</span>
            <span className="text-green-500">div</span>
            <span className="text-blue-500">&gt;</span>
          </div>

          <div className="ml-4 mb-4">
            <span className="text-blue-500">)</span>
          </div>

          <div className="mb-4">
            <span className="text-blue-500">&#125;</span>
          </div>

          <div>
            <span className="text-purple-500">export</span> <span className="text-purple-500">default</span>{" "}
            <span className="text-yellow-500">Portfolio</span>
          </div>
        </div>
      </div>
    </div>
  )
}

