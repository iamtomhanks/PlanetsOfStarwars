export const Types = {
  GET_PLANETS_REQUEST: 'planets/get_planets_request',
  GET_PLANETS_SUCCESS: 'planets/get_planets_success',
}

export const getPlanetsRequest = () => ({
  type: Types.GET_PLANETS_REQUEST
})

export const getPlanetsSuccess= ({planets}) => ({
  type: Types.GET_PLANETS_SUCCESS,
  payload: {
    planets
  }
})
