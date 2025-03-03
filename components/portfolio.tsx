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

  useEffect(() => {
    console.log("Current theme:", theme)
  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    console.log("Changing theme to:", newTheme)
    setTheme(newTheme)
  }

  if (!mounted) {
    return null
  }

  return (
    <div key={theme} className="max-w-4xl mx-auto">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6">
        <div className="text-sm md:text-base leading-relaxed">
          <div className="text-[hsl(var(--syntax-highlight))] mb-2">
            <span className="text-accent-foreground">import</span> <span className="text-primary">React</span>{" "}
            <span className="text-accent-foreground">from</span>{" "}
            <span className="text-secondary">&apos;react&apos;</span>
          </div>

          <div className="mb-4">
            <span className="text-accent-foreground">const</span>{" "}
            <span className="text-[hsl(var(--syntax-highlight))]">Portfolio</span>{" "}
            <span className="text-primary">=</span> <span className="text-accent-foreground">()</span>{" "}
            <span className="text-primary">=&gt;</span> <span className="text-primary">&#123;</span>
          </div>

          <div className="ml-4 mb-4">
            <span className="text-accent-foreground">return</span> <span className="text-primary">(</span>
          </div>

          <div className="ml-8 mb-4">
            <span className="text-[hsl(var(--syntax-highlight))]">&lt;</span>
            <span className="text-secondary">div</span>
            <span className="text-accent-foreground"> theme</span>
            <span className="text-primary">=</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center text-primary hover:text-primary/80 focus:outline-none">
                &apos;{theme}&apos;
                <ChevronDown className="h-3 w-3 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>&apos;light&apos;</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>&apos;dark&apos;</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("neon-nights")}>
                  &apos;neon-nights&apos;
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("pastel-dreams")}>
                  &apos;pastel-dreams&apos;
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("forest-green")}>
                  &apos;forest-green&apos;
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("ocean-blue")}>
                  &apos;ocean-blue&apos;
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
          </div>

          {/* Developer Info */}
          <div className="ml-12 mb-4">
            <span className="text-[hsl(var(--syntax-highlight))]">&lt;</span>
            <span className="text-secondary">Developer</span>
            <span className="text-accent-foreground"> name</span>
            <span className="text-primary">=</span>
            <span className="text-secondary">&apos;Benny Blitz&apos;</span>
            <span className="text-accent-foreground"> title</span>
            <span className="text-primary">=</span>
            <span className="text-secondary">&apos;Web Developer&apos;</span>
            <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
          </div>

          {/* Tabs Navigation */}
          <div className="ml-16 mb-4 flex space-x-1 border-b border-border">
            <button
              onClick={() => setActiveTab("about")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "about" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
            >
              <User className="h-3 w-3 mr-1" />
              <span>about</span>
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "experience" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
            >
              <Briefcase className="h-3 w-3 mr-1" />
              <span>experience</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "education" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
            >
              <GraduationCap className="h-3 w-3 mr-1" />
              <span>education</span>
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "skills" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
            >
              <Code className="h-3 w-3 mr-1" />
              <span>skills</span>
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3 py-1 rounded-t-md flex items-center ${activeTab === "projects" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
            >
              <Layers className="h-3 w-3 mr-1" />
              <span>projects</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="ml-16 mb-4">
            {activeTab === "about" && (
              <div className="py-2">
                <div className="text-sm text-muted-foreground mb-2">&#123;/* About me */&#125;</div>
                <p className="text-sm mb-2 text-foreground">
                  Not really "passionate" about anything. Just a web developer who loves building things that live on the
                  internet.
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <a
                    href="mailto:john.doe@example.com"
                    className="flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    <span>blitzbenny8@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/Maruan256"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    <span>github.com/Maruan256</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/maruan-paschen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    <Linkedin className="h-4 w-4 mr-1" />
                    <span>linkedin.com/in/maruan-paschen</span>
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
                        <div className="font-medium text-foreground">Frontend Developer</div>
                        <div className="text-xs text-muted-foreground">HSH Kommunalsoftware| 2024 - Present</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground">
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Maintaining the front-end portion of a large code base</li>
                        <li>Implemented responsive designs and improved performance</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">
                      <div>
                        <div className="font-medium text-foreground">Full Stck Developer</div>
                        <div className="text-xs text-muted-foreground">Lufthansa Industry Solutions | 2022 - 2024</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground">
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Developed and maintained different fullstack Applications</li>
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
                  <h3 className="text-sm font-medium text-foreground">Master of Arts</h3>
                  <p className="text-xs text-muted-foreground">University of Leipzig | 2012 - 2014</p>
                  <p className="text-sm mt-1 text-foreground">
                    Written two novels actually, one was my thesis.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Bachelor of fine Arts in creative writing</h3>
                  <p className="text-xs text-muted-foreground">Hochschule der Künste Bern | 2009 - 2012</p>
                  <p className="text-sm mt-1 text-foreground">Keen focus on digital Arts</p>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="py-2">
                <div className="text-sm text-muted-foreground mb-2">&#123;/* Technical skills */&#125;</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Angular", "zod"].map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-xs rounded-md text-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Tools & Others</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Git", "GitHub", "VS Code", "Figma", "Jest", "Webpack", "npm", "moccha", "playwright", "Docker", "Jenkins"].map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-xs rounded-md text-primary">
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
                  <div className="border border-border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-foreground">Portfolio</h3>
                      <a
                        href="https://www.johannacharlottehorst.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">React, Tailwind, Framer Motion</p>
                    <p className="text-sm mt-2 text-foreground">
                      A Portfolio website with smooth animations and responsive design.
                    </p>
                  </div>

                  <div className="border border-border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-foreground">Is this East-Berlin</h3>
                      <a
                        href="https://www.isthiseastberlin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Next.js, React, shadcn, tailwind css, posthog, neon postgres, turf.js</p>
                    <p className="text-sm mt-2 text-foreground">
                      A single purpose Application to find out if you are in East-Berlin or in West-Berlin. (Or not in Berlin at all).
                    </p>
                  </div>

                  <div className="border border-border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-foreground">Portal Pioneer</h3>
                      <a
                        href="https://pioneer-sepia.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Next.js, Tailwind CSS, Framer Motion, vercel, auth.js, bcrypt, node, drizzle, t3stack</p>
                    <p className="text-sm mt-2 text-foreground">
                    A website to help you find more stuff on the Internet you didn't know you needed. Still under construction, but keep visiting, change is happening daily.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ml-12 mb-4">
            <span className="text-[hsl(var(--syntax-highlight))]">&lt;/</span>
            <span className="text-secondary">Developer</span>
            <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
          </div>

          <div className="ml-8 mb-4">
            <span className="text-[hsl(var(--syntax-highlight))]">&lt;/</span>
            <span className="text-secondary">div</span>
            <span className="text-[hsl(var(--syntax-highlight))]">&gt;</span>
          </div>

          <div className="ml-4 mb-4">
            <span className="text-primary">)</span>
          </div>

          <div className="mb-4">
            <span className="text-primary">&#123;</span>
          </div>

          <div>
            <span className="text-accent-foreground">export</span>{" "}
            <span className="text-accent-foreground">default</span> <span className="text-secondary">Portfolio</span>
          </div>
        </div>
      </div>
    </div>
  )
}

