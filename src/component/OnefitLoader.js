import React from 'react'

export default function OnefitLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-6xl font-bold tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
        <span className="inline-block px-1 animate-pulse" style={{ color: '#4CAF50' }}>O</span>
        <span className="inline-block px-1 animate-pulse" style={{ color: '#E91E63', animationDelay: '0.1s' }}>N</span>
        <span className="inline-block px-1 animate-pulse" style={{ color: '#2196F3', animationDelay: '0.2s' }}>E</span>
        <span className="inline-block px-1 animate-pulse" style={{ color: '#9C27B0', animationDelay: '0.3s' }}>F</span>
        <span className="inline-block px-1 animate-pulse" style={{ color: '#00BCD4', animationDelay: '0.4s' }}>I</span>
        <span className="inline-block px-1 animate-pulse" style={{ color: '#FF4081', animationDelay: '0.5s' }}>T</span>
      </div>
      <div className="mt-2 text-xl font-bold tracking-wide text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
        SPORTS
      </div>
    </div>
  )
}