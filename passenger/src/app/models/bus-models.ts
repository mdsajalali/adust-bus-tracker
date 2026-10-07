export interface IBusItem {
    id: string;
    name: string;
    route: string;
    distance: string;
    distanceVal: number;
    status: 'Live' | 'Last seen' | 'Offline';
    statusText: string;
    seats: number;
    driverName: string;
    driverId: string;
    nextStop: string;
    busNumber: string;
    currentLocationDesc: string;
    lat: number;
    lng: number;
    routeStops: { name: string; status: 'Passed' | 'Next - your stop' | 'Upcoming' | 'Final stop' }[];
}
