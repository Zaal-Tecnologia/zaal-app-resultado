import { Image, Pressable, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { P } from '~/components/p'
import { Icon } from '~/components/icon'

import { useTheme } from '~/hooks/use-theme'
import { useUsers } from '~/hooks/use-users'

import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'

type Props = { name: string; variant: 'sm' | 'xl'; photo: string | undefined }

export function Avatar({ name, photo, variant }: Props) {
  const { theme } = useTheme()
  const { addPhoto } = useUsers()

  async function handleSelectAnImageFromTheGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      addPhoto(result.assets[0].uri)
    }
  }

  const noPhoto = !photo

  return (
    <Pressable
      onPress={handleSelectAnImageFromTheGallery}
      style={[
        s.avatarBorder,
        {
          height: variant === 'xl' ? 64 : 40,
          width: variant === 'xl' ? 64 : 40,
          borderColor: colors.zinc[theme === 'dark' ? 800 : 200],
        },
      ]}>
      <View
        style={[
          s.avatar,
          {
            height: variant === 'xl' ? 56 : 34,
            width: variant === 'xl' ? 56 : 34,
            backgroundColor: colors.zinc[theme === 'dark' ? 800 : 100],
          },
        ]}>
        {noPhoto ? (
          <P style={[s.avatarTitle, { fontSize: variant === 'xl' ? 16 : 12 }]}>
            {name.slice(0, 2)}
          </P>
        ) : (
          <Image
            source={{ uri: photo }}
            alt=""
            style={[
              {
                borderRadius: s.avatar.borderRadius,
                height: variant === 'xl' ? 56 : 34,
                width: variant === 'xl' ? 56 : 34,
              },
            ]}
          />
        )}
      </View>

      {noPhoto ? (
        <View
          style={[
            s.cameraIcon,
            {
              backgroundColor:
                theme === 'light' ? colors.white : colors.zinc[900],
              borderColor:
                theme === 'light' ? colors.zinc[200] : colors.zinc[700],
            },
          ]}>
          <Icon name="camera" />
        </View>
      ) : null}
    </Pressable>
  )
}

const s = StyleSheet.create({
  avatarBorder: {
    borderWidth: 1,
    borderRadius: 999,
    marginLeft: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTitle: {
    fontFamily: fonts['urbanist-semibold'],
    letterSpacing: -0.5,
  },
  cameraIcon: {
    position: 'absolute',
    top: -5,
    right: -2.5,
    height: 24,
    width: 24,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
})
