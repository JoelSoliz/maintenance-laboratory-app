import {create} from 'zustand';

export const usePoliciesStore = create(set => ({
  policy1: {},
  policy2: {},
  date: null,
  userID: '',
  setPolicy1: policy1 => set(state => ({...state, policy1})),
  setPolicy2: policy2 => set(state => ({...state, policy2})),
  setUserID: userID => set(state => ({...state, userID})),
  setDate: date => set(state => ({...state, date})),
}));
