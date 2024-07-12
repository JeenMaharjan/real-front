import axios from 'axios';

export const AddNotification = async(data) => {


    try {
        const response = await axios.post(`/api/notify`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}


export const GetAllNotifications = async() => {


    try {
        const response = await axios.get(`/api/get-all-notifications`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const ReadAllNotifications = async() => {


    try {
        const response = await axios.put(`/api/read-all-notifications`, {});
        return response.data;
    } catch (error) {
        return console.log(error)
    }

}

export const DeleteNotification = async(id, token) => {


    try {
        const response = await axios.delete(`/api/delete-notification/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}