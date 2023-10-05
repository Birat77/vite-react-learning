import React from 'react';

interface LikeProps {
    active: boolean,
    onClick: () => void,
}

const Like = ({active, onClick}: LikeProps) => {
  return (
    <div onClick={onClick}>
        {
            active ? 
            'Liked':
            'Like'
        }
    </div>
  )
}

export default Like;