import { create } from "zustand";
import CondoManagementCompanyService from "../../service/user/condo-management-company.service.js";
import { persist } from "zustand/middleware";

const useCondoManagementCompany = create(persist((set, get) => ({
    entity: undefined,
    draft: undefined,
    getEntity: () => {
      return get().entity
    },
    getDraft: () => {
      return get().draft
    },
    fetchCondoManagementCompany: async (companyid) => {
      const company = await CondoManagementCompanyService.getCondoManagementCompany(companyid)
      set((state) => ({ ...state, entity: company, draft: company }))
    },
    updateCondoManagementCompany: async (condoManagementCompany) => {
      const updatedCondoManagementCompany = await CondoManagementCompanyService
        .updateCondoManagementCompany(condoManagementCompany)
      set((state) => ({
        ...state,
        entity: updatedCondoManagementCompany,
        draft: updatedCondoManagementCompany
      }))
    },
    updateDraftCondoManagementCompany: async (condoManagementCompany) => {
      set((state) => ({ ...state, draft: condoManagementCompany }))
    },
    saveDraft: async () => {
      const draft = get().draft
      if (draft) {
        CondoManagementCompanyService.updateCondoManagementCompany(draft)
          .then()
      }
    }
  }),
  {
    name: 'condo-management-company-store'
  }
))

export default useCondoManagementCompany