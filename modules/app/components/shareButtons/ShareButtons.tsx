import React from "react"
import LinkedIn from "icons/linkedin-in.svg"
import Facebook from "icons/facebook-f.svg"
import Twitter from "icons/twitter.svg"
import Share from "icons/share-alt.svg"

const ShareButtons: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="sbuttons">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        className="sbutton fb"
        title="Share on Facebook"
      >
        <img alt="Facebook icon" src={Facebook} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${url}`}
        target="_blank"
        className="sbutton twitt"
        title="Share on Twitter"
      >
        <img alt="Twitter icon" src={Twitter} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=&summary=&source=`}
        target="_blank"
        className="sbutton linkedin"
        title="Share on Linkedin"
      >
        <img alt="LinkedIn icon" src={LinkedIn} />
      </a>
      <a target="_blank" className="sbutton mainsbutton">
        <img alt="Share button" src={Share} />
      </a>
    </div>
  )
}

export default ShareButtons
