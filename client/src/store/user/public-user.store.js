import { create } from "zustand";
import PublicUserService from "../../service/user/public-user.service.js";
import { persist } from "zustand/middleware";

const usePublicUserStore = create(persist((set, get) => ({
    entity: undefined,
    draft: undefined,
    getEntity: () => {
      return get().entity
    },
    getDraft: () => {
      return get().draft
    },
    fetchPublicUser: async (userid) => {
      const publicUser = await PublicUserService.getPubicUser(userid)
      set((state) => ({ ...state, entity: publicUser, draft: publicUser }))
      return true
    },
    updatePublicUser: async (publicUser) => {
      const updatedPublicUser = await PublicUserService.updatePublicUser(publicUser)
      set((state) => ({ ...state, entity: updatedPublicUser, draft: updatedPublicUser }))
      return true
    },
    updateDraftPublicUser: async (publicUser) => {
      set((state) => ({ ...state, draft: publicUser }))
    },
    saveDraft: async () => {
      let status = undefined
      const draft = get().draft
      if (draft) {
        PublicUserService.updatePublicUser(draft)
          .then(async () => {
            const publicUser = await PublicUserService.getPubicUser(draft.userid)
            set((state) => ({ ...state, entity: publicUser, draft: publicUser }))
            status = true
          })
      }
      return status
    },
    resetDraft: async () => {
      const entity = get().entity
      if (entity) {
        set((state) => ({ ...state, draft: entity }))
      }
    }
  }),
  {
    name: 'public-user-store'
  }
))

export default usePublicUserStore