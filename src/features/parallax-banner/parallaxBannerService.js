import api from '@/lib/axios'

const BASE_PATH = '/parallax-banners'

export const getAllParallaxBanners = async () => {
  try {
    return await api.get(`${BASE_PATH}/get-all`)
  } catch (error) {
    console.error('Error fetching settings:', error)
    throw error
  }
}

export const updateParallaxBanner = async (id, data) => {
  try {
    return await api.put(
      `${BASE_PATH}/update/${id}`,
      data, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  } catch (error) {
    console.error('Error updating parallax banner:', error)
    throw error
  }
}