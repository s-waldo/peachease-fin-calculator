import { create } from "zustand"
import { progressStateStore, type ProgressSliceT } from "./progressState"
import { formStateStore, type FormStateStoreT } from "./formState"

export const useGlobalStore = create<ProgressSliceT & FormStateStoreT>()(
  (...a) => ({
    ...progressStateStore(...a),
    ...formStateStore(...a),
  }),
)
