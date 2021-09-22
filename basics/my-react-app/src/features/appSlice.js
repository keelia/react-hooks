import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { useSelector } from 'react-redux';

export const appSlice = createSlice({
  name: 'tab',
  initialState: {
    activeTab: 'active',
    tabData:[]
  },
  reducers: {
    updateTab: (state,{payload}) => {
      state.activeTab = payload.activeTab
      state.tabData = payload.tabData
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateTab } = appSlice.actions

export default appSlice.reducer

export const fetchDataByTab = activeTab => async dispatch =>{
  const response = await axios.get(`http://localhost:3000/${activeTab}`)
  dispatch(updateTab({activeTab,tabData:response.data}));
}
export const useTabData= ()=>{
  const data = useSelector(state=>state.tab?.tabData)
  return data
}