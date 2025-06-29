"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { google } from "google-maps"

interface GoogleMapProps {
  address?: string
  propertyName?: string
  className?: string
  center?: MapLocation
  zoom?: number
  markers?: Array<{
    position: MapLocation
    title: string
    address: string
  }>
}

interface MapLocation {
  lat: number
  lng: number
}

// Mock geocoding function - in production, you'd use Google Geocoding API
const geocodeAddress = async (address: string): Promise<MapLocation> => {
  // Mock coordinates for different cities
  const mockLocations: Record<string, MapLocation> = {
    "New York": { lat: 40.7128, lng: -74.006 },
    Miami: { lat: 25.7617, lng: -80.1918 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    Boston: { lat: 42.3601, lng: -71.0589 },
    Chicago: { lat: 41.8781, lng: -87.6298 },
    Anytown: { lat: 40.7589, lng: -73.9851 }, // Default for mock address
  }

  // Extract city from address
  const city = Object.keys(mockLocations).find((city) => address.includes(city)) || "Anytown"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return mockLocations[city]
}

export function GoogleMap({ address, propertyName, className, center, zoom = 15, markers }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<MapLocation | null>(null)

  useEffect(() => {
    const initializeMap = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get coordinates - use provided center or geocode address
        let coords: MapLocation
        if (center) {
          coords = center
        } else if (address) {
          coords = await geocodeAddress(address)
        } else {
          throw new Error("Either center coordinates or address must be provided")
        }
        setLocation(coords)

        // Initialize Google Maps
        if (mapRef.current && window.google) {
          const mapInstance = new window.google.maps.Map(mapRef.current, {
            center: coords,
            zoom: zoom,
            styles: [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ color: "#f5f5f5" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }, { lightness: 17 }],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
              },
            ],
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
          })

          // Add markers
          const markersToCreate = markers || (propertyName && address ? [{ position: coords, title: propertyName, address }] : [])
          
          markersToCreate.forEach((markerData) => {
            const marker = new window.google.maps.Marker({
              position: markerData.position,
              map: mapInstance,
              title: markerData.title,
              icon: {
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="12" fill="#0ea5e9" stroke="white" strokeWidth="3"/>
                    <path d="M16 8L20 14H12L16 8Z" fill="white"/>
                    <circle cx="16" cy="18" r="2" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(32, 32),
              },
            })

            // Add info window
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; font-family: system-ui, sans-serif;">
                  <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${markerData.title}</h3>
                  <p style="margin: 0; font-size: 12px; color: #666;">${markerData.address}</p>
                </div>
              `,
            })

            marker.addListener("click", () => {
              infoWindow.open(mapInstance, marker)
            })
          })

          setMap(mapInstance)
        }
      } catch (err) {
        setError("Failed to load map")
        console.error("Map initialization error:", err)
      } finally {
        setLoading(false)
      }
    }

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "demo"}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      script.onerror = () => setError("Failed to load Google Maps")
      document.head.appendChild(script)
    } else {
      initializeMap()
    }
  }, [address, propertyName])

  const openInGoogleMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
      window.open(url, "_blank")
    }
  }

  const openDirections = () => {
    if (location) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
      window.open(url, "_blank")
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading interactive map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
              <div>
                <p className="text-muted-foreground mb-2">{error}</p>
                <p className="text-sm text-muted-foreground">{address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="relative">
          <div ref={mapRef} className="aspect-video w-full rounded-lg" />

          {/* Map Controls Overlay */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-background/90 backdrop-blur-sm shadow-lg"
              onClick={openInGoogleMaps}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Maps
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-background/90 backdrop-blur-sm shadow-lg"
              onClick={openDirections}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Directions
            </Button>
          </div>

          {/* Property Info Overlay */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
            <h4 className="font-semibold text-sm mb-1">{propertyName}</h4>
            <p className="text-xs text-muted-foreground">{address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
