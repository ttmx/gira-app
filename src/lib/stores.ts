import { writable, type Writable } from 'svelte/store';
import { login, refreshToken, updateUserInfo } from './auth';
import { updateAccountInfo, updateStations, updateSubscriptions, updateActiveTripInfo, getTripHistory, getTrip, getUnratedTrips, updateLastUnratedTrip } from './gira-api';
import { Preferences } from '@capacitor/preferences';
import { startWS } from './gira-api/ws';
import { currentPos } from './location';
import { distanceBetweenCoords } from './utils';

export type User = {
	email: string;
	name: string;
}
export type Token = {
  accessToken: string;
	refreshToken: string;
	expiration: number;
};

export type StationInfo ={
	code: string;
	name: string;
	description: string|null;
	latitude: number;
	longitude: number;
	bikes: number;
	docks: number;
	serialNumber: string;
	assetStatus: string;
};
// const k = await Preferences.get({ key: 'email' });

// let destination:boolean, bike:string, time:string, distance:string, speed:string, distanceLeft:string, timeLeft:string, arrivalTime:string;
export type ActiveTrip = {
	code: string,
	bikeId: string,
	startPos: {lat: number, lng: number}|null,
	destination: {lat: number, lng: number}|null,
	travelledDistanceKm: number,
	distanceLeft: number|null,
	speed: number,
	startDate: Date,
	predictedEndDate: Date|null,
	arrivalTime: Date|null,
	finished: boolean,
	pathTaken : {lat: number, lng: number, time:Date}[]
}

export type AccountInfo = {
	bonus: number;
	balance: number;
	subscription: Subscription|null;
}
export type Subscription = {
	active: boolean;
	expirationDate: Date;
	name: string;
	subscriptionStatus: string;
	type:string
}
export type Insets = {
	top: number;
	bottom: number;
	left: number;
	right: number;
}
export type AppSettings = {
	distanceLock: boolean;
}
export type TripRating = {
	currentRating:{
		code:string,
		bikeId:string,
		startDate:Date,
		endDate:Date,
		tripPoints:number,
	}|null,
}

export const userCredentials: Writable<{email: string, password: string}|null> = writable(null);
export const token: Writable<Token|null|undefined> = writable(undefined);
export const user: Writable<User|null> = writable(null);
export const stations = writable<StationInfo[]>([]);
export const currentTrip = writable<ActiveTrip|null>(null);
export const accountInfo = writable<AccountInfo|null>(null);
export const selectedStation = writable<string|null>(null);
export const safeInsets = writable<Insets>({ top: 0, bottom: 0, left: 0, right: 0 });
export const appSettings = writable<AppSettings>({ distanceLock: true });
export const tripRating = writable<TripRating>({ currentRating: null });

export const errorMessages:Writable<Set<string>> = writable(new Set);
export function addErrorMessage(message:string) {
	errorMessages.update(messages => messages.add(message));
	setTimeout(() => removeErrorMessage(message), 3000);
	return message;
}
export function removeErrorMessage(message:string) {
	errorMessages.update(messages => {
		messages.delete(message);
		return messages;
	});
}

type JWT = {
	jti: string;
	sub: string;
	loginProvider: string;
	services: string[];
	nbf: number;
	exp: number;
	iat: number;
	iss: string;
	aud: string;
};
let tokenRefreshTimeout: ReturnType<typeof setTimeout>|null = null;
token.subscribe(async v => {
	if (!v) return;
	const jwt:JWT = JSON.parse(window.atob(v.accessToken.split('.')[1]));

	startWS();
	updateUserInfo();
	updateStations();
	updateAccountInfo();
	updateSubscriptions();
	updateActiveTripInfo();
	updateLastUnratedTrip();
	if (tokenRefreshTimeout) clearTimeout(tokenRefreshTimeout);
	tokenRefreshTimeout = setTimeout(refreshToken, jwt.exp * 1000 - Date.now() - 1000 * 30);
});

export async function loadUserCreds() {
	const email = (await Preferences.get({ key: 'email' })).value;
	const password = (await Preferences.get({ key: 'password' })).value;
	if (email && password) {
		userCredentials.set({ email, password });
	} else {
		// This is here to show the login dialog if there are no credentials set
		token.set(null);
	}
	const distanceLock = (await Preferences.get({ key: 'settings/distanceLock' })).value === 'true';
	appSettings.set({ distanceLock });

	userCredentials.subscribe(async v => {
		if (!v) {
			Preferences.remove({ key: 'email' });
			Preferences.remove({ key: 'password' });
			return;
		}
		const responseCode = await login(v.email, v.password);
		if (responseCode !== 0) {
			console.log('Login failed!');
			userCredentials.set(null);
		}
		Preferences.set({ key: 'email', value: v.email });
		Preferences.set({ key: 'password', value: v.password });
	});
	appSettings.subscribe(async v => {
		Preferences.set({ key: 'settings/distanceLock', value: v.distanceLock.toString() });
	});
}
currentPos.subscribe(async v => {
	if (!v) return;
	currentTrip.update(trip => {
		if (!trip) return trip;
		trip.pathTaken.push({ lat: v.coords.latitude, lng: v.coords.longitude, time: new Date(v.timestamp) });

		if (trip.pathTaken.length > 1) {
			const lastLocation = trip.pathTaken[trip.pathTaken.length - 2];
			const travelledDistance = distanceBetweenCoords(lastLocation.lat, lastLocation.lng, v.coords.latitude, v.coords.longitude);
			trip.travelledDistanceKm += travelledDistance;
			const speed = travelledDistance / ((v.timestamp - lastLocation.time.getTime()) / 1000);
			trip.speed = speed;
		}
		return trip;
	});
});

export async function logOut() {
	token.set(null);
	userCredentials.set(null);
	accountInfo.set(null);
	currentTrip.set(null);
	user.set(null);
	selectedStation.set(null);
	// purposefully not settings settings distancelock, since thats annoying when you swap accounts
}