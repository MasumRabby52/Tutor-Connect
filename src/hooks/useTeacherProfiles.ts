
import { useState, useEffect } from 'react'
import { mockSupabase } from '@/lib/supabase'
import { TeacherType } from '@/components/common/TeacherCard'

export const useTeacherProfiles = () => {
  const [teachers, setTeachers] = useState<TeacherType[]>([])
  const [loading, setLoading] = useState(true)

  // Load teachers from backend
  const loadTeachers = async () => {
    try {
      setLoading(true)
      const { data, error } = await mockSupabase.from('teachers').select()
      
      if (error) {
        console.error('Error loading teachers:', error)
        return
      }
      
      setTeachers(data || [])
      console.log(`Loaded ${data?.length || 0} teachers from backend`)
    } catch (error) {
      console.error('Error loading teachers:', error)
    } finally {
      setLoading(false)
    }
  }

  // Save teacher profile to backend
  const saveTeacherProfile = async (teacherData: Omit<TeacherType, 'id'>) => {
    try {
      const teacherToSave = {
        ...teacherData,
        createdAt: new Date().toISOString(),
        rating: 5.0
      }
      
      const { data, error } = await mockSupabase.from('teachers').insert(teacherToSave)
      
      if (error) {
        console.error('Error saving teacher:', error)
        throw error
      }
      
      console.log('Teacher profile saved successfully:', data)
      return data
    } catch (error) {
      console.error('Error saving teacher profile:', error)
      throw error
    }
  }

  // Listen for real-time updates
  useEffect(() => {
    loadTeachers()
    
    const handleUpdate = (event: CustomEvent) => {
      const { table, type, data } = event.detail
      
      if (table === 'teachers') {
        if (type === 'INSERT') {
          setTeachers(prev => {
            const exists = prev.some(t => t.id === data.id)
            if (!exists) {
              console.log('New teacher profile detected:', data.name)
              return [...prev, data]
            }
            return prev
          })
        } else if (type === 'UPDATE') {
          setTeachers(prev => prev.map(t => t.id === data.id ? data : t))
        }
      }
    }
    
    window.addEventListener('supabase-update', handleUpdate as EventListener)
    
    return () => {
      window.removeEventListener('supabase-update', handleUpdate as EventListener)
    }
  }, [])

  return {
    teachers,
    loading,
    saveTeacherProfile,
    refreshTeachers: loadTeachers
  }
}
