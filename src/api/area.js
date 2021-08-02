import axios from "axios";
import {baseEndPointUrl} from "../utils/constants"

export const getAllHeadOffices = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/headOffices`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getZones = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/zones`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getRegions = zoneId => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/regions?zoneId=${zoneId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getCities = regionId => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/cities?regionId=${regionId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getStores = cityId => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/stores?cityId=${cityId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getUserReports = (userId = -1) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/userReports/${userId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getRegionReports = (regionId = -1) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/regionReports/${regionId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getAllRegion = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/getAllRegions`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/getAllUsers`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
