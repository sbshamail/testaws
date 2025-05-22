import React, { useContext, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { google_map_api } from "../../../../../../config";
import useMouseMapTooltip from "@/utils/hooks/useMouseMapTooltip";
import MapCircle from "./MapCircle";
import mapnightmodestyles from "./mapnightmodestyles";
import PointerInfoModal from "./PointerInfoModal";
import { GlobalContext } from "@/app/Provider";

const ShowGoogleMap = ({ markerlist, data, maptype, mapcircleradius }) => {
  const { auth, Token } = useContext(GlobalContext);
  //modal
  const [pointerInfoModal, setPointerInfoModal] = useState(false);
  const [pointerInfo, setPointerInfo] = useState(null);

  //tooltip hook
  const { mapContainerRef, handleOnMouseHover, handleOnMouseOut, ShowTooltip } =
    useMouseMapTooltip();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: google_map_api,
  });

  return (
    <>
      <div className="mt-6 relative" ref={mapContainerRef}>
        <>
          {data && maptype == 0 && (
            <GoogleMap
              mapContainerClassName="w-full h-96"
              center={{
                lat: parseFloat(data.json.center.lat) || 0,
                lng: parseFloat(data.json.center.lng) || 0,
              }}
              zoom={12}
            >
              {markerlist.map((marker, i) => (
                <Marker
                  key={i}
                  position={{
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng),
                  }}
                  onClick={() => {
                    setPointerInfoModal(true);
                    setPointerInfo(marker);
                  }}
                  icon={marker.icon}
                  onMouseOver={() => handleOnMouseHover(marker.title)}
                  onMouseOut={handleOnMouseOut}
                />
              ))}
            </GoogleMap>
          )}

          {data && maptype == 1 && (
            <GoogleMap
              mapContainerClassName="w-full h-96"
              options={{
                styles: mapnightmodestyles,
              }}
              center={{
                lat: parseFloat(data.json.center.lat),
                lng: parseFloat(data.json.center.lng),
              }}
              zoom={10}
            >
              {markerlist.map((marker, i) => (
                <Marker
                  key={marker.id + i}
                  position={{
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng),
                  }}
                  icon={marker.icon}
                  onClick={() => {
                    setPointerInfoModal(!pointerInfoModal);
                    setPointerInfo(marker);
                  }}
                  onMouseOver={() => handleOnMouseHover(marker.title)}
                  onMouseOut={handleOnMouseOut}
                />
              ))}

              {maptype == 1 && (
                <>
                  {[1500, 3000, 4500].map((distance, index) => (
                    <MapCircle
                      key={`circle-${index}`}
                      distance={distance}
                      mapcircleradius={mapcircleradius}
                      data={data}
                    />
                  ))}
                </>
              )}
            </GoogleMap>
          )}
          <ShowTooltip />
        </>
      </div>
      {pointerInfoModal && (
        <PointerInfoModal
          close={() => setPointerInfoModal(close)}
          open={pointerInfoModal}
          pointerInfo={pointerInfo}
          data={data}
          auth={auth}
          Token={Token}
        />
      )}
    </>
  );
};

export default ShowGoogleMap;
