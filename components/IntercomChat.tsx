"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useEffect, useState } from 'react'
import React from 'react';
import Intercom from '@intercom/messenger-js-sdk';

export default function IntercomChat() {
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClientComponentClient<Database>()
    
    useEffect(() => {
      const initIntercom = async () => {
        try {
          const { data: { user }, error } = await supabase.auth.getUser()
          
          if (error) throw error
          
          if (user) {
            Intercom({
              api_base:"https://api-iam.intercom.io",
              app_id: 'opfhxwa2',
              user_id: user.id,
              name: user.user_metadata?.full_name,
              email: user.email,
              created_at: new Date(user.created_at).getTime() / 1000,
            })
          }
        } catch (error) {
          console.error('Error initializing Intercom:', error)
        } finally {
          setIsLoading(false)
        }
      }
  
      initIntercom()
    }, [supabase])
  
    if (isLoading) return null
  
    return <div id="intercom-container" />
  }