"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, AlignLeft, ImageIcon, Video, Volume2, Sun, Moon } from "lucide-react"

export default function GlimpseLanding() {
  const [isDark, setIsDark] = useState(false)
  const [activeFilter, setActiveFilter] = useState("text")
  const [activeMode, setActiveMode] = useState("WEB")

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    // Save theme preference
    localStorage.setItem("theme", isDark ? "dark" : "light")

    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className={`landing-container ${isDark ? "dark" : "light"}`}>
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="logo">GLIMPSE</div>

          <div className="nav-center">
            <div className="toggle-group" data-active={activeMode}>
              <button 
                className={`toggle-btn ${activeMode === "WEB" ? "active" : ""}`}
                onClick={() => setActiveMode("WEB")}
              >
                WEB
              </button>
              <button 
                className={`toggle-btn ${activeMode === "ARNS" ? "active" : ""}`}
                onClick={() => setActiveMode("ARNS")}
              >
                ARNS
              </button>
            </div>
          </div>

          <div className="nav-right">
            <button className="status-btn">STATUS</button>
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <main className="hero-section">
        {/* Background Layer */}
        <div className="background-layer">
          <Image
            src="/images/background.jpg"
            alt="Mountain background"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="background-image"
          />
        </div>

        {/* GLIMPSE Text Layer */}
        <div className="glimpse-text-layer ">
          <h1 className="glimpse-title
          
          ">GLIMPSE</h1>
        </div>

        {/* Mountain Overlay Layer */}
        <div className="mountain-overlay-layer">
          <Image
            src="/images/mountain-overlay.png"
            alt="Mountain overlay"
            fill
            style={{ objectFit: "cover" }}
            className="mountain-overlay"
          />
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder={`Search the web for anything...`} 
                className="search-input" 
              />
              <button className="search-btn">
                Search 
              </button>
            </div>

            <div className="filter-buttons">
              {[
                { id: "text", icon: AlignLeft, label: "text" },
                { id: "image", icon: ImageIcon, label: "image" },
                { id: "video", icon: Video, label: "video" },
                { id: "audio", icon: Volume2, label: "audio" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <filter.icon className="filter-icon" size={16} />
                  <span className="filter-label">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>
            @Glimpse all rights reserved • Currently searching: {activeMode}
          </p>
        </footer>
      </main>
    </div>
  )
}
