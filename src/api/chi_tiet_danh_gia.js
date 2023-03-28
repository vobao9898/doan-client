import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));
var URL = "https://apidoan.herokuapp.com";

const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

export const Them = (data) => {
    return authAxios.post(`/api/chi_tiet_danh_gia`, data);
};

export const getDanhGia = (id) => {
    return authAxios.get(`/api/chi_tiet_danh_gia/getChiTietDanhGia/${id}`);
};

