import React from 'react'
import Tittle from '../components/Tittle'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Tittle text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md;max-w-[450px]' src={""} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
        <p>Forever born out of a passion for innovation and desire to revolution. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis harum dolorum aliquid numquam cupiditate. Iusto recusandae quidem, laborum reprehenderit aliquid qui natus eos ratione ipsum eveniet maxime possimus optio deleniti.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi adipisci earum, molestias est quo ipsum explicabo? Quam placeat soluta, modi possimus veniam sint, perspiciatis distinctio sed exercitationem ea voluptate hic.</p>
        <b className='text-blue-800'>Our Mission</b>
        <p>Our Mission forever is to empower our customers with choice,convenience,innovation and knowledge. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia ipsam facere adipisci corporis deleniti quidem repudiandae ipsum ut suscipit, at fugiat cumque ducimus consequuntur. Dolorum earum eveniet ex reprehenderit rem?</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Tittle text1={"WHY"} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Assurance</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae recusandae sunt officiis. Inventore non delectus nostrum atque natus officia odit saepe porro repudiandae excepturi, voluptatem voluptate expedita quae rerum animi!</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent.</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional customer service</b>
          <p className='text-gray-600'>our team of dedicated proffessionals is here to assist you the way, ensuring the services related to us are served efficiently to our happy clients</p>

        </div>
        
      </div>
    </div>
  )
}

export default About