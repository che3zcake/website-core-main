import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import fs from "fs"
import path from "path"

async function getGalleryImages() {
  const assetsDir = path.join(process.cwd(), "public/assets/testimonials")

  try {
    const files = fs.readdirSync(assetsDir)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]

    return files
      .filter((file) =>
        imageExtensions.includes(path.extname(file).toLowerCase())
      )
      .sort()
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Gallery
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            GitNexus in action
          </h1>
          <p className="text-lg text-muted-foreground">
            Screenshots from real codebases and developer workflows.
          </p>
        </div>

        {images.length > 0 ? (
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {images.map((image, index) => (
              <Card
                key={image}
                className="overflow-hidden bg-card/50 backdrop-blur break-inside-avoid"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={`/assets/testimonials/${image}`}
                      alt={`GitNexus gallery image ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted mx-auto">
                <svg
                  className="size-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No images yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Add images to the{" "}
                <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">
                  public/assets/testimonials
                </code>{" "}
                folder to display them here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
