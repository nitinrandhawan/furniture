import Image from 'next/image'
import React from 'react'
import pic1 from '@/app/Components/assets/collection/pic1.webp'
import pic2 from '@/app/Components/assets/collection/pic2.webp'
import pic3 from '@/app/Components/assets/collection/pic3.webp'
import pic4 from '@/app/Components/assets/collection/pic4.webp'
import './collection.css'

const Page = () => {
  const collections = [
    {id: 1, image: pic1, title: "Drawing Room"},
    {id: 2, image: pic2, title: "Office"},
    {id: 3, image: pic3, title: "Computer"},
    {id: 4, image: pic4, title: "Bedroom"}
  ]

  return (
    <section className="collection-section">
      <div className="container">
        <div className='section-header text-center'>
          <h2 className='toptrandheading m-0'> Collections</h2>
          <p className='subtitle'>Explore our premium furniture collections</p>
        </div>
        
        <div className='collection-grid'>
          {collections.map((item) => (
            <div className='collection-card' key={item.id}>
              <div className='image-wrapper'>
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) , (max-width: 1200px) 50vw, 33vw"
                  className='collection-img'
                />
              </div>
              <h3 className='collection-title'>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page