import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaShieldAlt } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import { GiSelfLove } from "react-icons/gi";
import { GrDislike } from 'react-icons/gr';

const CommunityPosts = () => {

    const axiosPublic = useAxiosPublic();
    const [votes, setVotes] = useState({});

    const {data:posts=[], refetch} = useQuery({
        queryKey: ['posts'],
        queryFn: async() => {
            const res = axiosPublic.get('/forum')
            return (await res).data;
        }
    })
    // console.log('Posts', posts)

    const handleLove = async(postId) => {
        const alreayVoted = votes[postId]?.upVoted;

        if(alreayVoted === true){
            const voteValue = -1;

            setVotes((prevVotes)=>({...prevVotes,[postId]:{...prevVotes[postId], upVoted:false}}));
            await axiosPublic.patch(`forum-upvote/${postId}`, { upVote: voteValue });
            refetch();
        }else {
            const voteValue = 1;
            setVotes((prevVotes) => ({
                ...prevVotes,
                [postId]: { ...prevVotes[postId], upVoted: true },
            }));
            await axiosPublic.patch(`forum-upvote/${postId}`, { upVote: voteValue });
            refetch(); 
        }
    }

    const handleDisLike = async(postId) => {
        const alreaySownVoted = votes[postId]?.downVoted;
        if(alreaySownVoted){
            const voteValue = -1;
            setVotes((prevVotes) => ({
                ...prevVotes,
                [postId]: { ...prevVotes[postId], downVoted: false },
            }));

            await axiosPublic.patch(`forum-downvote/${postId}`, { downVote: voteValue });
            refetch();
        }else {
            const voteValue = 1;
            setVotes((prevVotes) => ({
                ...prevVotes,
                [postId]: { ...prevVotes[postId], downVoted: true },
            }));

            await axiosPublic.patch(`forum-downvote/${postId}`, { downVote: voteValue });
            refetch();
        }
        
    }

    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 "> Community Forum</h2>
  
        <div className=" flex flex-col gap-3">

            
            {posts.map((post) => {

                    const isUpVoted = votes[post._id]?.upVoted;
                    const isDownVoted = votes[post._id]?.downVoted;

                return(   <div key={post._id} className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] shadow-lg max-w-2xl mx-auto p-5 flex flex-col justify-between gap-3">

                    <div className='flex gap-10'>
                        <img src={post.authorPhoto} className='h-12 w-12 rounded-full object-cover border-2 border-blue-400' alt="" />
    
                        <div>
                            <p className='text-lg font-normal'>{post.authorName}</p>
                            <span className='flex items-center gap-3'> {post.authorRole === 'admin' ? (<FaShieldAlt className="text-base" />) : (<FaDumbbell className="text-base" />) } {post.authorRole}</span>
                        </div>
                    </div>
    
                    <div className='text-sm flex justify-between'>
                        <p>{post.postDate}</p>
                        <p>{post.postTime}</p>
                    </div>
    
                    <div>
                        <h1 className='text-lg font-semibold'>{post.postTitle}</h1>
                    </div>
    
                    <img src={post.postImage}  alt="Forum" className="w-[80%] h-96 object-cover rounded-lg mb-3 mx-auto "  />
    
                    <div>
                        <p>{post.postDetails}</p>
                    </div>
    
                    <div className='flex gap-20 text-lg'>
    
                        <div className='flex items-center gap-2 '>
                            <button onClick={() => handleLove(post._id)}>
                                <GiSelfLove  className={`text-2xl transition-all duration-300 ${isUpVoted ? 'text-rose-500 scale-110' : 'text-black-400'}`} />
                            </button>
                                {post.upvoteCount}
                        </div>
                        <div className='flex items-center  gap-2 '>
                            <button onClick={()=>handleDisLike(post._id)}><GrDislike className={`text-2xl transition-all duration-300 ${isDownVoted ? 'text-blue-500 scale-110' : 'text-black-400'}`}/></button>{post.downvoteCount}
                        </div>
    
                    </div>
    
                </div>)
            })}
        </div>

      </div>
    );
};

export default CommunityPosts;