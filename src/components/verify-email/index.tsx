'use client'
import React, { useEffect, useState } from 'react'
import { Ban, MailCheck } from 'lucide-react'
import Link from 'next/link'
import { useCreateResourceMutation } from '@/redux/api/curd'
import { tagTypes } from '@/redux/tag-types'
import { MAIL_ENDPOINTS } from '@/constants/end-point'

export default function VerifyEmailComponent({
  token
}: {
  token: string | null
}) {
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  // API For Verify Email
  const [createResource, { isLoading }] = useCreateResourceMutation()

  // Functon For Verify Email
  async function verify(token: string) {
    try {
      const response = await createResource({params:{token},url:MAIL_ENDPOINTS.VERIFY_EMAIL,tags:tagTypes.email}).unwrap()
      setVerificationStatus({
        success: response?.isSuccess,
        message: response?.message
      })
    } catch (error) {
      const apiError = error as ApiError;
      setVerificationStatus({
        success: false,
        message: apiError?.message || 'Verification failed.'
      })
    }
  }

  useEffect(() => {
    if (token) {
      verify(token)
    }
  })

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-background">
        <p className="bg-primary-foreground p-8 rounded-lg shadow-md text-center text-destructive">
          No token provided
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-background">
        <p className="bg-primary-foreground p-8 rounded-lg shadow-md text-center">
          Verifying your email...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background">
      <div className="bg-primary-foreground p-8 rounded-lg shadow-md text-center">
        {verificationStatus?.success ? (
          <MailCheck size={32} color="green" className="w-full mx-auto" />
        ) : (
          <Ban size={32} color="red" className="w-full mx-auto" />
        )}
        <h1 className="text-2xl font-semibold my-2">Email Verification</h1>
        <p className="text-gray-200 mb-4">{verificationStatus?.message}</p>
        <Link href="/" className="bg-primary text-white py-2 px-3 rounded-md">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
