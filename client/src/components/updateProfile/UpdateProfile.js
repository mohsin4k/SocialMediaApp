import React from 'react'

function UpdateProfile() {
  return (
    <div className="UpdateProfile">
        <div className="container">
            <div className="left-part"></div>
            <div className="right-part">
                <form >
                    <input type="text" placeholder="Your Name" />
                    <input type="text" placeholder="Bio" />
                    <input type="submit" className="btn-primary" />
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile
