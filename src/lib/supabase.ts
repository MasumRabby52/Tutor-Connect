
import { createClient } from '@supabase/supabase-js'

// These would normally be environment variables in a real app
// For demo purposes, we're using a mock setup
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock backend simulation for demo purposes
class MockSupabaseClient {
  private storage = new Map()
  
  from(table: string) {
    return {
      select: () => ({
        then: (callback: (data: any) => void) => {
          const data = Array.from(this.storage.values()).filter((item: any) => item.table === table)
          callback({ data: data.map(item => item.data), error: null })
        }
      }),
      insert: (data: any) => ({
        then: (callback: (result: any) => void) => {
          const id = Date.now().toString()
          this.storage.set(id, { table, data: { ...data, id } })
          // Simulate real-time updates
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('supabase-update', { 
              detail: { table, type: 'INSERT', data: { ...data, id } } 
            }))
          }, 100)
          callback({ data: { ...data, id }, error: null })
        }
      }),
      update: (data: any) => ({
        eq: (field: string, value: any) => ({
          then: (callback: (result: any) => void) => {
            for (const [key, item] of this.storage.entries()) {
              if (item.table === table && item.data[field] === value) {
                this.storage.set(key, { table, data: { ...item.data, ...data } })
                window.dispatchEvent(new CustomEvent('supabase-update', { 
                  detail: { table, type: 'UPDATE', data: { ...item.data, ...data } } 
                }))
                break
              }
            }
            callback({ data, error: null })
          }
        })
      })
    }
  }
}

// Use mock client for demo - in real app, use actual supabase client
export const mockSupabase = new MockSupabaseClient()
