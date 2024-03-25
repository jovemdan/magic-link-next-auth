'use client'

import { CardDescription, CardHeader, CardContent, Card, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

export default function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      console.log(data)

      await signIn('email', { email: data.email, redirect: false })
      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error'
      })
    }
  })

  return (
    <Card className="my-80 mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" {...form.register('email')} />
          </div>
          <Button className="w-full">Send Magic Link</Button>
        </CardContent>
      </form>
    </Card>
  )
}
