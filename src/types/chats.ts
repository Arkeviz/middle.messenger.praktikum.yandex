export type TChat = {
  id: number
  title: string
  avatar: string | null
  unread_count: number | null
  created_by: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string | null
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
  }
}

export enum EMessageTypes {
  MESSAGE = 'message',
  IMAGE = 'image',
  STICKER = 'sticker',
}

export type TChatData = {
  id: number
  title: string
  avatar: string | null
  unread_count: number | null
  messages: {
    id: number
    time: string
    content: string
    type: EMessageTypes
    user: {
      first_name: string
      second_name: string
      avatar: string | null
      email: string
      login: string
    }
  }[]
}
