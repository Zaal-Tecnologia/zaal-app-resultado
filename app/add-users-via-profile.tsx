import { useRouter } from 'expo-router'

import { AddUserForm } from '~/components/add-user-form'

export default function AddUsersViaProfile() {
  const { back } = useRouter()

  return <AddUserForm onSuccess={back} />
}
