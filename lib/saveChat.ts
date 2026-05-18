import { supabase } from './supabase'

export const saveChat = async (
  role: string,
  message: string
) => {
  const { error } = await supabase
    .from('chat_messages')
    .insert([
      {
        role,
        message,
      },
    ])

  if (error) {
    console.log('SUPABASE CHAT ERROR:', error)
  }
}