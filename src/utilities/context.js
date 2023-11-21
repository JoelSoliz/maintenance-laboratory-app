import {create} from 'zustand';

export const usePoliciesStore = create(set => ({
  policy1: {},
  policy2: {},
  setPolicy1: policy1 => set(state => ({...state, policy1})),
  setPolicy2: policy2 => set(state => ({...state, policy2})),
}));
