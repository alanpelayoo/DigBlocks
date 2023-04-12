import React from 'react'

function Footer() {
  return (
    <footer className='bg-primary' >
        <div>
            <a href='https://twitter.com/realapcodes' target="_blank"><i className="fa-brands fa-twitter fs-3 me-3"></i></a>
            <a href='https://www.linkedin.com/in/alan-pelayo-zepeda-a91494253' target="_blank"><i className="fa-brands fa-linkedin fs-3 "></i></a>
        </div>
        <hr></hr>
        <p>Build by <a href='https://www.apcodes.xyz/' target="_blank"  className='ap-link'>apcodes.</a></p>
    </footer>
  )
}

export default Footer