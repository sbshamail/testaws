import React from 'react'
import { Circle } from '@react-google-maps/api'
const MapCircle = ({distance,mapcircleradius, data}) => {
    return (
        <Circle
            center={{ lat: parseFloat(data.json.center.lat), lng: parseFloat(data.json.center.lng) }}
            radius={mapcircleradius * distance}
            options={{
                fillColor: '#6b7280',
                strokeColor: 'white',
                strokeOpacity: 0.1,
                strokeWeight: 2,
            }}
        />
    );
}

export default MapCircle