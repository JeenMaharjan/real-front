import axios from 'axios';

export const createBooking = async (value) => {
    try {
        const response = await axios.post('/api/booking', value);

       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};

export const getAllBooking = async () => {
    try {
        const response = await axios.get('/api/get-all-booking');

       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};

export const getAllBookingRecords = async () => {
    try {
        const response = await axios.get('/api/get-all-booking-records');

       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};
