import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Info, Navigation } from 'lucide-react';

const mockRecyclePoints = [
  {
    id: 1,
    name: "Brașov Recycling Center",
    position: { lat: 45.6427, lng: 25.5887 },
    address: "109 Zizinului Street, Brașov 500407",
    materials: ["Plastic", "Metal", "Glass", "Paper"],
    hours: "Monday-Friday: 8:00-16:00"
  },
  {
    id: 2,
    name: "EcoCollect Bartolomeu",
    position: { lat: 45.6559, lng: 25.5755 },
    address: "92 Lânii Street, Brașov",
    materials: ["Electronics", "Batteries", "Plastic", "Metal"],
    hours: "Monday-Saturday: 9:00-17:00"
  },
  {
    id: 3,
    name: "Astra Recycling Point",
    position: { lat: 45.6498, lng: 25.6106 },
    address: "104 București Avenue, Brașov",
    materials: ["Plastic", "Glass", "Paper"],
    hours: "24/7"
  },
  {
    id: 4,
    name: "Green Recycling Tractorul",
    position: { lat: 45.6728, lng: 25.6089 },
    address: "94 13 Decembrie Street, Brașov",
    materials: ["Plastic", "Metal", "Electronics"],
    hours: "Monday-Friday: 10:00-18:00"
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '70vh'
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  streetViewControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility: "simplified" }],
    },
  ],
};


const BRASOV_CENTER = { lat: 45.6427, lng: 25.5887 };

export function RecyclePoints() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isLocating, setIsLocating] = useState(false);
  const [recyclePoints, setRecyclePoints] = useState(mockRecyclePoints);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const getUserLocation = useCallback(() => {
    setIsLocating(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setIsLocating(false);
      }
    );
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="text-xl font-semibold">Error loading maps</p>
          <p className="text-sm mt-2">Please check your internet connection and try again</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="text-center text-secondary-600 dark:text-secondary-400">
          <p className="text-xl font-semibold">Loading maps</p>
          <p className="text-sm mt-2">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-2">
          Recycling Points in Brașov
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Find recycling points near you and discover what materials they accept
        </p>
      </div>

      {locationError && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          <p className="flex items-center">
            <Info className="w-5 h-5 mr-2" />
            {locationError}
          </p>
        </div>
      )}

      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={userLocation || BRASOV_CENTER}
          options={options}
        >
          {recyclePoints.map((point) => (
            <Marker
              key={point.id}
              position={point.position}
              onClick={() => setSelectedPoint(point)}
              icon={{
                url: 'https://cdn-icons-png.flaticon.com/512/7954/7954340.png',
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32),
              }}
            />
          ))}
          
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#007bff",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
              }}
            />
          )}

          {selectedPoint && (
            <InfoWindow
              position={selectedPoint.position}
              onCloseClick={() => setSelectedPoint(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-lg mb-2">{selectedPoint.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedPoint.address}</p>
                <div className="mb-2">
                  <p className="text-sm font-medium">Accepted Materials:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPoint.materials.map((material: string) => (
                      <span
                        key={material}
                        className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Hours: </span>
                  {selectedPoint.hours}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        <button
          onClick={getUserLocation}
          disabled={isLocating}
          className="absolute bottom-4 left-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 border border-gray-200 dark:border-gray-600"
          title="Find my location"
        >
          <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`} />
        </button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockRecyclePoints.map((point) => (
          <div
            key={point.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-secondary-200 dark:border-secondary-700"
          >
          <div className="flex items-start">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/7954/7954340.png"
              alt="Location Icon"
              className="w-5 h-5 mt-1"
            />
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">
                {point.name}
              </h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                  {point.address}
                </p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Accepted Materials:
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {point.materials.map((material: string) => (
                      <span
                        key={material}
                        className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-3">
                  <span className="font-medium">Hours: </span>
                  {point.hours}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}