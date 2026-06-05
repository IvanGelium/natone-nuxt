import { ref } from 'vue'

class SimpleStore {
  public isAdmin = ref(false)

  public setisAdmin(key: string) {
    if (!key)
      return
    if (key === useRuntimeConfig().public.keySecret)
      this.isAdmin.value = true
  }

  public getIsAdmin() {
    return this.isAdmin
  }
}

export const isAdminStore = new SimpleStore()
