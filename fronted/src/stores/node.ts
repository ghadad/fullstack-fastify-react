import { create } from "zustand";

interface NodeState {
  modifiedNode: any;
  setNode: (data: any) => void;
}
const nodeStore = create<NodeState>((set) => ({
  modifiedNode: {},
  setNode: (data) => set(data),
}));

export default nodeStore;
