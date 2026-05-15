import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  await supabase.from('website_visitors').insert([{}])

  return NextResponse.json({ success: true })
}