import { useEffect, useState, useRef } from 'react';
import api from '../api/axiosInstance';
import UserCard from '../components/UserCard';

export default function SwipePage() {
  const [user, setUser] = useState(null);
  const [noUsers, setNoUsers] = useState(false);
  const intervalRef = useRef(null)
  const counter = useRef(0)

const getUser = () => {
    api.get('/stack/next')
        .then((res) => {
            setUser(res.data)
            counter.current = 0
        })
        .catch((err) => {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(getUser, 3000)
            }
            counter.current += 1
            if (counter.current === 3) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
                setNoUsers(true)
            }
            setUser(null)
        })
}

  useEffect(() => {
    intervalRef.current = setInterval(getUser, 3000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(
    () => {
      if (user) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, [user]
  )

  const handleSwipe = (swipe) => {
    api.post('/stack/swipe', { target_user: user.id, action: swipe })
      .then(getUser)
      .catch(() => {
        setUser(null)
      })
  }


  return (
    <div className="flex items-center justify-center min-h-screen gap-8">
      {(!user && !noUsers) && <p>Loading users profiles...</p>}
      {noUsers && <p>Currently there is no users for your preferences</p>}
      {user &&
        <>
          <UserCard user={user} />
          <button onClick={() => handleSwipe(1)} className="text-4xl">Like👍</button>
          <button onClick={() => handleSwipe(0)} className="text-4xl">Dislike👎</button>
        </>
      }
    </div>
  )
};