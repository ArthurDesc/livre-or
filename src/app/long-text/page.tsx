"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function LongTextPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
    }
    if (paragraphsRef.current.length) {
      paragraphsRef.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
              },
              delay: i * 0.05,
            }
          )
        }
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contenu Long</h1>
          <Link href="/">
            <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              Revenir à l'accueil
            </button>
          </Link>
        </div>
        <div ref={contentRef} className="bg-white shadow rounded-lg p-6 mb-8">
          <p ref={el => { paragraphsRef.current[0] = el }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna.
          </p>
          <p ref={el => { paragraphsRef.current[1] = el }}>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna.
          </p>
          <p ref={el => { paragraphsRef.current[2] = el }}>
            (Répéter ce texte pour simuler un contenu très long...)
          </p>
          <p ref={el => { paragraphsRef.current[3] = el }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna.<br /><br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </main>
  )
} 