import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {

    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    },

    set_messages: function(state, messages) {
      state.messages = messages;
    },

    add_message: function(state, message) {
      state.messages.push(message);
    },

    remove_message: function(state, id) {
      for (let index = 0; index < state.messages.length; index++) {
        if (state.messages[index].id === id) {
          state.messages.splice(index, 1);
          break;
        }
      }
    },

    update_message: function(state, payload) {
      for (let index = 0; index < state.messages.length; index++) {
        if (state.messages[index].id === payload.id) {
          state.messages[index].user = payload.msg.user;
          state.messages[index].message = payload.msg.message;
          break;
        }
      }
    }
  },
  actions: {

    login: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);

      Axios.defaults.headers.common['Authorization'] = `${token}`;
    },

    logout: ({ commit }) => {
      commit('RESET', '');
    },

    load_messages: function({ commit }) {
      fetch('http://localhost/api/poruke', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;
        
        return response.json()
      }).then((jsonData) => {
        commit('set_messages', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function') 
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
          else
            alert(error);
      });
    },

    delete_message: function({ commit }, id) {
      fetch(`http://localhost/api/poruka/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;
        
        return response.json()
      }).then((jsonData) => {
        commit('remove_message', jsonData.id);
      }).catch((error) => {
        if (typeof error.text === 'function') 
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
          else
            alert(error);
      });
    },

    new_message: function({ commit }, message) {
      fetch('http://localhost/api/poruke/', {
        method: 'post',
        headers: {
          'Content-Type': 'application-json'
        },
        body: message
      }).then((response) => {
        if (!response.ok)
          throw response;
        
        return response.json()
      }).then((jsonData) => {
        commit('add_message', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function') 
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
          else
            alert(error);
      });
    },

    change_message: function({ commit }, payload) {
      fetch(`http://localhost/api/poruka/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application-json'
        },
        body: payload.msg
      }).then((response) => {
        if (!response.ok)
          throw response;
        
        return response.json()
      }).then((jsonData) => {
        commit('update_message', {id: payload.id, msg: jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function') 
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
          else
            alert(error);
      });
    },

  },
  modules: {
  }
})
