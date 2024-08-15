export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/Axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
    };

    dispatch(loadperson(theultimatedetails));
    // console.log(theultimatedetails);
  } catch (error) {
    console.log("Error : ", error);
  }
};
