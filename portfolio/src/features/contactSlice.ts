import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ContactField = 'name' | 'company' | 'email' | 'subject' | 'message'
export type ContactStatus = 'idle' | 'sending' | 'success' | 'error'

export type ContactState = {
  name: string
  company: string
  email: string
  subject: string
  message: string
  status: ContactStatus
  errorMessage: string
}

const initialState: ContactState = {
  name: '',
  company: '',
  email: '',
  subject: '',
  message: '',
  status: 'idle',
  errorMessage: '',
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactField: (s, a: PayloadAction<{ key: ContactField; value: string }>) => {
      s[a.payload.key] = a.payload.value
    },
    setContactStatus: (s, a: PayloadAction<ContactStatus>) => {
      s.status = a.payload
      if (a.payload !== 'error') s.errorMessage = ''
    },
    setContactErrorMessage: (s, a: PayloadAction<string>) => {
      s.errorMessage = a.payload
    },
    resetContactForm: () => ({ ...initialState }),
  },
})

export const { setContactField, setContactStatus, setContactErrorMessage, resetContactForm } = contactSlice.actions
export default contactSlice.reducer
