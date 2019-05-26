import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";


export const profile = (token) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: CONST.url + 'user_data',
            headers: {Authorization: "Bearer " + token}
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data})
        })
    }
}


export const updateProfile = (data) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'update_profile',
            method: 'POST',
            headers: {Authorization: data.token },
            data: {
            name: data.name,
            phone: data.phone,
            country_id: data.country_id,
            image: data.image,
            email: data.email,
            desc: data.desc,
            type: data.type,
            lang: data.lang,
        }}).then(response => {
            if (response.data.status == 200) {
                const data = response.data.data;
                dispatch({type: 'update_profile', data})
            }
            Toast.show({
                text: response.data.msg,
                type: response.data.status == 200 ? "success" : "danger",
                duration: 3000
            });
        }).catch(() => {
            Toast.show({
                text: 'لم يتم التعديل بعد , الرجاء المحاوله مره اخري',
                type: "danger",
                duration: 3000
            });
        })
    }
}


export const joinAsProvider = (data) => {
    return (dispatch) => {
        axios.post(CONST.url + 'register/provider', {
            user_id: data.id,
            name: data.name,
            identity_num: data.identity_num,
            phone: data.phone,
            mob_maintenance: data.mob_maintenance,
            mob_seller: data.mob_seller,
            accessories_seller: data.accessories_seller,
            sim_card: data.sim_card,
            image: data.userBase64,
            id_image: data.IDBase64,
            maintenance_image: data.mainBase64,
            commercial_image: data.tradBase64
        }).then(response => {
            if (response.data.key === '1') {
                const data = response.data.data;
                dispatch({type: 'join_as_provider', data})
            }
            Toast.show({
                text: response.data.massage,
                type: response.data.key === "1" ? "success" : "danger",
                duration: 3000
            });
        }).catch(() => {
            Toast.show({
                text: 'لم يتم الحفظ بعد , الرجاء المحاوله مره اخري',
                type: "danger",
                duration: 3000
            });
        })
    }
}

