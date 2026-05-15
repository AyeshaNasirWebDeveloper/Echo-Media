import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { fullName, email, service, message } = body

    if (!fullName || !email) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        {
          status: 400,
        }
      )
    }

    const { data, error } = await supabase
      .from('contact_leads')
      .insert([
        {
          full_name: fullName,
          email,
          service,
          message,
        },
      ])
      .select()

    if (error) {
      console.error('SUPABASE ERROR:', error)

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error'

    console.error('SERVER ERROR:', error)

    return NextResponse.json(
      {
        error: message,

      },
      {
        status: 500,
      }
    )
  }
}
