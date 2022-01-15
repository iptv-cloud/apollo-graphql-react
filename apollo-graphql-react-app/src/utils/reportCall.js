import { apiEndpoint } from '../config.json'
import axios from 'axios'

const VIEW_API_ENDPOINT = `${apiEndpoint}/v1/view`

export const addNewView = (viewData, token) => {
  const { siteId, siteName, channelId, channelName, terminalCode, provider } = viewData
  console.log(viewData)
  axios
    .post(
      `${VIEW_API_ENDPOINT}/create`,
      {
        'site_id': siteId,
        'site_name': siteName,
        'channel_id': channelId,
        'channel_name': channelName,
        'terminal_code': terminalCode,
        'company_id': provider
      },
      {
        headers: { 'Authorization': 'Bearer ' + token }
      }
    )
    .then((response) => {
      const status = response.data.status
      console.log(status)
    }).catch(error => {
      console.log(error)
    })
}


