import { create } from "zustand";
import PublicUserService from "../../service/user/public-user.service.js";
import { toast } from "react-toastify";
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
    },
    updatePublicUser: async (publicUser) => {
      const updatedPublicUser = await PublicUserService.updatePublicUser(publicUser)
      set((state) => ({ ...state, entity: updatedPublicUser, draft: updatedPublicUser }))
    },
    updateDraftPublicUser: async (publicUser) => {
      set((state) => ({ ...state, draft: publicUser }))
    },
    saveDraft: async () => {
      const draft = get().draft
      if (draft) {
        PublicUserService.updatePublicUser(draft)
          .then(async () => {
            toast.success("Account update successfully")
            const publicUser = await PublicUserService.getPubicUser(draft.userid)
            set((state) => ({ ...state, entity: publicUser, draft: publicUser }))
          })
      }
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