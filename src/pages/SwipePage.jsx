import {useEffect, useState, useRef} from 'react';
import api from '../api/axiosInstance';
import UserCard from '../components/UserCard';

export default function SwipePage(){
    const [user, setUser] = useState(null);
    const [timer, setTimer] = useState(null);
    const [noUsers, setNoUsers] = useState(false);
    const interval = useRef(null)

    const getUser = () => { 
        api.get('/stack/next')
        .then((res)=>{setUser(res.data)})
        .catch((err)=>{
          counter.current = counter.current + 1
          if(counter.current === 3){
            clearInterval(timer)
            setNoUsers(true)
          }
          setUser(null)
          console.error(err)
        })
    };

    useEffect(()=>{
      let interval = setInterval(getUser,3000)
      setTimer(interval)
      return () => clearInterval(interval)
    },[])

    useEffect(
      ()=>{
        if(user){
          clearInterval(timer)
        }
      }, [user]
    )

    const handleSwipe = (swipe) => {
        api.post('/stack/swipe', {target_user:user.id,action:swipe})
        .then(getUser)
        .catch(setUser(null))
    }


    return(
        <div className="flex items-center justify-center min-h-screen gap-8">
          {(!user && !noUsers)&& <p>Loading users profiles...</p>}
          {noUsers && <p>Currently there is no users for your preferences</p>}
          {user && 
            <>          
              <UserCard user={user}/>
              <button onClick={()=>handleSwipe(1)} className="text-4xl">Like👍</button>
              <button onClick={()=>handleSwipe(0)} className="text-4xl">Dislike👎</button>
            </>
          }        
        </div>
    )
};