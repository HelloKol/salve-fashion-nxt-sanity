import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player/lazy"
import { ImageTag, Section } from "@/components"
import { Media } from "@/types"

interface VideoPlayerProps {
  data: {
    videoUrl: string
    previewImage: Media
  }
}

const ResponsivePlayer = ({ url }: { url: string }) => {
  return (
    <div className="h-screen">
      <ReactPlayer url={url} playing width="100%" height="100%" />
    </div>
  )
}

const VideoPlayer = ({ data }: VideoPlayerProps) => {
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleVideoClick = () => {
    setShowThumbnail(false)
  }

  if (!isMounted) return null

  if (!data) return null
  const { videoUrl, previewImage } = data

  return (
    <Section>
      {showThumbnail ? (
        <div className="relative" onClick={handleVideoClick}>
          <div className="aspect-w-16 aspect-h-9 h-screen w-screen cursor-pointer">
            <ImageTag
              src={previewImage.asset.url}
              blurDataURL={previewImage.asset.metadata.lqip}
              placeholder="blur"
            />
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
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
        </div>
      ) : (
        <ResponsivePlayer url={videoUrl} />
      )}
    </Section>
  )
}

export default VideoPlayer
