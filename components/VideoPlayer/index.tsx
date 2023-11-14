import React, { useRef, useState } from "react"
import { Section } from "@/components"

interface VideoPlayerProps {
  videoSrc: string
}

const VideoPlayer = ({ videoSrc }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const thumbnailSrc = `/static/mock_prodct_images/vid.avif`

  const handleVideoClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play()
      setShowThumbnail(false)
    } else {
      videoRef.current?.pause()
    }
  }

  return (
    <Section className="relative">
      {showThumbnail && (
        <div
          className="aspect-w-16 aspect-h-9 w-full cursor-pointer"
          onClick={handleVideoClick}
        >
          <img src={thumbnailSrc} />
        </div>
      )}

      <video
        ref={videoRef}
        src={videoSrc}
        preload="metadata"
        className={`w-full cursor-pointer ${
          showThumbnail ? "hidden" : ""
        } aspect-w-16 aspect-h-9`}
        onClick={handleVideoClick}
      />

      {showThumbnail && (
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform"
          onClick={handleVideoClick}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="#fff"
            className="cursor-pointer"
          >
            <path d="M37.5 25V75L75 50L37.5 25Z" />
          </svg>
        </div>
      )}
    </Section>
  )
}

export default VideoPlayer
