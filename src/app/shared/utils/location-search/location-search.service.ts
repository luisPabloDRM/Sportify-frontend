import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinates, NominatimResultDTO } from './location-search.models';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';

/** Radio aproximado (en grados) usado para priorizar resultados cercanos a unas coordenadas */
const NEARBY_VIEWBOX_DELTA = 0.5;

@Injectable({
  providedIn: 'root',
})
export class LocationSearchService {
  constructor(private readonly httpClient: HttpClient) {}

  search = (query: string, near?: Coordinates): Observable<NominatimResultDTO[]> => {
    const params: Record<string, string> = {
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '5',
    };

    if (near) {
      params['viewbox'] = [
        near.lon - NEARBY_VIEWBOX_DELTA,
        near.lat + NEARBY_VIEWBOX_DELTA,
        near.lon + NEARBY_VIEWBOX_DELTA,
        near.lat - NEARBY_VIEWBOX_DELTA,
      ].join(',');
      params['bounded'] = '0';
    }

    return this.httpClient.get<NominatimResultDTO[]>(`${NOMINATIM_URL}/search`, { params });
  };

  reverseGeocode = (coordinates: Coordinates): Observable<NominatimResultDTO> => {
    const params: Record<string, string> = {
      lat: `${coordinates.lat}`,
      lon: `${coordinates.lon}`,
      format: 'json',
    };
    return this.httpClient.get<NominatimResultDTO>(`${NOMINATIM_URL}/reverse`, { params });
  };

  getCurrentPosition = (): Observable<Coordinates> => {
    return new Observable((subscriber) => {
      if (!navigator.geolocation) {
        subscriber.error(new Error('La geolocalización no está disponible en este navegador'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          subscriber.next({ lat: position.coords.latitude, lon: position.coords.longitude });
          subscriber.complete();
        },
        (error) => subscriber.error(error),
        { enableHighAccuracy: false, timeout: 10000 },
      );
    });
  };
}
