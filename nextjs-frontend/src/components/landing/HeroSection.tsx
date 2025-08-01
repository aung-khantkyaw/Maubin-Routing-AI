"use client"
import { themeClasses } from '@/config/site'
import { ArrowRight, Play, } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AnimatedMap from './AnimatedMap'
import { useTheme } from 'next-themes';
import Link from 'next/link'

function HeroSection() {

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Prevent hydration mismatch
        return null;
    }

    const isDark = theme === 'dark';
    const customTheme = isDark ? themeClasses.dark : themeClasses.light;
    return (
        <section className="px-6 pt-20 pb-24 text-center">
            <div className="max-w-4xl mx-auto">

                <h1 className={`text-5xl md:text-6xl font-extrabold leading-tight`}>
                    <span className={`bg-gradient-to-r ${isDark ? 'from-white via-cyan-200 to-purple-200' : 'from-gray-900 via-blue-700 to-purple-700'} bg-clip-text text-transparent`}>
                        Navigate Smarter
                    </span>{" "}
                    with <br />
                    <span className={`bg-gradient-to-r ${customTheme.accent} bg-clip-text text-transparent`}>
                        AI-Powered
                    </span>{" "}
                    Pathfinding
                </h1>
                <p className={`mt-6 text-lg ${customTheme.textSecondary} max-w-2xl mx-auto`}>
                    Experience the future of navigation. Find the fastest, most efficient path to any destination with AI that adapts to real-time conditions.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/login"
                        className={`group hover:no-underline px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r ${isDark ? 'from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500' : 'from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'} rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${isDark ? 'hover:shadow-purple-500/25' : 'hover:shadow-blue-500/25'} flex items-center justify-center gap-2`}
                    >
                        <Play className="w-5 h-5" />

                        <span className="whitespace-nowrap">Try Demo</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    <Link
                        href="#"
                        className={`group hover:no-underline px-6 py-3 sm:px-8 sm:py-4 ${isDark ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:text-white' : 'bg-white/80 hover:bg-white/90 border-gray-300 hover:text-gray-900'} backdrop-blur-md border rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="whitespace-nowrap">Learn More</span>
                    </Link>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-20">
                <AnimatedMap />
            </div>
        </section>



    )
}

export default HeroSection