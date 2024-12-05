import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: string
  name: string
  avatar: string
}

interface OverlappingAvatarsProps {
  users: User[]
  maxAvatars?: number
}

export default function OverlappingAvatars({ users, maxAvatars = 5 }: OverlappingAvatarsProps) {
  const displayUsers = users.slice(0, maxAvatars)
  const remainingCount = Math.max(users.length - maxAvatars, 0)

  return (
    <div className="flex items-center">
      <div className="flex -space-x-4">
        {displayUsers.map((user, index) => (
          <Avatar
            key={user.id}
            className="border-2 border-background relative inline-block"
            style={{
              zIndex: displayUsers.length - index,
            }}
          >
            <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      {remainingCount > 0 && (
        <span className="relative -ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}

