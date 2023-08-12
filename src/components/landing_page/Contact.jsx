import React from 'react'
// import './Landing.css'
const Contact = () => {
  return (
    <>
      <div className="contactPage row">
        <div className="map-area col-lg-6">
          <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438553.473464741!2d80.75365079895818!3d21.73312974692051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ca32732f390c0b5%3A0x3b5e787f0c1ee2d3!2sMaharashtra%20Informatics%20Pvt.Ltd!5e0!3m2!1sen!2sin!4v1691060868165!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="details col-lg-6">
          <h4 className='text1 py-3'>Contact Us -</h4>
          <p>आमचा ऑफिस पत्ता:</p>
          <p>महाराष्ट्र इन्फोटेक , पहिला मजला ऑफिस नं. 1., पुणे-मुंबई हायवे, एच,पी पेट्रोल पंप जवळ, कामशेत, ता-मावळ, जि-पुणे 410405.<br/><span className='color-text'>संपर्क: 9373499415 , 7507173568.</span></p>
          <p>(Mon To Friday 10am To 6pm | Sat- 10am to 2pm)
            Lunch Time 1.30 to 2.20pm</p>
        </div>
      </div>
    </>
  )
}

export default Contact
