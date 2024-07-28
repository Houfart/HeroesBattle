import { baseURL } from "../../../core/services/baseUrl";


/**
 * Retrieves the list of heroes from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of heroes.
 */
export function getHeroes() {
  return new Promise((resolve, reject) => {
    baseURL
      .get('metahumans')
      .then((response) => {
        console.log(response)
        resolve(response.data);
      }).catch((erro) => {
        console.log(erro);
        reject(erro)
      })
  })
}