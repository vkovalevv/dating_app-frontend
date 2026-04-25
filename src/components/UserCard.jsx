import { useState } from 'react';

export default function UserCard({ user }) {
  const [imageIndex, setImageIndex] = useState(0)
  
  const next = () => {setImageIndex((imageIndex+1)%user.images.length)}
  const prev = () => {imageIndex>0? setImageIndex(imageIndex-1): setImageIndex(user.images.length-1)}
  
  return (
    <div className="w-80 rounded-2xl overflow-hidden shadow-xl bg-white">
      <div className='relative'>
      
      {user.images &&<img src={user.images[imageIndex].image} alt={user.name} className="w-full h-96 object-cover" />}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8">‹</button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8">›</button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{user.first_name} {user.last_name}, {user.age}</h2>
        <p className="text-gray-500 mt-1">{user.descrption}</p>
      </div>
    </div>
  );
}