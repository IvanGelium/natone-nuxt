import { ref } from 'vue'

class SimpleStore {
  public isAdmin = ref(false)
}

export const isAdminStore = new SimpleStore()
