/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://sw-api.starnavi.io',
    header: {
        'ContentType': 'program/json',
    },
});

export const fetchHeroes = async (id) => {
    try {
        const response = await axiosInstance(`/people/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
    } 
};
 export const fetchFilmsInfo = async (film) => {
    try {
        const response = await axiosInstance(`films/${film}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching films:', error);
    }
 };
export const fetchShipsInfo = async (ship) => {
    try {
        const response = await axiosInstance(`starships/${ship}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching films:', error);
    }
};

