import request from '@/utils/request'
import { PROMISE_SUCCESS } from '../constants'
import { getParam } from '@/utils/tools'

/**
* actions、mutations中用的常量
*/
// const ADD_ASSETS = 'GET_ASSETS'
// const DELETE_ASSETS = 'DELETE_ASSETS'
// const MODIFY_ASSETS = 'MODIFY_ASSETS'
const GET_ASSETS = 'GET_ASSETS'
const DELETE_ASSETS = 'DELETE_ASSETS'
const ADD_PIC = 'ADD_PIC'
const ADD_MUSIC = 'ADD_MUSIC'
const CHOOSE_MUSIC = 'CHOOSE_MUSIC'
const PLAY_MUSIC = 'PLAY_MUSIC'
const GET_SYS_ASSET_TYPES = 'GET_SYS_ASSET_TYPES'
const GET_SYS_ASSETS = 'GET_SYS_ASSETS'

let deleteIdx = -1,
  assetType = '';

/**
* vuex的state
*/
const state = {
  pic_list: ['66666666'],
  choosedMusic: null,
  musicList: [],
  sysPicLabels: [],
  sysPics: [],
  sysMusicLabels: [],
  sysMusics: [],
  loading: false
}

/**
* vuex的getters
*/
const getters = {
  pic_list: state => state.pic_list,
  sysPicLabels: state => state.sysPicLabels,
  sysPics: state => state.sysPics,
  sysMusicLabels: state => state.sysMusicLabels,
  sysMusics: state => state.sysMusics,
  musicList: state => state.musicList,
  choosedMusic: state => state.choosedMusic,
  loading: state => state.loading
}

/**
* vuex中的actions
*/
const actions = {
  // add ({ commit }, payload) {
  
  // },
  // del ({ commit }, payload) {
  
  // },
  // edit ({ commit }, payload) {
  
  // },
  getAssets ({ commit, state }, payload) {
    assetType = payload.itype

    setTimeout(function() {
      commit(GET_ASSETS, request('/index.php?g=Api&m=Asset&a=getAssets', {
        params: {
          tplid,
          ...payload
        }
      }))
    }, 350);
  },
  getSysAssetTypes({ commit }, payload) {
    assetType = payload

    commit(GET_SYS_ASSET_TYPES, request('/index.php?g=Api&m=Asset&a=getSysAssetTypes', {
      params: {
        itype: payload
      }
    }))
  },
  getSysAssets({ commit }, payload) {
    assetType = payload.itype

    commit(GET_SYS_ASSETS, request('/index.php?g=Api&m=Asset&a=getSysAssets', {
      params: payload
    }))
  },
  addPic({ commit }, payload) {
    commit(ADD_PIC, payload)
  },
  addMusic({ commit }, payload) {
    commit(ADD_MUSIC, payload)
  },
  deleteAssets({ commit }, payload) {
    const { delIdx, itype, pType, ...params } = payload

    assetType = itype

    deleteIdx = delIdx

    commit(DELETE_ASSETS, request('/index.php?g=Api&m=Asset&a=deleteAssets', {
      params: {
        tplid: window.tplid,
        ...params
      }
    }))
  },
  chooseMusic({ commit }, payload) {
    commit(CHOOSE_MUSIC, payload)
  },
  playMusic({ commit, state }, payload) {
    commit(PLAY_MUSIC, payload)
  }
}

/**
* vuex中的mutations
*/
const mutations = {
  // [ADD_ASSETS] (state, { payload, meta }) {

  // },
  // [DELETE_ASSETS] (state, { payload, meta }) {

  // },
  // [MODIFY_ASSETS] (state, { payload, meta }) {

  // },
  [GET_ASSETS](state, { payload = [], meta }) {
    state.loading = !(meta === PROMISE_SUCCESS)
    if (meta === PROMISE_SUCCESS) {
      if (payload.data.list.length) {
        if (assetType == 2) {
          state.pic_list = payload.data.list.reverse()
        } else {
          state.musicList = payload.data.list.reverse()
        }
      }
    }
  },
  [GET_SYS_ASSET_TYPES](state, { payload = {}, meta }) {
    state.loading = !(meta === PROMISE_SUCCESS)
    if (meta === PROMISE_SUCCESS) {
      if (assetType == 2) {
        state.sysPicLabels = payload.data.list
      } else {
        state.sysMusicLabels = payload.data.list
      }
    }
  },
  [GET_SYS_ASSETS](state, { payload = {}, meta }) {
    state.loading = !(meta === PROMISE_SUCCESS)
    if (meta === PROMISE_SUCCESS) {
      let data = payload.data.list

      if (assetType == 2) {
        state.sysPics = data
      } else {
        state.sysMusics = data
      }
    }
  },
  [DELETE_ASSETS](state, { payload = {}, meta }) {
    if (meta == PROMISE_SUCCESS) {
      if (payload.status == 1) {
        if (assetType == 2) {
          state.pic_list.splice(deleteIdx, 1)
        } else {
          state.musicList.splice(deleteIdx, 1)
        }
      }
    }
  },
  [ADD_PIC](state, data) {
    state.pic_list.unshift(data)
  },
  [ADD_MUSIC](state, data) {
    state.musicList.unshift(data)
  },
  [CHOOSE_MUSIC](state, data) {
    state.choosedMusic = data
  },
  [PLAY_MUSIC](state, payload) {
    const { type, anotherPlayStatus, playIdx } = payload

    const makeData = (data, clear) => {
      return data.map((item, idx) => {
        if (clear || idx != playIdx) {
          item.playing = false
        } else {
          item.playing = !item.playing
        }
        return item
      })
    }

    if (type == 'personal') {
      state.musicList = makeData(state.musicList)

      //清除另一个tab中在播放中的音乐的状态
      if (anotherPlayStatus) {
        state.sysMusics = makeData(state.sysMusics, true)
      }
    } else {
      state.sysMusics = makeData(state.sysMusics)

      //清除另一个tab中在播放中的音乐的状态
      if (anotherPlayStatus) {
        state.musicList = makeData(state.musicList, true)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
