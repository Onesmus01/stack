import React from 'react'
import Heading from '../shared/Heading'




const BlogData = [
    {
        title: "How to choose a perfect laptop",
        subtitle:
        "minima facere deserunt vero ilo beatae deleniti eius delore consequunter,eligendi corporis maiore molestiae laudantium,porro?",
        published: 'Jan 20,2024 by Dilshad',
        image: '',
    },
    {
        title: "How to choose a perfect gadget",
        subtitle:
        "minima facere deserunt vero ilo beatae deleniti eius delore consequunter,eligendi corporis maiore molestiae laudantium,porro?",
        published: 'Jan 20,2024 by satya',
        image: '',
    },
    {
        title: "How to choose a perfect smart watch",
        subtitle:
        "minima facere deserunt vero ilo beatae deleniti eius delore consequunter,eligendi corporis maiore molestiae laudantium,porro?",
        published: 'Jan 20,2024 by porro',
        image: '',
    },
    
]
const Blog = () => {
  return (
    <div className='my-12'>
      <div className='container'>
        {/* heading section */}
        <Heading title='Recent News' subtitle={"Explore Our Blogs"} />
        {/* Blog section  */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        gap-6 gap-y-8 sm:gap-4 md:gap-7'>
            {/* Blog  card  */}
            {
                BlogData.map((data,index)=> (
                    <div key={index}className='bg-white dark:bg-gray-900'>
                        {/* img section */}
                        <div className="overflow-hidden rounded-2xl mb-2">
                            <img src={''} alt=""
                            className="h-[180px] w-[260px] object-cover rounded-2xl
                             hover:scale-105  duration-500" />

                        </div>
                        {/* content section  */}
                        <div className='space-y-2'>
                            <p className='text-xs text-gray-500'>{data.published}</p>
                            <p className='font-bold line-clamp-1'>{data.title}</p>
                            <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>{data.subtitle}</p>
                        </div>


                    </div>
                ))
            }

        </div>
      </div>
    </div>
  )
}

export default Blog
